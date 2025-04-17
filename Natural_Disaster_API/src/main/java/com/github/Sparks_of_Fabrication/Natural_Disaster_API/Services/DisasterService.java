package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Disaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models.Test;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.DisasterRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Repositories.TestRepository;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.MetaPosData;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DisasterService {
    private final DisasterRepository disasterRepository;


    public DisasterService(DisasterRepository disasterRepository) {
        this.disasterRepository = disasterRepository;
    }

    public List<Disaster> getDisastersByRegion(MetaPosData data) {
        List<Disaster> disasters = disasterRepository;

    }

    public List<Disaster> fetchTests() {

        return disasterRepository.findAll();
    }

    public Pair<Boolean, Disaster> createTest() {
        try {
            Disaster test = disasterRepository.save(new Disaster());

            return Pair.of(true, test);
        }catch (Exception e) {
            return Pair.of(false, new Disaster());
        }
    }
}
