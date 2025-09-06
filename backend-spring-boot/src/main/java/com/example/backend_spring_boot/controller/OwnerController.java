package com.example.backend_spring_boot.controller;


import com.example.backend_spring_boot.model.Driver;
import com.example.backend_spring_boot.model.Owner;
import com.example.backend_spring_boot.payload.request.DriverRequest;
import com.example.backend_spring_boot.payload.response.ApiResponse;
import com.example.backend_spring_boot.payload.response.DriverResponse;
import com.example.backend_spring_boot.payload.response.PagedResponse;
import com.example.backend_spring_boot.security.CurrentUser;
import com.example.backend_spring_boot.security.UserPrincipal;
import com.example.backend_spring_boot.service.DriverService;
import com.example.backend_spring_boot.utils.AppConstants;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {

//    @Autowired
//    private OwnerService ownerService;
//
//    @GetMapping
//    public ResponseEntity<PagedResponse<Owner>> getAllOwners(
//            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
//            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
//        PagedResponse<Owner> response = ownerService.getAllOwners(page, size);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Owner> getOwner(@PathVariable("id") Long id) {
//        Owner owner = ownerService.getOwner(id);
//        return new ResponseEntity<>(owner, HttpStatus.OK);
//    }
//
//    @PostMapping
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<OwnerResponse> addOwner(
//            @Valid @RequestBody OwnerRequest ownerRequest,
//            @CurrentUser UserPrincipal currentUser) {
//        OwnerResponse ownerResponse = ownerService.addOwner(ownerRequest, currentUser);
//        return new ResponseEntity<>(ownerResponse, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//    public ResponseEntity<Owner> updateOwner(
//            @PathVariable("id") Long id,
//            @Valid @RequestBody OwnerRequest newOwnerRequest,
//            @CurrentUser UserPrincipal currentUser) {
//        Owner updatedOwner = ownerService.updateOwner(id, newOwnerRequest, currentUser);
//        return new ResponseEntity<>(updatedOwner, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//    public ResponseEntity<ApiResponse> deleteOwner(
//            @PathVariable("id") Long id,
//            @CurrentUser UserPrincipal currentUser) {
//        ApiResponse apiResponse = ownerService.deleteOwner(id, currentUser);
//        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
//    }
}

