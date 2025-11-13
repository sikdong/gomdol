package com.gomdol.vintageshop.members.repository;

import com.gomdol.vintageshop.enums.OauthProvider;
import com.gomdol.vintageshop.members.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByProviderAndProviderUserId(OauthProvider provider, String providerUserId);
}
