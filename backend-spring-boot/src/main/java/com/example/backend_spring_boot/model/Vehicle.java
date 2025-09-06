package com.example.backend_spring_boot.model;

import com.example.backend_spring_boot.model.transaction.Transaction;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(name = "plate_number", nullable = false, unique = true)
    private String plateNumber;

    private String brand;

    private String model;

    private LocalDate purchaseDate;

    @OneToMany(mappedBy = "vehicle")
    private List<Rental> rentals;

    @OneToMany(mappedBy = "vehicle")
    private List<Transaction> transactions;

    @Enumerated(EnumType.STRING)
    private Status status = Status.DISPONIBLE;

    public enum Type {
        POUSSE_POUSSE,
        VOITURE,
        MOTO,
        CAMION,
        FOURGON,
        BUS
    }

    public enum Status {
        DISPONIBLE,
        LOUE,
        EN_MAINTENANCE, // Véhicule en réparation
        HORS_SERVICE // Véhicule Hors service
    }

}
