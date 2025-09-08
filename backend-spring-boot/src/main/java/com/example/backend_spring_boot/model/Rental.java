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

    // Identifiant unique de la location
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Véhicule concerné par la location
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    // Conducteur associé à la location
    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    // Date et heure de début de la location (initialisée à maintenant)
    private LocalDateTime startDate = LocalDateTime.now();

    // Tarif journalier appliqué à cette location par défaut
    private BigDecimal dailyRate;

    // Date et heure de retour du véhicule
    private LocalDateTime returnDate;

    // Statut actuel de la location (en cours, terminée, en retard)
    @Enumerated(EnumType.STRING)
    private RentalStatus status = RentalStatus.EN_COURS;

    // Transaction associée à cette location (paiement, facturation, etc.)
    @OneToOne(mappedBy = "rental")
    private Transaction transaction;

    // Enumération des statuts possibles d'une location
    public enum RentalStatus {
        EN_COURS,     // Location active
        TERMINEE,     // Location terminée
        EN_RETARD     // Retour non effectué à temps
    }
}
