package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Severity;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.TypeDisaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.SeverityRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.TypeDisasterRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.TypeDisasterEnum;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.SeverityDisaster;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeverityDisasterService {
    @Autowired
    private SeverityRepository severityRepository;

    public void loadSeverityLevels() {
        for (SeverityDisaster severityEnum : SeverityDisaster.values()) {
            if (!severityRepository.existsByName(severityEnum.toString())) {
                Severity severityEntity = new Severity();
                severityEntity.setName(severityEnum.toString());
                severityRepository.save(severityEntity);
            }
        }
    }
}
