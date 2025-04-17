package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Test;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.TestRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    private final TestRepository testRepository;


    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public List<Test> fetchTests() {

        return testRepository.findAll();
    }

    public Pair<Boolean, String> createTest() {
        try {
            Test test = testRepository.save(new Test());

            return Pair.of(true, test.toString());
        }catch (Exception e) {
            return Pair.of(false, "Test couldn't be created!");
        }
    }
}
