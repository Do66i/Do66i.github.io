package com.codestates.ha.Section2SpringBootHA.Controller;

import java.util.List;

import com.codestates.ha.Section2SpringBootHA.Domain.MoviesDTO;

public interface MoviesController {
    public List<MoviesDTO> SearchAllMovies();
    public MoviesDTO MovieSelection(String id);
}
