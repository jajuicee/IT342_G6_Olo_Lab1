package com.lab1olo.project.controller;

import com.lab1olo.project.model.User;
import com.lab1olo.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allows React (port 3000) to talk to Spring (port 8080)
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        // Encrypt the password before saving to MySQL
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER"); // Default role as per your ER diagram
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            // In a real app, you'd return a Token/Session here
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        // principal.getName() usually returns the email/username
        return ResponseEntity.ok(userRepository.findByEmail(principal.getName()));
    }
}