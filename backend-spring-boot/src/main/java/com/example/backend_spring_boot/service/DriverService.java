package com.example.backend_spring_boot.service;

import com.example.backend_spring_boot.model.Driver;
import com.example.backend_spring_boot.payload.request.DriverRequest;
import com.example.backend_spring_boot.payload.response.ApiResponse;
import com.example.backend_spring_boot.payload.response.DriverResponse;
import com.example.backend_spring_boot.payload.response.PagedResponse;
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

