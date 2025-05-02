package com.github.Sparks_of_Fabrication.Natural_Disaster_API.HTTP_RR;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    @Size(min = 5, max = 20)
    private String username;
    @Size(min = 7)
    private String password;
}