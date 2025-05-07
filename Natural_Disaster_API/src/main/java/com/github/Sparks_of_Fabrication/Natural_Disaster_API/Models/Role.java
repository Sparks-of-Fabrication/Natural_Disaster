package com.github.Sparks_of_Fabrication.Natural_Disaster_API.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "the field need to be filled")
    @Column(nullable = false, unique = true)
    private String name;
}
