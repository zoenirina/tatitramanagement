package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository  extends JpaRepository<Driver, Long> {
}
