package com.github.Sparks_of_Fabrication.Natural_Disaster_API;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class NaturalDisasterApiApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("DB_URL", Objects.requireNonNull(dotenv.get("DB_URL")));
		System.setProperty("DB_USER", Objects.requireNonNull(dotenv.get("DB_USER")));
		System.setProperty("DB_SECRET", Objects.requireNonNull(dotenv.get("DB_SECRET")));
		SpringApplication.run(NaturalDisasterApiApplication.class, args);
	}

}
