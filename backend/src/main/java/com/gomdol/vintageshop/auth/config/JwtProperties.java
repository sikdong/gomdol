package com.gomdol.vintageshop.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {

    private String issuer;
    private long accessTokenExpMinutes;
    private long refreshTokenExpMinutes;
    private String secret;

}
