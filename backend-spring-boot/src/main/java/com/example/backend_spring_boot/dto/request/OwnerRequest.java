package com.example.backend_spring_boot.dto.request;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
public class OwnerRequest {

    @NotBlank(message = "Le prénom est obligatoire")
    private String firstName;

    private String lastName;

    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Format de téléphone invalide")
    private String phone;

    @Size(max = 1000, message = "L'adresse est trop longue")
    private String address;

    private Long userId; // Référence à l'utilisateur associé

}