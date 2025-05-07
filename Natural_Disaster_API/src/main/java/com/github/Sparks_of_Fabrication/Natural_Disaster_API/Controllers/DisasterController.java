package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.DisasterService;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class DisasterController {

    @Autowired
    private DisasterService disasterService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/api/disaster/getDisasters")
    public ResponseEntity<List<Disaster>> getDisasters(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestHeader(value = "Authorization", required = false) String token) {

        // Determine if the user is an employee/admin based on the token
        boolean isEmployee = false;
        System.out.println(token);
        if (token != null && token.startsWith("Bearer ")) {
            String extractedToken = token.substring(7); // remove "Bearer " part
            isEmployee = jwtTokenUtil.validateToken(extractedToken);
        }

        LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
        // Apply disaster service logic based on employee status
        List<Disaster> disasters = disasterService.getDisasters(type, start, end, isEmployee);
        System.out.println(disasters);

        return ResponseEntity.ok(disasters);
    }


}
