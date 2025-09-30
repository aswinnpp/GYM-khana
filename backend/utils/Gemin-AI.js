// Corrected getNutrition function
import 'dotenv/config'; 
import { GoogleGenAI } from "@google/genai";
import DailyStatus from '../models/dailyStatusModel.js';

// Initialize the client once
const ai = new GoogleGenAI({}); 

/**
 * Extracts a number (with optional decimal) from a string, ignoring commas.
 * @param {string} text - The string containing the nutritional value (e.g., "Protein: 3.7 g").
 * @returns {number|null} The parsed number or null if not found.
 */
const extractNumber = (text) => {
    // Regex to find a number, optionally with a decimal point. 
    // It looks for a sequence of digits, optionally followed by a period and more digits.
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
};

function getTodayMidnightLocal() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export const getNutrition = async (req, res) => {
    const { gram, food } = req.body;

    if (!food || !gram) {
        return res.status(400).json({ error: "Missing food name or quantity." });
    }

    const prompt = `For ${gram} grams of ${food}, list ONLY these nutrients with numbers and units in a comma-separated list: Protein: X g, Carbohydrates: Y g, Healthy Fats: Z g, Electrolytes: A mg, Water: B ml`;

    console.log(`\n-- Sending request for: ${gram}g of ${food} --`);
    
    try {
        // 1. Call the Gemini API
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: prompt
        });
console.log(response.text);

        const str = response.text;

        const nutritionObject = {
            protein: 0,
            carbs: 0,
            healthyFats: 0,
            electrolytes: 0,
            water: 0
        };
        str.split(",").forEach(part => {
            let [rawKey, rawValue] = part.split(":");
            if (!rawKey || !rawValue) return;
            const key = rawKey.trim().toLowerCase();
            const value = extractNumber(rawValue);

            if (key.includes('protein')) nutritionObject.protein = value || 0;
            if (key.includes('carbo')) nutritionObject.carbs = value || 0;
            if (key.includes('fat')) nutritionObject.healthyFats = value || 0;
            if (key.includes('electro')) nutritionObject.electrolytes = value || 0;
            if (key.includes('water')) nutritionObject.water = value || 0;
        });
        
        console.log(nutritionObject);
        

        // 3. Increment DailyStatus totals for today (single doc design)
        const today = getTodayMidnightLocal();
        let updated = await DailyStatus.findOne({ });
        if (!updated) {
            updated = new DailyStatus({
                proteinConsumed: 0,
                carbsConsumed: 0,
                fatsConsumed: 0,
                electrolytesConsumed: 0,
                waterConsumed: 0
            });
        }

        console.log(nutritionObject);
        
        updated.proteinConsumed += nutritionObject.protein || 0;
        updated.carbsConsumed += nutritionObject.carbs || 0;
        updated.fatsConsumed += nutritionObject.healthyFats || 0;
        updated.electrolytesConsumed += nutritionObject.electrolytes || 0;
        updated.waterConsumed += nutritionObject.water || 0;
        await updated.save();
       
        res.status(200).json({ 
            food: food, 
            quantity: parseFloat(gram),
            ...nutritionObject,
            dailyTotals: {
                proteinConsumed: updated?.proteinConsumed ?? null,
                carbsConsumed: updated?.carbsConsumed ?? null,
                fatsConsumed: updated?.fatsConsumed ?? null,
                electrolytesConsumed: updated?.electrolytesConsumed ?? null,
                waterConsumed: updated?.waterConsumed ?? null
            }
        });

    } catch (error) {
        console.error("An error occurred during content generation:", error.message);
        res.status(500).json({ error: "Failed to fetch and parse nutrition data from AI." });
    }
}


export default getNutrition