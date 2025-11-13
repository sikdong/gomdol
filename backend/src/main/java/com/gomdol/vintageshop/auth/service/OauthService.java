package com.gomdol.vintageshop.auth.service;

import com.gomdol.vintageshop.auth.client.OauthApiClientComposite;
import com.gomdol.vintageshop.auth.client.OauthUserProfile;
import com.gomdol.vintageshop.auth.dto.OauthLoginResult;
import com.gomdol.vintageshop.auth.dto.TokenPair;
import com.gomdol.vintageshop.auth.token.JwtTokenProvider;
import com.gomdol.vintageshop.enums.OauthProvider;
import com.gomdol.vintageshop.members.domain.Member;
import com.gomdol.vintageshop.members.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OauthService {

    private final OauthApiClientComposite oauthApiClientComposite;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public OauthLoginResult login(OauthProvider provider, String authorizationCode) {
        OauthUserProfile profile = oauthApiClientComposite.fetchProfile(provider, authorizationCode);
        Member member;
        boolean isNew;
        Optional<Member> existing = memberRepository.findByProviderAndProviderUserId(provider, profile.providerUserId());
        if (existing.isPresent()) {
            member = updateExisting(existing.get(), profile);
            isNew = false;
        } else {
            member = createMember(profile);
            isNew = true;
        }
        String accessToken = jwtTokenProvider.generateAccessToken(member);
        String refreshToken = jwtTokenProvider.generateRefreshToken(member);

        return new OauthLoginResult(new TokenPair(accessToken, refreshToken), isNew, member);
    }

    private Member createMember(OauthUserProfile profile) {
        Member newMember = Member.builder()
                .provider(profile.provider())
                .providerUserId(profile.providerUserId())
                .email(profile.email())
                .nickname(profile.nickname())
                .profileImageUrl(profile.profileImageUrl())
                .build();
        return memberRepository.save(newMember);
    }

    private Member updateExisting(Member member, OauthUserProfile profile) {
        member.updateProfile(profile.nickname(), profile.email(), profile.profileImageUrl());
        return member;
    }
}
