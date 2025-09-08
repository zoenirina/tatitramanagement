package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Long> {
}
