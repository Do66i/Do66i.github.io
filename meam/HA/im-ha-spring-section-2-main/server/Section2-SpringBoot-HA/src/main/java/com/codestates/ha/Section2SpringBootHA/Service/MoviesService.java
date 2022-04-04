package com.codestates.ha.Section2SpringBootHA.Service;

import java.util.List;

import com.codestates.ha.Section2SpringBootHA.Domain.MoviesDTO;

public interface MoviesService {
    public List<MoviesDTO> MoviesAll();
    public MoviesDTO MovieSelectionByID(String id);
}
