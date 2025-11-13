package com.gomdol.vintageshop.auth.dto;

import com.gomdol.vintageshop.members.domain.Member;

public record OauthLoginResult(TokenPair tokenPair, boolean newMember, Member member) {
}
