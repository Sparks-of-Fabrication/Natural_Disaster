package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.HTTP_RR.AuthRequest;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.HTTP_RR.AuthResponse;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Employee;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.EmployeeRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.AuthorizationService;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.JwtTokenUtil;  // Import the JwtTokenUtil
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8081")
public class AuthController {

    private final AuthorizationService authService;

    public AuthController(AuthorizationService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {
        return authService.authorize(request);
    }
}
