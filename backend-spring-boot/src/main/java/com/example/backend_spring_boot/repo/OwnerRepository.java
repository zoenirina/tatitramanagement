package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
