package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Employee;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Role;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Severity;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.TypeDisaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.*;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.TypeDisasterEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private SeverityRepository severityRepository;
    @Autowired
    private TypeDisasterRepository typeDisasterRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Role addRole(Role role) {
        role.setName(role.getName().toUpperCase());
        roleRepository.save(role);
        return role;
    }
    public Severity addSeverity(Severity severity) {
       severityRepository.save(severity);
        return severity;
    }
    public TypeDisaster addTypeDisaster(TypeDisaster typeDisaster) {
        typeDisasterRepository.save(typeDisaster);
        return typeDisaster;
    }
    public Employee addEmployee(Employee employee) {
        employeeRepository.save(employee);

        return employee;
    }
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    public List<Severity> getAllSeverities() {
        return severityRepository.findAll();
    }
    public List<TypeDisaster> getAllTypeDisaster() {
        return typeDisasterRepository.findAll();
    }
    public List<Employee> getAllEmployees() {
        return  employeeRepository.findAll();
    }

    // EmployeeService.java
    public void deleteRoleById(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new IllegalArgumentException("Role with ID " + id + " does not exist.");
        }
        roleRepository.deleteById(id);
    }
    public void deleteSeverityById(UUID id) {
        if(!severityRepository.existsById(id)){
            throw new IllegalArgumentException("Severity with ID " + id + " does not exist.");
        }
        severityRepository.deleteById(id);
    }

    public void deleteTypeDisasterById(UUID id) {
        if(!typeDisasterRepository.existsById(id)){
            throw new IllegalArgumentException("Severity with ID " + id + " does not exist.");
        }
        typeDisasterRepository.deleteById(id);
    }
    public void deleteEmployeeById(Long id) {
        if(!employeeRepository.existsById(id)){
            throw new IllegalArgumentException("Severity with ID " + id + " does not exist.");
        }
        employeeRepository.deleteById(id);
    }


    public Employee updateEmployee(Long id, Employee employee) {
        // Fetch the existing employee from the database
        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));

        // Check if username is being changed
        if (employee.getUsername() != null && !employee.getUsername().equals(existingEmployee.getUsername())) {
            // Check if the new username already exists
            Optional<Employee> employeeWithSameUsername = employeeRepository.findByUsername(employee.getUsername());
            if (employeeWithSameUsername.isPresent()) {
                throw new RuntimeException("Username already exists.");
            }
            existingEmployee.setUsername(employee.getUsername());
        }

        // Handle password change (if provided)
        if (employee.getPassword() != null && !employee.getPassword().isEmpty()) {
            existingEmployee.setPassword(passwordEncoder.encode(employee.getPassword()));  // Hash the new password
        }

        if (employee.getName() != null) {existingEmployee.setName(employee.getName());}
        if (employee.getRole() != null) {existingEmployee.setRole(employee.getRole());}
        return employeeRepository.save(existingEmployee);
    }

}
