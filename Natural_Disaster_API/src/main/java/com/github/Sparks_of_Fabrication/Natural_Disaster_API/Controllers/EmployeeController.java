package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.*;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.DisasterRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.EmployeeRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:8080")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/addRole")
    public ResponseEntity<Role> addRole(@Valid @RequestBody Role role){
        return ResponseEntity.ok(employeeService.addRole(role));
    }
    @PostMapping("/addSeverity")
    public ResponseEntity<Severity> addSeverity(@Valid @RequestBody Severity severity){
        return ResponseEntity.ok(employeeService.addSeverity(severity));
    }
    @PostMapping("/addType")
    public ResponseEntity<TypeDisaster> addType(@Valid @RequestBody TypeDisaster typeDisaster){
        return ResponseEntity.ok(employeeService.addTypeDisaster(typeDisaster));
    }
    @PostMapping("/addEmployee")
    public ResponseEntity<Employee> addType(@Valid @RequestBody Employee employee){
        return ResponseEntity.ok(employeeService.addEmployee(employee));
    }
    @GetMapping("/getRoles")
    public ResponseEntity<List<Role>> getRoles(){
        return ResponseEntity.ok(employeeService.getAllRoles());
    }
    @GetMapping("/getSeverities")
    public ResponseEntity<List<Severity>> getSeverity(){
        return ResponseEntity.ok(employeeService.getAllSeverities());
    }
    @GetMapping("/getTypes")
    public ResponseEntity<List<TypeDisaster>> getType(){
        return ResponseEntity.ok(employeeService.getAllTypeDisaster());
    }
    @GetMapping("/getEmployees")
    public ResponseEntity<List<Employee>> getEmployees(){
        List<Employee> employees = employeeService.getAllEmployees();
        employees.forEach(employee -> employee.setPassword(""));
        return ResponseEntity.ok(employees);
    }
    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(updatedEmployee);
    }
    @DeleteMapping("/deleteRole/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Long id) {
        employeeService.deleteRoleById(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/deleteSeverity/{id}")
    public ResponseEntity<?> deleteSeverity(@PathVariable UUID id) {
        employeeService.deleteSeverityById(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/deleteType/{id}")
    public ResponseEntity<?> deleteType(@PathVariable UUID id) {
        employeeService.deleteTypeDisasterById(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.ok().build();
    }

}
