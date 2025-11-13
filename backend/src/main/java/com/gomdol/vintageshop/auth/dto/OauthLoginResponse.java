package com.gomdol.vintageshop.auth.dto;

import com.gomdol.vintageshop.enums.OauthProvider;

public record OauthLoginResponse(
        boolean newMember,
        Long memberId,
        String nickname,
        String profileImageUrl,
        OauthProvider provider
) {
}
