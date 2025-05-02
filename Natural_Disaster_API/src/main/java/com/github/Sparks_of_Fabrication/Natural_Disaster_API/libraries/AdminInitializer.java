package com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Employee;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Role;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.EmployeeRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initializeAdminUser() {
        Role adminRole = roleRepository.findByName("ADMIN").orElseGet(() -> {
            Role role = new Role();
            role.setName("ADMIN");
            return roleRepository.save(role);
        });

        roleRepository.findByName("EMPLOYEE").orElseGet(() -> {
            Role role = new Role();
            role.setName("EMPLOYEE");
            return roleRepository.save(role);
        });

        if (employeeRepository.findByUsername("admin").isEmpty()) {
            Employee admin = new Employee();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("System Administrator");
            admin.setRole(adminRole);

            employeeRepository.save(admin);
            System.out.println("✅ Admin user created: username=admin / password=admin123");
        } else {
            System.out.println("ℹ️ Admin user already exists.");
        }
    }
}
