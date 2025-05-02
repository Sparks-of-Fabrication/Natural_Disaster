package com.github.Sparks_of_Fabrication.Natural_Disaster_API;

import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Controllers.StartUpController;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.github.Sparks_of_Fabrication.Natural_Disaster_API.Services.TypeDisasterService;

import java.util.Objects;

@SpringBootApplication
public class NaturalDisasterApiApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.setProperty("DB_URL", Objects.requireNonNull(dotenv.get("DB_URL")));
		System.setProperty("DB_USER", Objects.requireNonNull(dotenv.get("DB_USER")));
		System.setProperty("DB_SECRET", Objects.requireNonNull(dotenv.get("DB_SECRET")));
		System.out.println("Disaster");
		var context = SpringApplication.run(NaturalDisasterApiApplication.class, args);

		StartUpController startUpController = context.getBean(StartUpController.class);
		System.out.println(startUpController.saveDisasterTypes());
		System.out.println(startUpController.saveSeverity());
	}

}
