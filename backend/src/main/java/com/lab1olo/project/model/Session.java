package com.lab1olo.project.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "expire_at")
    private LocalDateTime expireAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}