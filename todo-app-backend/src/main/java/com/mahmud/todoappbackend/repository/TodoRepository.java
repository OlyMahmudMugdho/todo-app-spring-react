package com.mahmud.todoappbackend.repository;

import com.mahmud.todoappbackend.model.Todo;
import com.mahmud.todoappbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserUsername(String username);
    List<Todo> findByUser(User user);
}