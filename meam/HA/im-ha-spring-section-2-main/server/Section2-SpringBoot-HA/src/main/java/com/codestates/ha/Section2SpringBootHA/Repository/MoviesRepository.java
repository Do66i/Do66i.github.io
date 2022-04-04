package com.codestates.ha.Section2SpringBootHA.Repository;

import com.codestates.ha.Section2SpringBootHA.Domain.MoviesDTO;

import java.util.List;
import java.util.Optional;

public interface MoviesRepository {
    public List<MoviesDTO> FindAll();
    public Optional<MoviesDTO> FindByID(String id);
}
