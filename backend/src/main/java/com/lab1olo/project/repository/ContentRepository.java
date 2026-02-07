package com.lab1olo.project.repository;

import com.lab1olo.project.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Integer> {

    List<Content> findByUserId(int userId);


    List<Content> findByCategoryId(int categoryId);
}