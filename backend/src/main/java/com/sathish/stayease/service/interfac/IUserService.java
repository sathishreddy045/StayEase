package com.sathish.stayease.service.interfac;

import com.sathish.stayease.dto.LoginRequest;
import com.sathish.stayease.dto.Response;
import com.sathish.stayease.entity.User;

public interface IUserService {

    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUSerBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);
}