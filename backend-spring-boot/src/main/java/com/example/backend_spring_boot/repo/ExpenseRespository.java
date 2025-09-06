package com.example.backend_spring_boot.repo;

import com.example.backend_spring_boot.model.transaction.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRespository extends JpaRepository<Expense, Integer> {
}
