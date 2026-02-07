package com.lab1olo.project.repository;

import com.lab1olo.project.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<Session, UUID> {
}