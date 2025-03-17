package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Test;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.TestService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.util.Pair;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@Getter
@RequestMapping("/test")
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("")
    public ResponseEntity<List<Test>> getTests() {
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(testService.fetchTests(), headers, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createTest() {
        Pair<Boolean, String> testServiceResponse = testService.createTest();
        HttpHeaders headers = new HttpHeaders();

        return new ResponseEntity<>(testServiceResponse.getSecond(), headers, HttpStatus.CREATED);
    }
}
