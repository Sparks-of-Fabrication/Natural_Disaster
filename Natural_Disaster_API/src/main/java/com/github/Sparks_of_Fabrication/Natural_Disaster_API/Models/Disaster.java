package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.MarkerPosition;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.SeverityDisaster;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries.TypeDisasterEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Disaster {
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String type;

    @Embedded
    private MarkerPosition position;

    private String description;

    private String severity;

    private LocalDateTime creationDate;

    private boolean approved = false;

    @Override
    public String toString() {
        return "Disaster{" +
                "id=" + id +
                ", type=" + type +
                ", position=" + position +
                ", description='" + description + '\'' +
                ", severity=" + severity +
                ", approved=" + approved +
                '}';
    }

}
