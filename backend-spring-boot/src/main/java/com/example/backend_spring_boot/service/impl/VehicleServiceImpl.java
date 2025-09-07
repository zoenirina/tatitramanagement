package com.example.backend_spring_boot.service.impl;

import com.example.backend_spring_boot.repo.VehicleRepository;
import com.example.backend_spring_boot.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class VehicleServiceImpl implements VehicleService {

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    ModelMapper modelMapper;


}
