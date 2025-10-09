import { Userd } from "../models/userSchema.js";
export const generateToken = async(id, message, statusCode, res) => {
  try {
    let userd = await Userd.findById(id);
    if (!userd) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = userd.generateJsonWebToken();
    // Determine the cookie name based on the user's role
    const cookieName = userd.role === 'Admin' ? 'adminToken' : 'patientToken';

    return res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + Number(process.env.COOKIE_EXPIRE || 1) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        message,
        userd,
        token,
      });
  } catch (err) {
    console.error("generateToken error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};