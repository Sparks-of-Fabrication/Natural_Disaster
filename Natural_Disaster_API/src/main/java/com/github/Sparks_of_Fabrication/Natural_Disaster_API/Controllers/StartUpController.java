package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.DisasterRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.SeverityDisasterService;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.SeverityDisaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.TypeDisasterEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.TypeDisasterService;
@RestController
@RequestMapping("/api/startup")
public class StartUpController {
    @Autowired
    private TypeDisasterService typeDisasterService;
    @Autowired
    private DisasterRepository disasterRepository;
    @Autowired
    private SeverityDisasterService severityService;

    // Endpoint to fetch disaster types from the enum
    @GetMapping("/disaster-types")
    public String[] getDisasterTypes() {
        return Stream.of(TypeDisasterEnum.values())  // Create a stream from enum values
                .map(Enum::name)  // Convert each enum constant to a string
                .toArray(String[]::new);  // Return as an array of strings
    }
    @GetMapping("/severity-levels")
    public String[] getSeverityLevels() {
        return Stream.of(SeverityDisaster.values())  // Create a stream from the severity enum values
                .map(Enum::name)  // Convert each enum constant to a string
                .toArray(String[]::new);  // Return as an array of strings
    }

    @GetMapping("/getDisasters")
    public ResponseEntity<List<Disaster>> getDisasters() {
        return ResponseEntity.ok(disasterRepository.findAll());
    }


    @PostMapping("/addDisaster")
    public ResponseEntity<Boolean> addDisaster(@RequestBody Disaster disaster) {
            System.out.println(disaster);
            disasterRepository.save(disaster);
            return ResponseEntity.ok(true);
    }
    @PostMapping("/JSON")
    public ResponseEntity<String> createDisaster(@RequestBody String rawJson) {
        System.out.println("RAW JSON: " + rawJson);
        return ResponseEntity.ok(rawJson);
    }
    @PostMapping("/test")
    public ResponseEntity<String> createDisaster(@RequestBody String username,@RequestBody String password) {
        System.out.println("username: " + username + " password: " + password);
        return ResponseEntity.ok(username + " password: " + password);
    }

    @GetMapping("/save-disaster-types")
    public String saveDisasterTypes() {
        typeDisasterService.saveDisasterTypes();
        return "Disaster types saved successfully!";
    }
    @GetMapping("/save-severity")
    public String saveSeverity() {
        severityService.loadSeverityLevels();
        return "Severity saved successfully!";
    }
}
