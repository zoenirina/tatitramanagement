package com.example.backend_spring_boot.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class SignUpRequest {
	@Pattern(
			regexp = ".*\\.(jpg|jpeg|png|gif)$",
			message = "Le nom de fichier doit se terminer par .jpg, .jpeg, .png ou .gif"
	)
	private String photo;

	@NotBlank
	@Size(min = 3, max = 15)
	private String username;

	@NotBlank
	@Size(max = 40)
	@Email
	private String email;

	@NotBlank
	@Size(min = 6, max = 20)
	private String password;
}
