package com.example.backend_spring_boot.controller;

import com.example.backend_spring_boot.model.Vehicle;
import com.example.backend_spring_boot.dto.request.VehicleRequest;
import com.example.backend_spring_boot.dto.response.ApiResponse;
import com.example.backend_spring_boot.dto.response.PagedResponse;
import com.example.backend_spring_boot.security.CurrentUser;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // Obtenir un véhicule par son ID
    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    // Obtenir tous les véhicules (pagination)
    @GetMapping
    public PagedResponse<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // Obtenir les véhicules d’un propriétaire
    @GetMapping("/owner/{ownerId}")
    public PagedResponse<Vehicle> getVehiclesByOwner(@PathVariable Long ownerId) {
        return vehicleService.getVehiclesByOwnerId(ownerId);
    }

    // Rechercher des véhicules par mot-clé
    @GetMapping("/search")
    public PagedResponse<Vehicle> searchVehicles(@RequestParam String keyword) {
        return vehicleService.searchVehicles(keyword);
    }

    // Ajouter un véhicule
    @PostMapping("/add")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Vehicle> addVehicle(@Valid @RequestBody VehicleRequest request,
                                              @CurrentUser UserPrincipal currentUser) {
        return vehicleService.addVehicle(request, currentUser);
    }

    //  Mettre à jour un véhicule
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id,
                                 @Valid @RequestBody VehicleRequest request,
                                 @CurrentUser UserPrincipal currentUser) {
        return vehicleService.updateVehicle(id, request, currentUser);
    }

    // Supprimer un véhicule
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ApiResponse deleteVehicle(@PathVariable Long id,
                                     @CurrentUser UserPrincipal currentUser) {
        return vehicleService.deleteVehicle(id, currentUser);
    }

    // Compter les véhicules
    @GetMapping("/count")
    public long countVehicles() {
        return vehicleService.countVehicles();
    }

    // Obtenir les véhicules disponibles
    @GetMapping("/available")
    public PagedResponse<Vehicle> getAvailableVehicles() {
        return vehicleService.getAvailableVehicles();
    }

    // Obtenir les véhicules par statut
    @GetMapping("/status")
    public PagedResponse<Vehicle> getVehiclesByStatus(@RequestParam String status) {
        return vehicleService.getVehiclesByStatus(status);
    }

    // Marquer un véhicule comme en maintenance
    @PutMapping("/maintenance/{vehicleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse markAsUnderMaintenance(@PathVariable Long vehicleId) {
        return vehicleService.markAsUnderMaintenance(vehicleId);
    }

    // Marquer un véhicule comme disponible
    @PutMapping("/available/{vehicleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse markAsAvailable(@PathVariable Long vehicleId) {
        return vehicleService.markAsAvailable(vehicleId);
    }

    // Importation en masse de véhicules
    @PostMapping("/bulk-import")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse bulkImportVehicles(@RequestBody List<@Valid VehicleRequest> vehicleRequests) {
        return vehicleService.bulkImportVehicles(vehicleRequests);
    }

    // Vérifier si l’utilisateur peut modifier un véhicule
    @GetMapping("/can-modify/{vehicleId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public boolean canModifyVehicle(@PathVariable Long vehicleId,
                                    @CurrentUser UserPrincipal currentUser) {
        return vehicleService.canModifyVehicle(vehicleId, currentUser);
    }
}
