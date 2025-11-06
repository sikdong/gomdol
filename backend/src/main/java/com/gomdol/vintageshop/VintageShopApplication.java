package com.gomdol.vintageshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class VintageShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(VintageShopApplication.class, args);
    }
}
