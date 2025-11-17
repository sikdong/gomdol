package com.gomdol.vintageshop.auth.client.google;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gomdol.vintageshop.auth.client.OauthApiClient;
import com.gomdol.vintageshop.auth.client.OauthUserProfile;
import com.gomdol.vintageshop.auth.config.OauthProperties;
import com.gomdol.vintageshop.enums.OauthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.StringJoiner;

@Component
@RequiredArgsConstructor
public class GoogleOauthClient implements OauthApiClient {

    private static final String PROVIDER_KEY = "google";

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final OauthProperties oauthProperties;

    @Override
    public boolean supports(OauthProvider provider) {
        return OauthProvider.GOOGLE == provider;
    }

    @Override
    public OauthUserProfile fetchProfile(String authorizationCode) {
        OauthProperties.Provider providerConfig = getProviderConfig();
        String accessToken = requestAccessToken(providerConfig, authorizationCode);
        JsonNode userInfo = requestUserInfo(providerConfig, accessToken);

        String providerUserId = userInfo.path("sub").asText();
        String email = userInfo.path("email").asText(null);
        String nickname = userInfo.path("name").asText(null);
        if (nickname == null || nickname.isBlank()) {
            nickname = userInfo.path("given_name").asText(null);
        }
        String profileImage = userInfo.path("picture").asText(null);

        return new OauthUserProfile(OauthProvider.GOOGLE, providerUserId, email, nickname, profileImage);
    }

    private OauthProperties.Provider getProviderConfig() {
        OauthProperties.Provider provider = oauthProperties.getProvider(PROVIDER_KEY);
        if (provider == null) {
            throw new IllegalStateException("Google OAuth provider is not configured");
        }
        return provider;
    }

    private String requestAccessToken(OauthProperties.Provider providerConfig, String authorizationCode) {
        Map<String, String> params = new LinkedHashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("code", authorizationCode);
        params.put("client_id", providerConfig.getClientId());
        params.put("redirect_uri", providerConfig.getRedirectUri());
        if (providerConfig.getClientSecret() != null && !providerConfig.getClientSecret().isBlank()) {
            params.put("client_secret", providerConfig.getClientSecret());
        }

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(providerConfig.getTokenUri()))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(formEncodedBody(params)))
                .build();

        JsonNode response = execute(request);
        String accessToken = response.path("access_token").asText();
        if (accessToken == null || accessToken.isBlank()) {
            throw new IllegalStateException("Failed to retrieve Google access token");
        }
        return accessToken;
    }

    private JsonNode requestUserInfo(OauthProperties.Provider providerConfig, String accessToken) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(providerConfig.getUserInfoUri()))
                .header("Authorization", "Bearer " + accessToken)
                .GET()
                .build();

        return execute(request);
    }

    private JsonNode execute(HttpRequest request) {
        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 400) {
                throw new IllegalStateException("OAuth request failed: " + response.body());
            }
            return objectMapper.readTree(response.body());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("OAuth request interrupted", e);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to parse OAuth response", e);
        }
    }

    private String formEncodedBody(Map<String, String> params) {
        StringJoiner joiner = new StringJoiner("&");
        params.forEach((key, value) -> {
            if (value == null) {
                return;
            }
            joiner.add(URLEncoder.encode(key, StandardCharsets.UTF_8) + "=" +
                    URLEncoder.encode(value, StandardCharsets.UTF_8));
        });
        return joiner.toString();
    }
}
