package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DisasterRepository extends JpaRepository<Disaster, UUID> {
    List<Disaster> findByApprovedFalse();
}
