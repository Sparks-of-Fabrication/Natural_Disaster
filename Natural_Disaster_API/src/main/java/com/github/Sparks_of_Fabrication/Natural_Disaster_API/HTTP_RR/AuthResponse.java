package com.github.Sparks_of_Fabrication.Natural_Disaster_API.HTTP_RR;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private String token;
}