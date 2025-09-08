package com.example.backend_spring_boot.dto.request;

import com.example.backend_spring_boot.model.Vehicle.Type;
import com.example.backend_spring_boot.model.Vehicle.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class VehicleRequest {

    @NotNull(message = "L'identifiant du propriétaire est requis")
    private Long ownerId;

    @NotNull(message = "Le type de véhicule est requis")
    private Type type;

    @NotBlank(message = "Le numéro d'immatriculation est requis")
    @Pattern(regexp = "^[A-Z0-9\\-]{4,15}$", message = "Format de plaque invalide")
    private String plateNumber;

    private String brand;

    private String model;

    private LocalDate purchaseDate;

    private Status status = Status.DISPONIBLE;
}

