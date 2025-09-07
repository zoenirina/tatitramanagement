package com.example.backend_spring_boot.service.impl;

import aj.org.objectweb.asm.commons.Remapper;
import com.example.backend_spring_boot.exception.AccessDeniedException;
import com.example.backend_spring_boot.exception.AppException;
import com.example.backend_spring_boot.exception.ResourceNotFoundException;
import com.example.backend_spring_boot.model.Owner;
import com.example.backend_spring_boot.model.User;
import com.example.backend_spring_boot.model.role.Role;
import com.example.backend_spring_boot.model.role.RoleName;
import com.example.backend_spring_boot.payload.UserIdentityAvailability;
import com.example.backend_spring_boot.payload.UserProfile;
import com.example.backend_spring_boot.payload.UserSummary;
import com.example.backend_spring_boot.payload.request.OwnerRequest;
import com.example.backend_spring_boot.payload.response.ApiResponse;
import com.example.backend_spring_boot.repo.OwnerRepository;
import com.example.backend_spring_boot.repo.RoleRepository;
import com.example.backend_spring_boot.repo.UserRepository;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public UserSummary getCurrentUser(UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getPhoto(), currentUser.getUsername());
    }

    @Override
    public UserIdentityAvailability checkUsernameAvailability(String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @Override
    public UserIdentityAvailability checkEmailAvailability(String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
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
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", username));
        if (!user.getId().equals(currentUser.getId()) || !currentUser.getAuthorities()
                .contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
            ApiResponse apiResponse = new ApiResponse(Boolean.FALSE, "Vous n'avez pas la permission de supprimer ce profil: " + username);
            throw new AccessDeniedException(apiResponse);
        }

        userRepository.deleteById(user.getId());

        return new ApiResponse(Boolean.TRUE, "Vous avez supprimé avec l'utilisateur : " + username);
    }

    @Override
    public ApiResponse giveAdmin(String username) {
        User user = userRepository.getUserByName(username);
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new AppException("User role not set")));
        roles.add(
                roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User role not set")));
        user.setRoles(roles);
        userRepository.save(user);
        return new ApiResponse(Boolean.TRUE, "Rôle ADMIN attribué à l'utilisateur : " + username);
    }

    @Override
    public ApiResponse removeAdmin(String username) {
        User user = userRepository.getUserByName(username);
        List<Role> roles = new ArrayList<>();
        roles.add(
                roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User role not set")));
        user.setRoles(roles);
        userRepository.save(user);
        return new ApiResponse(Boolean.TRUE, "You took ADMIN role from user: " + username);
    }

    @Override
    public UserProfile setOrUpdateInfo(UserPrincipal currentUser, User infoRequest) {
        return null;
    }

    @Override
    public ResponseEntity<Owner> updateOwnerDetail(Long userId, OwnerRequest request, UserPrincipal currentUser) {
        Owner owner = ownerRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner", "id", userId));
        if (!owner.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Modification non autorisée");
        }
        modelMapper.map(request, owner);
        return ResponseEntity.ok(ownerRepository.save(owner));
    }
}
