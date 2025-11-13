package com.gomdol.vintageshop.auth.token;

import com.gomdol.vintageshop.auth.config.JwtProperties;
import com.gomdol.vintageshop.members.domain.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final JwtProperties properties;
    private SecretKey secretKey;

    public JwtTokenProvider(JwtProperties properties) {
        this.properties = properties;
    }

    @PostConstruct
    void init() {
        byte[] keySource = decodeSecret(properties.getSecret());
        this.secretKey = Keys.hmacShaKeyFor(keySource);
    }

    private byte[] decodeSecret(String secret) {
        try {
            return Base64.getDecoder().decode(secret);
        } catch (IllegalArgumentException ignore) {
            return secret.getBytes(StandardCharsets.UTF_8);
        }
    }

    public String generateAccessToken(Member member) {
        return generateToken(member, properties.getAccessTokenExpMinutes(), "ACCESS");
    }

    public String generateRefreshToken(Member member) {
        return generateToken(member, properties.getRefreshTokenExpMinutes(), "REFRESH");
    }

    public Claims parseClaims(String token) {
        if (token == null || token.isBlank()) {
            throw new JwtException("Token is empty");
        }

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private String generateToken(Member member, long expMinutes, String tokenType) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(expMinutes, ChronoUnit.MINUTES);

        return Jwts.builder()
                .issuer(properties.getIssuer())
                .subject(String.valueOf(member.getId()))
                .audience().add(member.getProvider().name()).and()
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiresAt))
                .claim("nickname", member.getNickname())
                .claim("provider", member.getProvider().name())
                .claim("type", tokenType)
                .signWith(secretKey)
                .compact();
    }
}
