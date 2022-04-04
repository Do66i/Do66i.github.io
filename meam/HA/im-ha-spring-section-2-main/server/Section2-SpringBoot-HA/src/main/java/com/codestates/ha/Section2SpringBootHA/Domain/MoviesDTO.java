package com.codestates.ha.Section2SpringBootHA.Domain;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MoviesDTO {
    private String id;
    private String url;
    private String title;
    private String year;
    private String rating;
    private String runtime;
    private List<String> genres;
    private String summary;
    private String description_full;
    private String small_cover_image;
    private String medium_cover_image; 
    private String large_cover_image;
}
