package com.gomdol.vintageshop.auth.client;

import com.gomdol.vintageshop.enums.OauthProvider;

public record OauthUserProfile(
        OauthProvider provider,
        String providerUserId,
        String email,
        String nickname,
        String profileImageUrl
) {
}
