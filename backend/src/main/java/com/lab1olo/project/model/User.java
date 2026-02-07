package com.lab1olo.project.model;

import com.lab1olo.project.model.Content;
import com.lab1olo.project.model.Session;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50)
    private String firstname;

    @Column(length = 50)
    private String lastname;

    @Column(unique = true, length = 50, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 20)
    private String role;

    @OneToMany(mappedBy = "user")
    private java.util.List<Content> contents;

    @OneToMany(mappedBy = "user")
    private java.util.List<Session> sessions;
}