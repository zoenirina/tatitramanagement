package com.example.backend_spring_boot.controller;

import com.example.backend_spring_boot.model.Owner;
import com.example.backend_spring_boot.model.User;
import com.example.backend_spring_boot.payload.UserIdentityAvailability;
import com.example.backend_spring_boot.payload.UserProfile;
import com.example.backend_spring_boot.payload.UserSummary;
import com.example.backend_spring_boot.payload.request.DriverRequest;
import com.example.backend_spring_boot.payload.request.OwnerRequest;
import com.example.backend_spring_boot.payload.response.ApiResponse;
import com.example.backend_spring_boot.security.CurrentUser;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    //  Obtenir l'utilisateur courant
    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return userService.getCurrentUser(currentUser);
    }

    //  Vérifier disponibilité du nom d'utilisateur
    @GetMapping("/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam("username") String username) {
        return userService.checkUsernameAvailability(username);
    }

    //  3. Vérifier disponibilité de l'email
    @GetMapping("/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam("email") String email) {
        return userService.checkEmailAvailability(email);
    }

    //  Obtenir le profil d'un utilisateur
    @GetMapping("/{username}")
    public UserProfile getUserProfile(@PathVariable("username") String username) {
        return userService.getUserProfile(username);
    }

    //  Ajouter un utilisateur (admin uniquement)
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public User addUser(@Valid @RequestBody User user) {
        return userService.addUser(user);
    }

    //  Mettre à jour un utilisateur
    @PutMapping("/update/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public User updateUser(
            @Valid @RequestBody User newUser,
            @PathVariable("username") String username,
            @CurrentUser UserPrincipal currentUser) {
        return userService.updateUser(newUser, username, currentUser);
    }

    //  Supprimer un utilisateur
    @DeleteMapping("/delete/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ApiResponse deleteUser(
            @PathVariable("username") String username,
            @CurrentUser UserPrincipal currentUser) {
        return userService.deleteUser(username, currentUser);
    }

    //  Donner le rôle admin
    @PostMapping("/admin/grant/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse giveAdmin(@PathVariable("username") String username) {
        return userService.giveAdmin(username);
    }

    //  Retirer le rôle admin
    @PostMapping("/admin/revoke/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse removeAdmin(@PathVariable("username") String username) {
        return userService.removeAdmin(username);
    }

    //  Mettre à jour les infos personnelles
    @PutMapping("/info/update")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserProfile setOrUpdateInfo(
            @Valid @RequestBody User infoRequest,
            @CurrentUser UserPrincipal currentUser) {
        return userService.setOrUpdateInfo(currentUser, infoRequest);
    }

    //  Mettre à jour les détails Owner
    @PutMapping("/owner/update/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Owner> updateOwnerDetail(
            @PathVariable("userId") Long userId,
            @Valid @RequestBody OwnerRequest ownerRequest,
            @CurrentUser UserPrincipal currentUser) {
        return userService.updateOwnerDetail(userId, ownerRequest, currentUser);
    }
}
