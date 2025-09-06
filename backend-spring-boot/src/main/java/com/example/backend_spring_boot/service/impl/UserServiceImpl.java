package com.example.backend_spring_boot.service.impl;

import com.example.backend_spring_boot.model.User;
import com.example.backend_spring_boot.payload.UserIdentityAvailability;
import com.example.backend_spring_boot.payload.UserProfile;
import com.example.backend_spring_boot.payload.UserSummary;
import com.example.backend_spring_boot.payload.response.ApiResponse;
import com.example.backend_spring_boot.repo.RoleRepository;
import com.example.backend_spring_boot.repo.UserRepository;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public UserSummary getCurrentUser(UserPrincipal currentUser) {
        return null;
    }

    @Override
    public UserIdentityAvailability checkUsernameAvailability(String username) {
        return null;
    }

    @Override
    public UserIdentityAvailability checkEmailAvailability(String email) {
        return null;
    }

    @Override
    public UserProfile getUserProfile(String username) {
        return null;
    }

    @Override
    public User addUser(User user) {
        return null;
    }

    @Override
    public User updateUser(User newUser, String username, UserPrincipal currentUser) {
        return null;
    }

    @Override
    public ApiResponse deleteUser(String username, UserPrincipal currentUser) {
        return null;
    }

    @Override
    public ApiResponse giveAdmin(String username) {
        return null;
    }

    @Override
    public ApiResponse removeAdmin(String username) {
        return null;
    }

    @Override
    public UserProfile setOrUpdateInfo(UserPrincipal currentUser, User infoRequest) {
        return null;
    }
}
