package com.gomdol.vintageshop.auth.client;

import com.gomdol.vintageshop.enums.OauthProvider;

public interface OauthApiClient {
    boolean supports(OauthProvider provider);

    OauthUserProfile fetchProfile(String authorizationCode);
}
