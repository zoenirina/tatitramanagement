package com.example.backend_spring_boot.model;

import com.example.backend_spring_boot.model.transaction.Transaction;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Propriétaire du véhicule
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    // Type de véhicule (ex: voiture, moto, camion...)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    // Numéro d'immatriculation du véhicule (doit être unique)
    @Column(name = "plate_number", nullable = false, unique = true)
    private String plateNumber;

    // Marque du véhicule (ex: Toyota, Peugeot)
    private String brand;

    // Modèle du véhicule (ex: Corolla, 208)
    private String model;

    // Date d'achat du véhicule
    private LocalDate purchaseDate;

    // Liste des locations associées à ce véhicule
    @OneToMany(mappedBy = "vehicle")
    private List<Rental> rentals;

    // Liste des transactions liées à ce véhicule
    @OneToMany(mappedBy = "vehicle")
    private List<Transaction> transactions;

    // Statut actuel du véhicule (disponible, loué, en maintenance, hors service)
    @Enumerated(EnumType.STRING)
    private Status status = Status.DISPONIBLE;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Enumération des types de véhicules gérés
    public enum Type {
        POUSSE_POUSSE,
        VOITURE,
        MOTO,
        CAMION,
        FOURGON,
        BUS
    }

    // Enumération des statuts possibles d’un véhicule
    public enum Status {
        DISPONIBLE,       // Le véhicule est disponible à la location
        LOUE,             // Le véhicule est actuellement loué
        EN_MAINTENANCE,   // Le véhicule est en réparation ou entretien
        HORS_SERVICE      // Le véhicule est retiré du service
    }
}
