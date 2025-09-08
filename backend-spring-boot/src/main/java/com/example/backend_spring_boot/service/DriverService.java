package com.example.backend_spring_boot.service;

import com.example.backend_spring_boot.model.Driver;
import com.example.backend_spring_boot.dto.request.DriverRequest;
import com.example.backend_spring_boot.dto.response.ApiResponse;
import com.example.backend_spring_boot.dto.response.DriverResponse;
import com.example.backend_spring_boot.dto.response.PagedResponse;
import com.example.backend_spring_boot.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface DriverService {

    PagedResponse<DriverResponse> getAllDrivers(int page, int size);

//    PagedResponse<Driver> getDriversByCategory(Long categoryId, int page, int size);

//    PagedResponse<Driver> getDriversByTag(Long tagId, int page, int size);

//    DriverResponse addDriver(DriverRequest driverRequest, UserPrincipal currentUser);

    ResponseEntity<Driver> addDriver(DriverRequest driverRequest, UserPrincipal currentUser);

    Driver getDriver(Long id);

    ResponseEntity<DriverResponse> updateDriver(Long id, DriverRequest newDriverRequest, UserPrincipal currentUser);

    ApiResponse deleteDriver(Long id, UserPrincipal currentUser);
}

