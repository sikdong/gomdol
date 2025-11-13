package com.gomdol.vintageshop.auth.controller;

import com.gomdol.vintageshop.auth.dto.AuthUserResponse;
import com.gomdol.vintageshop.auth.token.JwtTokenProvider;
import com.gomdol.vintageshop.members.domain.Member;
import com.gomdol.vintageshop.members.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @GetMapping("/me")
    public AuthUserResponse me(@CookieValue(value = "gomdol_access_token", required = false) String accessToken) {
        if (!StringUtils.hasText(accessToken)) {
            throw unauthorized("Access token is missing");
        }

        Claims claims;
        try {
            claims = jwtTokenProvider.parseClaims(accessToken);
        } catch (JwtException ex) {
            throw unauthorized("Access token is invalid");
        }

        if (!"ACCESS".equals(claims.get("type", String.class))) {
            throw unauthorized("Access token type mismatch");
        }

        Long memberId = parseMemberId(claims.getSubject());
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> unauthorized("Member not found"));

        return new AuthUserResponse(
                member.getId(),
                member.getNickname(),
                member.getProfileImageUrl(),
                member.getProvider()
        );
    }

    private ResponseStatusException unauthorized(String message) {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, message);
    }

    private Long parseMemberId(String subject) {
        try {
            return Long.parseLong(subject);
        } catch (NumberFormatException ex) {
            throw unauthorized("Invalid member id in token");
        }
    }
}
