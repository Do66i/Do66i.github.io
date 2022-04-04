package com.codestates.ha.Section2SpringBootHA.Service;

import com.codestates.ha.Section2SpringBootHA.Domain.MoviesDTO;
import com.codestates.ha.Section2SpringBootHA.Repository.MoviesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoviesServiceImpl implements MoviesService{
    private final MoviesRepository moviesRepository;

    public MoviesServiceImpl(MoviesRepository moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    @Override
    public List<MoviesDTO> MoviesAll() {
        return moviesRepository.FindAll();
    }

    @Override
    public MoviesDTO MovieSelectionByID(String id) {
        return moviesRepository.FindByID(id).get();
    }
}
