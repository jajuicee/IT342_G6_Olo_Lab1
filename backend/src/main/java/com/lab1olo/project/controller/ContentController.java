package com.lab1olo.project.controller;


import com.lab1olo.project.model.Content;
import com.lab1olo.project.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = "*")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    // Fetch all content for the main feed
    @GetMapping("/all")
    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    // Add new content (linked to a user and category)
    @PostMapping("/add")
    public ResponseEntity<Content> addContent(@RequestBody Content content) {
        Content savedContent = contentRepository.save(content);
        return ResponseEntity.ok(savedContent);
    }

    // Get specific content by ID
    @GetMapping("/{id}")
    public ResponseEntity<Content> getContentById(@PathVariable int id) {
        return contentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete content
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContent(@PathVariable int id) {
        contentRepository.deleteById(id);
        return ResponseEntity.ok("Content deleted successfully");
    }
}