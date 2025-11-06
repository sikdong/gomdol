package com.gomdol.vintageshop.enums;

public enum Category {
    TOP("상의"),
    BOTTOM("하의"),
    OUTER("아우터"),
    ACCESSORY("악세서리"),
    SHOES("신발"),
    CAP("모자");

    private final String name;

    Category(String name){
        this.name = name;
    }

    public static Category findByName(String name){
        for(Category category : Category.values()){
            if(category.name.equals(name)){
                return category;
            }
        }
        throw new IllegalArgumentException("not matched");
    }
}
