package com.example.backend_spring_boot.service.impl;

import com.example.backend_spring_boot.repo.RentalRepository;
import com.example.backend_spring_boot.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;

public class RentalServiceImpl implements RentalService {

    @Autowired
    RentalRepository rentalRepository
}
