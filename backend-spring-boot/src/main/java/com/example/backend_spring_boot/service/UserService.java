package com.example.backend_spring_boot.service;

import com.example.backend_spring_boot.model.Owner;
import com.example.backend_spring_boot.model.User;
import com.example.backend_spring_boot.payload.*;
import com.example.backend_spring_boot.payload.request.OwnerRequest;
import com.example.backend_spring_boot.payload.response.ApiResponse;
import com.example.backend_spring_boot.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface UserService {

	UserSummary getCurrentUser(UserPrincipal currentUser);

	UserIdentityAvailability checkUsernameAvailability(String username);

	UserIdentityAvailability checkEmailAvailability(String email);

	UserProfile getUserProfile(String username);

	User addUser(User user);

	User updateUser(User newUser, String username, UserPrincipal currentUser);

	ApiResponse deleteUser(String username, UserPrincipal currentUser);

	ApiResponse giveAdmin(String username);

	ApiResponse removeAdmin(String username);

	UserProfile setOrUpdateInfo(UserPrincipal currentUser, User infoRequest);

	ResponseEntity<Owner> updateOwnerDetail(Long userId, OwnerRequest ownerRequest, UserPrincipal currentUser);
}