package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.HTTP_RR.AuthRequest;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.HTTP_RR.AuthResponse;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Employee;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.EmployeeRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthorizationService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public AuthResponse authorize(AuthRequest request) {
        Optional<Employee> optionalEmployee = employeeRepository.findByUsername(request.getUsername());

        if (optionalEmployee.isEmpty()) {
            return new AuthResponse("Invalid username or password", null);
        }

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), optionalEmployee.get().getPassword());

        if (!passwordMatches) {
            return new AuthResponse("Invalid username or password", null);
        }

        // If authentication is successful, generate JWT token using JwtTokenUtil
        String token = jwtTokenUtil.generateToken(optionalEmployee.get().getUsername(), optionalEmployee.get().getRole().getName());

        // Return response with the generated token
        return new AuthResponse("Login successful", token);
    }
}
