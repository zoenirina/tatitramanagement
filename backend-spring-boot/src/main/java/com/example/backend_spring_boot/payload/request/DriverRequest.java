package com.example.backend_spring_boot.payload.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class DriverRequest {

    @NotBlank
    private String firstName;

    private String lastName;

    @NotBlank
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be valid")
    private String phone;

    @Email
    private String email;

    private String address;

    private BigDecimal amountDue;

    private String status; // Optional: Should be ACTIF, INACTIF, or SUSPENDU

    // Getters and Setters
}

