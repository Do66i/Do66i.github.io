package com.codestates.ha.Section2SpringBootHA.Repository;

import com.codestates.ha.Section2SpringBootHA.Data.MoviesData;
import com.codestates.ha.Section2SpringBootHA.Domain.MoviesDTO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MoviesRepositoryImpl implements MoviesRepository{
    private final List<MoviesDTO> moviesList = MoviesData.getInstance().MoviesList;

    @Override
    public List<MoviesDTO> FindAll() {
        return moviesList;
    }

    @Override
    public Optional<MoviesDTO> FindByID(String id) {
        return moviesList
                .stream()
                .filter(item -> item.getId().equals(id))
                .findAny();
    }
}
