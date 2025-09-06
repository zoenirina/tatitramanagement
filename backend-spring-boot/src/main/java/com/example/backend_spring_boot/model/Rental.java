package com.example.backend_spring_boot.model;

import com.example.backend_spring_boot.model.transaction.Transaction;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "rentals")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    private LocalDateTime startDate = LocalDateTime.now();

    private BigDecimal dailyRate;

    private LocalDateTime returnDate;

    @Enumerated(EnumType.STRING)
    private RentalStatus status = RentalStatus.EN_COURS;

    @OneToOne(mappedBy = "rental")
    private Transaction transaction;

    public enum RentalStatus {
        EN_COURS,
        TERMINEE,
        EN_RETARD
    }

}
