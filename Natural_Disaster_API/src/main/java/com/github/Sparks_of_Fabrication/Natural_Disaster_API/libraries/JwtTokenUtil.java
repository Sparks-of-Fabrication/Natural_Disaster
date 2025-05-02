package com.github.Sparks_of_Fabrication.Natural_Disaster_API.libraries;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenUtil {

    private SecretKey secretKey;  // We will use SecretKey directly
    private long expirationTime = 86400000L;  // Token expiration time in milliseconds (e.g., 1 day)

    // Constructor to initialize secretKey using KeyGenerator
    public JwtTokenUtil() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA512");  // Algorithm for signing
            keyGenerator.init(256);  // Key size (256 bits in this case)
            this.secretKey = keyGenerator.generateKey();  // Generate the secret key
        } catch (Exception e) {
            throw new RuntimeException("Error initializing JWT key", e);
        }
    }

    // Generate JWT token for the user with role included
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)  // Add the role as a custom claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS512, secretKey)  // Use the secret key for signing
                .compact();
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);  // Validate token with secret key
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extract username from the token
    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // Extract role from the token
    public String extractRole(String token) {
        return (String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("role");
    }
}
