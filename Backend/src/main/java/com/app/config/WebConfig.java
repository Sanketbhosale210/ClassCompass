package com.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration

public class WebConfig implements WebMvcConfigurer {

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000")
//                .allowedOrigins("http://localhost:8080")// Adjust this to match your frontend URL
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }
////}
 public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // allow CORS for paths matching /api/**
                .allowedOrigins("http://localhost:3000") // allow only this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // allow these HTTP methods
                .allowedHeaders("*") // allow all headers
                .allowCredentials(true); // allow credentials (cookies, etc.)
    }
}