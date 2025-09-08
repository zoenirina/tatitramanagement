package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


import com.example.backend_spring_boot.model.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    // 🔍 Récupérer les véhicules d'un propriétaire avec pagination
    Page<Vehicle> findByOwnerId(Long ownerId, Pageable pageable);

    // 🔍 Récupérer les véhicules par statut avec pagination
    Page<Vehicle> findByStatus(Vehicle.Status status, Pageable pageable);

    // 🔍 Recherche par mot-clé (plaque, marque ou modèle)
    @Query("""
        SELECT v FROM Vehicle v
        WHERE LOWER(v.plateNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(v.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(v.model) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<Vehicle> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
