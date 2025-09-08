package com.example.backend_spring_boot.model.transaction;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;

    private BigDecimal cost;

    private String performedBy;
//    private LocalDate nextDueDate;

//    private LocalDateTime createdAt = LocalDateTime.now();
//    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    public enum ExpenseCategory {
        Fuel,
        Maintenance,
        Violation,
        Pénalité,
        Dette,
        Other
    }

//    @PreUpdate
//    public void onUpdate() {
//        this.updatedAt = LocalDateTime.now();
//    }
}