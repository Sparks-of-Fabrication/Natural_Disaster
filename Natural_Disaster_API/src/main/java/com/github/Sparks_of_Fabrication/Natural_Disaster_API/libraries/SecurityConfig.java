package com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF properly in lambda style
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login", "/api/startup/**").permitAll()  // Allow login & startup endpoints
                        .anyRequest().authenticated()  // All other endpoints require auth
                )
                .httpBasic(AbstractHttpConfigurer::disable); // Optional: disable HTTP Basic auth if using JWT

        return http.build();
    }
}
