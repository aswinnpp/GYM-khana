import User from '../models/userModel.js';
import { hashPassword } from '../utils/hash.js';
import { comparePassword } from '../utils/hash.js';
import Profile from '../models/profileModel.js';


export const userRoutes = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("1");
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("11");
    

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    console.log("111");

    // Check if profile exists to determine first-time login
    const existingProfile = await Profile.findOne({ user: user._id });
    const needsProfileSetup = !existingProfile;

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      needsProfileSetup
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default userRoutes