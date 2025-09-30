import User from '../models/userModel.js';
import { hashPassword } from '../utils/hash.js';



export const userRoutes = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    console.log("body", req.body);

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log("1");

    const existing = await User.findOne({ email });
 
    if (existing) return res.status(400).json({ error: "Email already in use" });
    
    if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });

  
    

    const hashed = await hashPassword(password);
    const user = await User.create({ username, email, password: hashed });
    console.log("2");

    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export default userRoutes;





