package com.example.backend_spring_boot.model;

import com.example.backend_spring_boot.model.transaction.Transaction;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "drivers")
public class Driver {

    public enum Status {
        ACTIF,
        INACTIF,
        SUSPENDU
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String photo;

    @Column(nullable = false)
    private String firstName;

    private String lastName;

    @Column(nullable = false, unique = true)
    private String phone;

    @Lob
    private String address;

    private LocalDate hireDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIF;

    @Column(precision = 10, scale = 2)
    private BigDecimal amountDue = BigDecimal.ZERO;

    @OneToMany(mappedBy = "driver")
    private List<Transaction> transactions;
}

