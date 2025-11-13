package com.gomdol.vintageshop.products.domain;

import com.gomdol.vintageshop.common.BaseEntity;
import com.gomdol.vintageshop.enums.Category;
import com.gomdol.vintageshop.images.domain.Image;
import com.gomdol.vintageshop.likes.domain.Like;
import com.gomdol.vintageshop.reviews.domain.Review;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import java.util.List;

@Entity
@Table
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter @Builder
@DynamicInsert
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated
    private Category category;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(name = "view_count", columnDefinition = "bigint default 0")
    private Long viewCount;

    @Basic(fetch = FetchType.LAZY)
    private String description;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Like> likes;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Review> reviews;


    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Image> images;

}
