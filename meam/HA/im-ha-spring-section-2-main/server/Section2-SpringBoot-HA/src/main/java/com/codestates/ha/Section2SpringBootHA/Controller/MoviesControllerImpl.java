package com.codestates.ha.Section2SpringBootHA.Controller;

import com.codestates.ha.Section2SpringBootHA.Domain.MoviesDTO;
import com.codestates.ha.Section2SpringBootHA.Service.MoviesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MoviesControllerImpl implements MoviesController{
    private final MoviesService moviesService;

    public MoviesControllerImpl(MoviesService moviesService) {
        this.moviesService = moviesService;
    }

    @Override
    @GetMapping(value = "/movies")
    public List<MoviesDTO> SearchAllMovies() {
        return moviesService.MoviesAll();
    }

    @Override
    @GetMapping(value = "/movies/{id}")
    public MoviesDTO MovieSelection(@PathVariable String id) {
        return moviesService.MovieSelectionByID(id);
    }
}
