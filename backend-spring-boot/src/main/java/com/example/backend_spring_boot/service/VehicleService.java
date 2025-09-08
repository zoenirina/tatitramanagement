package com.example.backend_spring_boot.service;

import com.example.backend_spring_boot.model.Driver;
import com.example.backend_spring_boot.model.Vehicle;
import com.example.backend_spring_boot.dto.request.VehicleRequest;
import com.example.backend_spring_boot.dto.response.ApiResponse;
import com.example.backend_spring_boot.dto.response.PagedResponse;
import com.example.backend_spring_boot.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface VehicleService {

    Vehicle getVehicleById(Long id);

    PagedResponse<Vehicle> getAllVehicles();

    //  Récupérer tous les véhicules
    PagedResponse<Vehicle> getAllVehicles(int page, int size);

    PagedResponse<Vehicle> getVehiclesByOwnerId(Long ownerId);

    PagedResponse<Vehicle> searchVehicles(String keyword);

    // Récupérer les véhicules d’un propriétaire
    PagedResponse<Vehicle> getVehiclesByOwnerId(Long ownerId, int page, int size);

    // Récupérer les véhicules de l'utilisateur connecté
    PagedResponse<Vehicle> getVehiclesByCurrentUser(UserPrincipal currentUser, int page, int size);

    ResponseEntity<Vehicle> addVehicle(VehicleRequest vehicleRequest, UserPrincipal currentUser);

    ResponseEntity<Vehicle> updateVehicle(Long id, VehicleRequest vehicleRequest, UserPrincipal currentUser);

    // Supprimer
    ApiResponse deleteVehicle(Long id, UserPrincipal currentUser);

    PagedResponse<Vehicle> getAvailableVehicles();

    PagedResponse<Vehicle> getVehiclesByStatus(String status); // ex: "active", "maintenance", "retired"

//    // Vérification d'autorisation
//    boolean canModifyVehicle(Long vehicleId, UserPrincipal currentUser);

    // Récupérer les véhicules disponibles
    PagedResponse<Vehicle> getAvailableVehicles(int page, int size, UserPrincipal currentUser);

    // Récupérer les véhicules par statut
    PagedResponse<Vehicle> getVehiclesByStatus(String status, UserPrincipal currentUser);

    //  Maintenance ou opérations métier
    ApiResponse markAsUnderMaintenance(Long vehicleId);

    ApiResponse markAsAvailable(Long vehicleId);

    // Import/export ou synchronisation
    ApiResponse bulkImportVehicles(List<VehicleRequest> vehicleRequests);

}
