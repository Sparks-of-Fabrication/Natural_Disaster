package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.TestService;
import lombok.Getter;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller("/tests")
@Getter
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("/")
    public String getTests() {
        return testService.fetchTests().toString();
    }

    @PostMapping("/")
    public String createTest() {
        Pair<Boolean, String> testServiceResponse = testService.createTest();

        return testServiceResponse.toString();
    }
}
