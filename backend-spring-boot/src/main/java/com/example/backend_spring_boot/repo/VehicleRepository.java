package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
