package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.DisasterService;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

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

        boolean isEmployee = false;
        System.out.println(token);
        if (token != null && token.startsWith("Bearer ")) {
            String extractedToken = token.substring(7);
            isEmployee = jwtTokenUtil.validateToken(extractedToken);
        }

        LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;

        List<Disaster> disasters = disasterService.getDisasters(type, start, end, isEmployee);
        System.out.println(disasters);
        return ResponseEntity.ok(disasters);
    }
    @PutMapping("/api/disaster/approve/{id}")
    public ResponseEntity<Void> approveDisaster(@PathVariable UUID id) {
        disasterService.approveDisaster(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/disaster/delete/{id}")
    public ResponseEntity<Void> deleteDisaster(@PathVariable UUID id) {
        disasterService.deleteDisaster(id);
        return ResponseEntity.noContent().build();
    }


}
