package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.TypeDisaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.TypeDisasterEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TypeDisasterRepository extends JpaRepository<TypeDisaster, UUID> {
    boolean existsByName(TypeDisasterEnum name);
    TypeDisaster findByName(String name);
}
