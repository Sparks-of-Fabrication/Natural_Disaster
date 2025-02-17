package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Test {
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
}
