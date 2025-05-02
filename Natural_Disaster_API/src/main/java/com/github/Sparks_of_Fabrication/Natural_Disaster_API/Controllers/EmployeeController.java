package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Employee;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.DisasterRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DisasterRepository disasterRepository;

    // Get employee by username (or id)
    @GetMapping("/{username}")
    public ResponseEntity<Employee> getEmployeeByUsername(@PathVariable String username) {
        Optional<Employee> employee = employeeRepository.findByUsername(username);
        return employee.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/api/disasters/unapproved")
    public List<Disaster> getUnapprovedDisasters() {
        return disasterRepository.findByApprovedFalse();
    }
    @GetMapping(value = "/employee/dashboard")
    public String forward() {
        return "forward:/EmployeeDashboard";
    }

    // You can add more endpoints here, like:
    // - update profile
    // - list assigned disasters
    // - mark disaster as resolved
}
