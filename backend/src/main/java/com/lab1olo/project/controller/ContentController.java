package com.lab1olo.project.controller;

import com.lab1olo.project.repository.ContentRepository;
import com.lab1olo.project.model.Content;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = "*") // Allows your React frontend to connect
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    // 1. Get all content (For your Home/Gallery page)
    @GetMapping("/all")
    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    // 2. Add new content (For your Upload page)
    @PostMapping("/add")
    public Content addContent(@RequestBody Content content) {
        return contentRepository.save(content);
    }

    // 3. Get content by ID (For a specific detail page)
    @GetMapping("/{id}")
    public Content getContentById(@PathVariable int id) {
        return contentRepository.findById(id).orElse(null);
    }
}