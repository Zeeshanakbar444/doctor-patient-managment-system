import { catchAsyncHandler } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { Userd } from "../models/userSchema.js";

export const postAppointment = catchAsyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lasttName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lasttName ||
    !hasVisited ||
    !address
  ) {
    return next(new ErrorHandler("please fill the form", 404));
  }

  const isConflict = await Userd.find({
    firstName: doctor_firstName,
    lastName: doctor_lasttName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor ont found", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors conflict please contact through with email and unique",
        404
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.Userd._id;
  const apppointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lasttName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    message: "appointment send successfully",
    apppointment,
  });
});

export const getAllAppointment = catchAsyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("appointment nnot found", 404));
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "appointment statsu updated",
        appointment,
      });
  }
);




 export const deleteAppointment = catchAsyncHandler(async(req,res,next)=>{
    const {id} = req.params;
      let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("appointment nnot found", 404));
    }
    await appointment.deleteOne();
      res
      .status(200)
      .json({
        success: true,
        message: "appointment deleted successfully",

      });
 })

