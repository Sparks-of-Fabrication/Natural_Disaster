package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.TypeDisaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.TypeDisasterRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.TypeDisasterEnum;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TypeDisasterService {

    @Autowired
    private TypeDisasterRepository typeDisasterRepository;

    private List<TypeDisaster> disasterTypesCache = new ArrayList<>();

    public List<TypeDisaster> getAllDisasterTypes() {
        // If the cache is empty, load disaster types from DB
        if (disasterTypesCache.isEmpty()) {
            disasterTypesCache = typeDisasterRepository.findAll();
        }
        return disasterTypesCache;
    }

    public TypeDisaster getDisasterTypeByName(String name) {
        // Search for the disaster type by name in the list
        return disasterTypesCache.stream()
                .filter(disasterType -> disasterType.getName().toString().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null); // Return null if not found
    }

    // Save disaster types into the database
    public void saveDisasterTypes() {
        // Iterate through enum values
        for (TypeDisasterEnum disasterEnum : TypeDisasterEnum.values()) {
            // Check if disaster type already exists in the database
            if (!typeDisasterRepository.existsByName(disasterEnum)) {
                // Save each disaster type if it doesn't exist
                TypeDisaster disasterType = new TypeDisaster();
                disasterType.setName(disasterEnum);
                typeDisasterRepository.save(disasterType);
            }
        }
    }
}
