package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.role.Role;
import com.example.backend_spring_boot.model.role.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(RoleName name);
}
