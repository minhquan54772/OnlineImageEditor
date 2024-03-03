package com.intern.imageEditor;

import com.intern.imageEditor.properties.StorageProperties;
import com.intern.imageEditor.services.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
@EnableWebMvc
public class ImageEditorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImageEditorApplication.class, args);
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return args -> {
//			storageService.deleteAll();
			storageService.init();
		};
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**").allowedOrigins("*").allowedHeaders("*").allowedMethods("GET", "POST");
//				WebMvcConfigurer.super.addCorsMappings(registry);
			}
		};
	}

}
