package com.lab1olo.project.repository;

import com.lab1olo.project.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Built-in methods like findAll() will be used to show category lists
}