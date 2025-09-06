package com.example.backend_spring_boot.model.transaction;

import com.example.backend_spring_boot.model.Driver;
import com.example.backend_spring_boot.model.Rental;
import com.example.backend_spring_boot.model.Vehicle;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amountDue;
    private BigDecimal amountPaid;

    private LocalDateTime paymentDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Transient
    private PaymentStatus status;

//    private LocalDateTime createdAt = LocalDateTime.now();
//    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    public enum PaymentMethod {
        Espèces,
        Mobile_Money,
        Virement_bancaire,
        Chèque,
        Autre
    }

    public enum PaymentStatus {
        Payé,
        Partiel,
        Trop_perçu,
        En_attente
    }

    @PrePersist
    @PreUpdate
    public void prePersistOrUpdate() {
        if (amountPaid == null || amountDue == null) {
            status = PaymentStatus.En_attente;
        } else if (amountPaid.compareTo(amountDue) == 0) {
            status = PaymentStatus.Payé;
        } else if (amountPaid.compareTo(amountDue) < 0) {
            status = PaymentStatus.Partiel;
        } else {
            status = PaymentStatus.Trop_perçu;
        }
//        updatedAt = LocalDateTime.now();
    }
}

