package com.example.backend_spring_boot.service;

import com.example.backend_spring_boot.model.Rental;
import com.example.backend_spring_boot.dto.request.RentalRequest;
import com.example.backend_spring_boot.dto.response.ApiResponse;
import com.example.backend_spring_boot.dto.response.PagedResponse;
import com.example.backend_spring_boot.security.UserPrincipal;

import java.time.LocalDateTime;
import java.util.List;

public interface RentalService {
    // Lire les locations
    Rental getRentalById(Long id);

    PagedResponse<Rental> getAllRentals();

    PagedResponse<Rental> getRentalsByDriverId(Long driverId);

    PagedResponse<Rental> getRentalsByVehicleId(Long vehicleId);

    PagedResponse<Rental> getActiveRentals();

    // Créer une nouvelle location
    Rental createRental(RentalRequest rentalRequest, UserPrincipal currentUser);

    //  Mettre à jour une location existante
    Rental updateRental(Long id, RentalRequest rentalRequest, UserPrincipal currentUser);

    // Supprimer une location
    ApiResponse deleteRental(Long id, UserPrincipal currentUser);

    // Statistiques ou état
    long countRentals();

    List<Rental> getLateRentals();

    ApiResponse markRentalAsReturned(Long rentalId, LocalDateTime returnDate);

    // Vérification d'autorisation
    boolean canModifyRental(Long rentalId, UserPrincipal currentUser);
}
