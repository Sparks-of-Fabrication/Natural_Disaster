package com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries;

import jakarta.persistence.Basic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class MarkerPosition {
    private double latitude;
    private double longitude;
}