package com.example.backend_spring_boot.controller;

import com.example.backend_spring_boot.model.Vehicle;
import com.example.backend_spring_boot.repo.VehicleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Scanner;

@RestController
@CrossOrigin
@RequestMapping("/api/vehicle")
public class VehicleController {
    VehicleRepository vehicleRepository;

    @GetMapping(value = "/all")
    public List<Vehicle> getTestData() {
        return vehicleRepository.findAll();
    }
}
