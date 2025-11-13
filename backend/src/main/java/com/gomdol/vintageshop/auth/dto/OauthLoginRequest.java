package com.gomdol.vintageshop.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record OauthLoginRequest(@NotBlank String code) {
}
