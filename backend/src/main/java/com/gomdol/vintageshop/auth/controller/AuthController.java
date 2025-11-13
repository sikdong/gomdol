package com.gomdol.vintageshop.auth.controller;

import com.gomdol.vintageshop.auth.dto.AuthUserResponse;
import com.gomdol.vintageshop.auth.token.JwtTokenProvider;
import com.gomdol.vintageshop.members.domain.Member;
import com.gomdol.vintageshop.members.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private static final String ACCESS_COOKIE_NAME = "gomdol_access_token";
    private static final String REFRESH_COOKIE_NAME = "gomdol_refresh_token";

    @GetMapping("/me")
    public AuthUserResponse me(@CookieValue(value = ACCESS_COOKIE_NAME, required = false) String accessToken) {
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

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie expiredAccess = buildExpiredCookie(ACCESS_COOKIE_NAME);
        ResponseCookie expiredRefresh = buildExpiredCookie(REFRESH_COOKIE_NAME);

        return ResponseEntity.noContent()
                .headers(headers -> {
                    headers.add(HttpHeaders.SET_COOKIE, expiredAccess.toString());
                    headers.add(HttpHeaders.SET_COOKIE, expiredRefresh.toString());
                })
                .build();
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

    private ResponseCookie buildExpiredCookie(String name) {
        return ResponseCookie.from(name, "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ZERO)
                .build();
    }
}
