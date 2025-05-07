package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.DisasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DisasterService {

    @Autowired
    private DisasterRepository disasterRepository;

    public List<Disaster> getDisasters(String type, LocalDate startDate, LocalDate endDate, boolean isEmployee) {
        List<Disaster> all = isEmployee
                ? disasterRepository.findAll()  // All disasters for employees
                : disasterRepository.findByApprovedTrue();  // Only approved disasters for non-authenticated users

        return all.stream()
                .filter(d -> type == null || d.getType().equalsIgnoreCase(type))
                .filter(d -> {
                    if (startDate != null && endDate != null) {
                        return !d.getCreationDate().toLocalDate().isBefore(startDate)
                                && !d.getCreationDate().toLocalDate().isAfter(endDate);
                    } else if (startDate != null) {
                        return d.getCreationDate().toLocalDate().isEqual(startDate);
                    }
                    return true;
                })
                .toList();
    }


}
