package com.gomdol.vintageshop.auth.client;

import com.gomdol.vintageshop.enums.OauthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OauthApiClientComposite {

    private final List<OauthApiClient> clients;

    public OauthUserProfile fetchProfile(OauthProvider provider, String authorizationCode) {
        return clients.stream()
                .filter(client -> client.supports(provider))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unsupported provider: " + provider))
                .fetchProfile(authorizationCode);
    }
}
