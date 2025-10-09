import { Message } from "../models/messageSchema.js";
import { catchAsyncHandler } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
export const sendMessage = catchAsyncHandler(async (req, res, next) => {
 const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler( "please fill full form",400));
  }
  console.log("firstName", firstName);

  await Message.create({ firstName, lastName, email, phone, message });

  return res.status(200).json({
    success: true,
    message: "message send successfully",
  });
});
