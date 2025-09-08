package com.example.backend_spring_boot.service.impl;

import com.example.backend_spring_boot.model.Driver;
import com.example.backend_spring_boot.service.DriverService;
import com.example.backend_spring_boot.exception.ResourceNotFoundException;
import com.example.backend_spring_boot.dto.request.DriverRequest;
import com.example.backend_spring_boot.dto.response.ApiResponse;
import com.example.backend_spring_boot.dto.response.DriverResponse;
import com.example.backend_spring_boot.dto.response.PagedResponse;
import com.example.backend_spring_boot.repo.DriverRepository;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.utils.AppUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.example.backend_spring_boot.utils.AppConstants.*;

@Service
public class DriverServiceImpl implements DriverService {


    @Autowired
    DriverRepository driverRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public PagedResponse<DriverResponse> getAllDrivers(int page, int size) {
        AppUtils.validatePageNumberAndSize(page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "hireDate");

        Page<Driver> drivers = driverRepository.findAll(pageable);

        if (drivers.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), drivers.getNumber(), drivers.getSize(), drivers.getTotalElements(),
                    drivers.getTotalPages(), drivers.isLast());
        }

        List<DriverResponse> driverResponses = Arrays.asList(modelMapper.map(drivers.getContent(), DriverResponse[].class));

        return new PagedResponse<>(driverResponses, drivers.getNumber(), drivers.getSize(), drivers.getTotalElements(), drivers.getTotalPages(),
                drivers.isLast());
    }


    public ResponseEntity<Driver> addDriver(DriverRequest driverRequest, UserPrincipal currentUser) {
        Driver newDriver = new Driver();
        modelMapper.map(driverRequest, newDriver);
        driverRepository.save(newDriver);
        return new ResponseEntity<>(newDriver, HttpStatus.OK);
    }

    @Override
    public Driver getDriver(Long id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(POST, ID, id));
    }

    @Override
    public ResponseEntity<DriverResponse> updateDriver(Long id, DriverRequest driverRequest, UserPrincipal currentUser) {
        Driver driverToUpdate = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "id", id));

        // Appliquer les modifications venant du DriverRequest sur driverToUpdate
        modelMapper.map(driverRequest, driverToUpdate);

        // Sauvegarde en DB
        Driver updatedDriver = driverRepository.save(driverToUpdate);

        // Mapper vers la réponse
        DriverResponse driverResponse = modelMapper.map(updatedDriver, DriverResponse.class);

        return new ResponseEntity<>(driverResponse, HttpStatus.OK);
    }


    @Override
    public ApiResponse deleteDriver(Long id, UserPrincipal currentUser) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(POST, ID, id));
        driverRepository.delete(driver);
        return new ApiResponse(Boolean.TRUE, "Conducteur supprimé avec succès !");

    }
}
