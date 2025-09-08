package com.example.backend_spring_boot.service.impl;

import com.example.backend_spring_boot.dto.response.ApiResponse;
import com.example.backend_spring_boot.dto.response.PagedResponse;
import com.example.backend_spring_boot.exception.ResourceNotFoundException;
import com.example.backend_spring_boot.model.Owner;
import com.example.backend_spring_boot.model.Vehicle;
import com.example.backend_spring_boot.repo.OwnerRepository;
import com.example.backend_spring_boot.repo.VehicleRepository;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.service.VehicleService;
import com.example.backend_spring_boot.utils.AppUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import  com.example.backend_spring_boot.dto.request.VehicleRequest;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class VehicleServiceImpl implements VehicleService {
    private final VehicleRepository vehicleRepository;
    private final OwnerRepository ownerRepository;
    private final ModelMapper modelMapper;

    public VehicleServiceImpl(VehicleRepository vehicleRepository,
                              OwnerRepository ownerRepository,
                              ModelMapper modelMapper) {
        this.vehicleRepository = vehicleRepository;
        this.ownerRepository = ownerRepository;
        this.modelMapper = modelMapper;
    }

    // Récupérer un véhicule par ID
    @Override
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", "id", id));
    }

    // Récupérer tous les véhicules (paginés)
    @Override
    public PagedResponse<Vehicle> getAllVehicles(int page, int size) {
        AppUtils.validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");

        Page<Vehicle> vehicles = vehicleRepository.findAll(pageable);
        return new PagedResponse<>(
                vehicles.getContent(),
                vehicles.getNumber(),
                vehicles.getSize(),
                vehicles.getTotalElements(),
                vehicles.getTotalPages(),
                vehicles.isLast()
        );
    }

    // Récupérer les véhicules d’un propriétaire
    @Override
    public PagedResponse<Vehicle> getVehiclesByOwnerId(Long ownerId, int page, int size) {
        AppUtils.validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Vehicle> vehicles = vehicleRepository.findByOwnerId(ownerId, pageable);
        return new PagedResponse<>(
                vehicles.getContent(),
                vehicles.getNumber(),
                vehicles.getSize(),
                vehicles.getTotalElements(),
                vehicles.getTotalPages(),
                vehicles.isLast()
        );
    }

    // Récupérer les véhicules de l'utilisateur connecté
    @Override
    public PagedResponse<Vehicle> getVehiclesByCurrentUser(UserPrincipal currentUser, int page, int size) {
        AppUtils.validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Vehicle> vehicles = vehicleRepository.findByOwnerId(currentUser.getId(), pageable);
        return new PagedResponse<>(
                vehicles.getContent(),
                vehicles.getNumber(),
                vehicles.getSize(),
                vehicles.getTotalElements(),
                vehicles.getTotalPages(),
                vehicles.isLast()
        );
    }

//    // Rechercher des véhicules par mot-clé
//    @Override
//    public PagedResponse<Vehicle> searchVehicles(String keyword) {
//        List<Vehicle> vehicles = vehicleRepository.searchByKeyword(keyword);
//        return new PagedResponse<>(vehicles, vehicles.size());
//    }

    // ➕ Ajouter un véhicule
    @Override
    public ResponseEntity<Vehicle> addVehicle(VehicleRequest request, UserPrincipal currentUser) {
        Owner owner = ownerRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner", "id", request.getOwnerId()));

        Vehicle vehicle = modelMapper.map(request, Vehicle.class);
        vehicle.setOwner(owner);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(savedVehicle);
    }

    // ✏️ Mettre à jour un véhicule
    @Override
    public ResponseEntity<Vehicle> updateVehicle(Long id, VehicleRequest request, UserPrincipal currentUser) {
        Vehicle vehicle = getVehicleById(id);
        modelMapper.map(request, vehicle);
        Vehicle updatedVehicle = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(updatedVehicle);
    }

    // ❌ Supprimer un véhicule
    @Override
    public ApiResponse deleteVehicle(Long id, UserPrincipal currentUser) {
        Vehicle vehicle = getVehicleById(id);
        vehicleRepository.delete(vehicle);
        return new ApiResponse(true, "Véhicule supprimé avec succès");
    }

    // 📋 Récupérer les véhicules disponibles
    @Override
    public PagedResponse<Vehicle> getAvailableVehicles(int page, int size, UserPrincipal currentUser) {
        AppUtils.validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");

        Page<Vehicle> vehicles = vehicleRepository.findByStatus(Vehicle.Status.DISPONIBLE, pageable);
        return new PagedResponse<>(
                vehicles.getContent(),
                vehicles.getNumber(),
                vehicles.getSize(),
                vehicles.getTotalElements(),
                vehicles.getTotalPages(),
                vehicles.isLast()
        );
    }

    // Récupérer les véhicules par statut
    @Override
    public PagedResponse<Vehicle> getVehiclesByStatus(String status, UserPrincipal currentUser) {
        Vehicle.Status vehicleStatus = Vehicle.Status.valueOf(status.toUpperCase());
//        List<Vehicle> vehicles = vehicleRepository.findByStatus(vehicleStatus);
//        return new PagedResponse<>(vehicles, vehicles.size());

        Pageable pageable = PageRequest.of(0, 15, Sort.Direction.DESC, "createdAt");

        Page<Vehicle> vehicles = vehicleRepository.findByStatus(vehicleStatus, pageable);
        return new PagedResponse<>(
                vehicles.getContent(),
                vehicles.getNumber(),
                vehicles.getSize(),
                vehicles.getTotalElements(),
                vehicles.getTotalPages(),
                vehicles.isLast()
        );
    }

    // Marquer un véhicule comme en maintenance
    @Override
    public ApiResponse markAsUnderMaintenance(Long vehicleId) {
        Vehicle vehicle = getVehicleById(vehicleId);
        vehicle.setStatus(Vehicle.Status.EN_MAINTENANCE);
        vehicleRepository.save(vehicle);
        return new ApiResponse(true, "Véhicule marqué comme en maintenance");
    }

    // Marquer un véhicule comme disponible
    @Override
    public ApiResponse markAsAvailable(Long vehicleId) {
        Vehicle vehicle = getVehicleById(vehicleId);
        vehicle.setStatus(Vehicle.Status.DISPONIBLE);
        vehicleRepository.save(vehicle);
        return new ApiResponse(true, "Véhicule marqué comme disponible");
    }

    // Importer plusieurs véhicules
    @Override
    public ApiResponse bulkImportVehicles(List<VehicleRequest> vehicleRequests) {
        List<Vehicle> vehicles = vehicleRequests.stream()
                .map(req -> {
                    Owner owner = ownerRepository.findById(req.getOwnerId())
                            .orElseThrow(() -> new ResourceNotFoundException("Owner", "id", req.getOwnerId()));
                    Vehicle v = modelMapper.map(req, Vehicle.class);
                    v.setOwner(owner);
                    return v;
                })
                .collect(Collectors.toList());

        vehicleRepository.saveAll(vehicles);
        return new ApiResponse(true, vehicles.size() + " véhicules importés avec succès");
    }


    @Override
    public PagedResponse<Vehicle> getAllVehicles() {
        return null;
    }


    @Override
    public PagedResponse<Vehicle> getVehiclesByOwnerId(Long ownerId) {
        return null;
    }

    @Override
    public PagedResponse<Vehicle> searchVehicles(String keyword) {
        return null;
    }



    @Override
    public PagedResponse<Vehicle> getAvailableVehicles() {
        return null;
    }

    @Override
    public PagedResponse<Vehicle> getVehiclesByStatus(String status) {
        return null;
    }


}
