package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DisasterRepository extends JpaRepository<Disaster, UUID> {
}