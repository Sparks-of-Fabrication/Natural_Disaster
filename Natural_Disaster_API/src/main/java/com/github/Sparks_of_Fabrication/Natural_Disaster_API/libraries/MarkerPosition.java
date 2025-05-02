package com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries;

import jakarta.persistence.Basic;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MarkerPosition {
    private double latitude;
    private double longitude;

    @Override
    public String toString() {
        return "MarkerPosition{" +
                "latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }

}
