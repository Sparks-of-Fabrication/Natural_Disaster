package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<Test, String> {
}
