package com.example.backend_spring_boot.controller;

import com.example.backend_spring_boot.exception.AppException;
import com.example.backend_spring_boot.exception.HttpStatusException;
import com.example.backend_spring_boot.model.Owner;
import com.example.backend_spring_boot.model.User;
import com.example.backend_spring_boot.model.role.Role;
import com.example.backend_spring_boot.model.role.RoleName;
import com.example.backend_spring_boot.payload.request.LoginRequest;
import com.example.backend_spring_boot.payload.request.OwnerRequest;
import com.example.backend_spring_boot.payload.request.SignUpRequest;
import com.example.backend_spring_boot.payload.response.ApiResponse;
import com.example.backend_spring_boot.payload.response.JwtAuthenticationResponse;
import com.example.backend_spring_boot.repo.OwnerRepository;
import com.example.backend_spring_boot.repo.RoleRepository;
import com.example.backend_spring_boot.repo.UserRepository;
import com.example.backend_spring_boot.security.JwtTokenProvider;
import com.example.backend_spring_boot.security.UserPrincipal;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final String USER_ROLE_NOT_SET = "User role not set";

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> authenticateUser(
            @Valid @RequestBody LoginRequest loginRequest) {

        // Authentification
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // On récupère l'utilisateur connecté (cast en UserPrincipal pour avoir l'ID et roles)
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        // Génération du token
        String jwt = jwtTokenProvider.generateToken(userPrincipal);

        // Retourne le JWT
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, @RequestBody OwnerRequest ownerRequest) {
        if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
            throw new HttpStatusException(HttpStatus.BAD_REQUEST, "Nom d'utilisateur déjà existante");
        }

        if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
            throw new HttpStatusException(HttpStatus.BAD_REQUEST, "Email non valide");
        }
        String photo = signUpRequest.getPhoto().toLowerCase();

        String username = signUpRequest.getUsername().toLowerCase();

        String email = signUpRequest.getEmail().toLowerCase();

        String password = passwordEncoder.encode(signUpRequest.getPassword());

        User user = new User( photo, username, email, password);

        List<Role> roles = new ArrayList<>();

        if (userRepository.count() == 0) {
            roles.add(roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new AppException(USER_ROLE_NOT_SET)));
            roles.add(roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new AppException(USER_ROLE_NOT_SET)));
        } else {
            roles.add(roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new AppException(USER_ROLE_NOT_SET)));
        }

        user.setRoles(roles);

        // Sauvegarde de l'utilisateur
        User savedUser = userRepository.save(user);

        // Création du Owner lié à l'utilisateur
        ownerRequest.setUserId(savedUser.getId());
        Owner owner = modelMapper.map(ownerRequest, Owner.class);
        ownerRepository.save(owner);


        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{userId}")
                .buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(Boolean.TRUE, "User registered successfully"));
    }

//    @PostMapping("/signup")
//    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
//        if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
//            throw new HttpStatusException(HttpStatus.BAD_REQUEST, "Nom d'utilisateur déjà existante");
//        }
//
//        if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
//            throw new HttpStatusException(HttpStatus.BAD_REQUEST, "Email non valide");
//        }
//
//        String username = signUpRequest.getUsername().toLowerCase();
//
//        String email = signUpRequest.getEmail().toLowerCase();
//
//        String password = passwordEncoder.encode(signUpRequest.getPassword());
//
//        User user = new User( username, email, password);
//
//        List<Role> roles = new ArrayList<>();
//
//        if (userRepository.count() == 0) {
//            roles.add(roleRepository.findByName(RoleName.ROLE_USER)
//                    .orElseThrow(() -> new AppException(USER_ROLE_NOT_SET)));
//            roles.add(roleRepository.findByName(RoleName.ROLE_ADMIN)
//                    .orElseThrow(() -> new AppException(USER_ROLE_NOT_SET)));
//        } else {
//            roles.add(roleRepository.findByName(RoleName.ROLE_USER)
//                    .orElseThrow(() -> new AppException(USER_ROLE_NOT_SET)));
//        }
//
//        user.setRoles(roles);
//
//        User result = userRepository.save(user);
//
//        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{userId}")
//                .buildAndExpand(result.getId()).toUri();
//
//        return ResponseEntity.created(location).body(new ApiResponse(Boolean.TRUE, "User registered successfully"));
//    }
}
