package com.sathish.stayease.service.interfac;

import com.sathish.stayease.dto.Response;
import com.sathish.stayease.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long rooId, Long userId, Booking bookingRequest);
    Response findBookingByConfirmationCode(String confirmationCode);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}