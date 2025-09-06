package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.transaction.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
