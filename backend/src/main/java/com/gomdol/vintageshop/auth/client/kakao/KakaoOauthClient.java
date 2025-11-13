package com.gomdol.vintageshop.auth.client.kakao;

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
public class KakaoOauthClient implements OauthApiClient {

    private static final String PROVIDER_KEY = "kakao";

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final OauthProperties oauthProperties;

    @Override
    public boolean supports(OauthProvider provider) {
        return OauthProvider.KAKAO == provider;
    }

    @Override
    public OauthUserProfile fetchProfile(String authorizationCode) {
        OauthProperties.Provider providerConfig = getProviderConfig();
        String accessToken = requestAccessToken(providerConfig, authorizationCode);
        JsonNode userInfo = requestUserInfo(providerConfig, accessToken);

        String providerUserId = userInfo.path("id").asText();
        JsonNode account = userInfo.path("kakao_account");
        String email = account.path("email").asText(null);
        JsonNode profileNode = account.path("profile");
        String nickname = profileNode.path("nickname").asText(null);
        String profileImage = profileNode.path("profile_image_url").asText(null);

        return new OauthUserProfile(OauthProvider.KAKAO, providerUserId, email, nickname, profileImage);
    }

    private OauthProperties.Provider getProviderConfig() {
        OauthProperties.Provider provider = oauthProperties.getProvider(PROVIDER_KEY);
        if (provider == null) {
            throw new IllegalStateException("Kakao OAuth provider is not configured");
        }
        return provider;
    }

    private String requestAccessToken(OauthProperties.Provider providerConfig, String authorizationCode) {
        Map<String, String> params = new LinkedHashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("client_id", providerConfig.getClientId());
        params.put("redirect_uri", providerConfig.getRedirectUri());
        params.put("code", authorizationCode);
        if (providerConfig.getClientSecret() != null && !providerConfig.getClientSecret().isBlank()) {
            params.put("client_secret", providerConfig.getClientSecret());
        }

        String body = formEncodedBody(params);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(providerConfig.getTokenUri()))
                .header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        JsonNode response = execute(request);
        String accessToken = response.path("access_token").asText();
        if (accessToken == null || accessToken.isBlank()) {
            throw new IllegalStateException("Failed to retrieve Kakao access token");
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
