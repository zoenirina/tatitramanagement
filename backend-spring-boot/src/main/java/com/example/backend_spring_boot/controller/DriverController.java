package com.example.backend_spring_boot.controller;

import com.example.backend_spring_boot.model.Driver;
import com.example.backend_spring_boot.dto.request.DriverRequest;
import com.example.backend_spring_boot.dto.response.ApiResponse;
import com.example.backend_spring_boot.dto.response.DriverResponse;
import com.example.backend_spring_boot.dto.response.PagedResponse;
import com.example.backend_spring_boot.security.CurrentUser;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.service.DriverService;
import com.example.backend_spring_boot.utils.AppConstants;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping
    public ResponseEntity<PagedResponse<DriverResponse>> getAllDrivers(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
        PagedResponse<DriverResponse> response = driverService.getAllDrivers(page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<PagedResponse<Driver>> getAllDrivers(
//            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
//            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
//        PagedResponse<Driver> response = driverService.getAllDrivers(page, size);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

//    @GetMapping("/driver/{id}")
//    public ResponseEntity<PagedResponse<Driver>> getDriversByCategory(
//            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
//            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size,
//            @PathVariable("id") Long categoryId) {
//        PagedResponse<Driver> response = driverService.getDriversByCategory(categoryId, page, size);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Driver> addDriver(
            @Valid @RequestBody DriverRequest driverRequest,
            @CurrentUser UserPrincipal currentUser) {
        return driverService.addDriver(driverRequest, currentUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriver(@PathVariable("id") Long id) {
        Driver driver = driverService.getDriver(id);
        return new ResponseEntity<>(driver, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<DriverResponse> updateDriver(
            @PathVariable("id") Long id,
            @Valid @RequestBody DriverRequest newDriverRequest,
            @CurrentUser UserPrincipal currentUser) {
        return driverService.updateDriver(id, newDriverRequest, currentUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteDriver(
            @PathVariable("id") Long id,
            @CurrentUser UserPrincipal currentUser) {
        ApiResponse apiResponse = driverService.deleteDriver(id, currentUser);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}

