package com.gomdol.vintageshop.auth.controller;

import com.gomdol.vintageshop.auth.config.JwtProperties;
import com.gomdol.vintageshop.auth.dto.OauthLoginRequest;
import com.gomdol.vintageshop.auth.dto.OauthLoginResponse;
import com.gomdol.vintageshop.auth.dto.OauthLoginResult;
import com.gomdol.vintageshop.auth.dto.TokenPair;
import com.gomdol.vintageshop.auth.service.OauthService;
import com.gomdol.vintageshop.enums.OauthProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.Locale;

@RestController
@RequestMapping("/api/auth/oauth")
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;
    private final JwtProperties jwtProperties;

    @PostMapping("/{provider}")
    public ResponseEntity<OauthLoginResponse> login(
            @PathVariable("provider") String provider,
            @Valid @RequestBody OauthLoginRequest request
    ) {
        OauthProvider oauthProvider = resolveProvider(provider);
        OauthLoginResult result = oauthService.login(oauthProvider, request.code());
        TokenPair tokenPair = result.tokenPair();

        ResponseCookie accessCookie = buildCookie("gomdol_access_token", tokenPair.accessToken(), jwtProperties.getAccessTokenExpMinutes());
        ResponseCookie refreshCookie = buildCookie("gomdol_refresh_token", tokenPair.refreshToken(), jwtProperties.getRefreshTokenExpMinutes());

        OauthLoginResponse response = new OauthLoginResponse(
                result.newMember(),
                result.member().getId(),
                result.member().getNickname(),
                result.member().getProfileImageUrl(),
                oauthProvider
        );

        return ResponseEntity.ok()
                .headers(headers -> {
                    headers.add(HttpHeaders.SET_COOKIE, accessCookie.toString());
                    headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());
                })
                .body(response);
    }

    private OauthProvider resolveProvider(String provider) {
        try {
            return OauthProvider.valueOf(provider.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported provider: " + provider);
        }
    }

    private ResponseCookie buildCookie(String name, String value, long expiryMinutes) {
        return ResponseCookie.from(name, value)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofMinutes(expiryMinutes))
                .build();
    }
}
