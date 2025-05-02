package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUsername(String username);
}
