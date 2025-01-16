package com.mahmud.todoappbackend.controller;


import com.mahmud.todoappbackend.model.Todo;
import com.mahmud.todoappbackend.model.dto.TodoResponse;
import com.mahmud.todoappbackend.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<TodoResponse>> getTodos() {
        try {
            List<TodoResponse> todoResponses = todoService.getTodosForCurrentUser();
            return ResponseEntity.ok(todoResponses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@RequestBody Todo todo) {
        try {
            TodoResponse todoResponse = todoService.addTodo(todo);
            return ResponseEntity.ok(todoResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        try {
            TodoResponse todoResponse = todoService.updateTodo(id, updatedTodo);
            return ResponseEntity.ok(todoResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

