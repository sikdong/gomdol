package com.gomdol.vintageshop.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.Map;

@ConfigurationProperties(prefix = "oauth")
public class OauthProperties {

    private final Map<String, Provider> providers = new HashMap<>();

    public Map<String, Provider> getProviders() {
        return providers;
    }

    public Provider getProvider(String providerKey) {
        return providers.get(providerKey);
    }

    @Getter
    @Setter
    public static class Provider {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
        private String tokenUri;
        private String userInfoUri;

    }
}
