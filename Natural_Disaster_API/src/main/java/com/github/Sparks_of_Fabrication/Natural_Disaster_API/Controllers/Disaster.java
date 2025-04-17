package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.MarkerPosition;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.MetaPosData;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.SeverityDisaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.TypeDisasterEnum;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.UUID;

@Entity
@Getter
public class Disaster {
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private TypeDisasterEnum type;
    @Embedded
    private MarkerPosition position;
    @Embedded
    private MetaPosData metaData;

    private String description;

    private SeverityDisaster severity;

}
