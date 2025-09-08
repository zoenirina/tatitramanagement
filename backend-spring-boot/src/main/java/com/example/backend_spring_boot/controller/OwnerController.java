package com.example.backend_spring_boot.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

