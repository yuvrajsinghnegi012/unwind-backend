import { Booking } from "../models/booking.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { tryCatch } from "../utils/features.js";
import { User } from "../models/user.js";

export const newBooking = tryCatch(async (req, res, next)=>{
    const { userId, propertyId } = req.params;
    const { date, hostId, total } = req.body;

    if(!date || !total || !userId || !hostId || !propertyId){
        return next(new ErrorHandler("Details are not complete", 403));
    }
    const user = await User.findById(userId);
    const host = await User.findById(hostId);
    if(!user || !host){
        return next(new ErrorHandler("User Or Host does not exist",403));
    }

    // const { startDate, endDate } = date;
    const { from: dateFrom, to: dateTo } = date;
    const booking = await Booking.create({
        customer: userId, host: hostId, listing: propertyId, startDate: new Date(dateFrom), endDate: new Date(dateTo), total,
    });

    //Updating tripList of the user(customer)
    user.tripList.push(booking._id);
    const updatedUser = await user.save();
    
    //Updating the reservation of the host(host)
    host.reservationList.push(booking._id);
    await host.save();

    return res.status(200).json({
        success: true,
        message: "Booking confirmed",
        booking,
        updatedUser,
    })
});