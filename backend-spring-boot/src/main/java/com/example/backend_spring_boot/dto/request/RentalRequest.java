package com.example.backend_spring_boot.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RentalRequest {

    // Identifiant du véhicule à louer
    @NotNull(message = "L'identifiant du véhicule est requis")
    private Long vehicleId;

    // Identifiant du conducteur
    @NotNull(message = "L'identifiant du conducteur est requis")
    private Long driverId;

    // Date de début de la location
    private LocalDateTime startDate = LocalDateTime.now();

    // Tarif journalier de la location
    @Positive(message = "Le tarif journalier doit être positif")
    private BigDecimal dailyRate;

    // Date de retour prévue ou effective
    private LocalDateTime returnDate;
}
