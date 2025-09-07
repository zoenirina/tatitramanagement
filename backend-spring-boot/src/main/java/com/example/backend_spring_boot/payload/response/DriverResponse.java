package com.example.backend_spring_boot.payload.response;
import com.example.backend_spring_boot.model.Driver;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data // ou @Getter @Setter si tu utilises Lombok
@AllArgsConstructor
@NoArgsConstructor
public class DriverResponse {

    private Long id;
    private String photo;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDate hireDate;
    private String status;
    private BigDecimal amountDue;
}

