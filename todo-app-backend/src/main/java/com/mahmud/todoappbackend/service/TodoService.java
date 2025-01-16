package com.mahmud.todoappbackend.service;


import com.mahmud.todoappbackend.model.Todo;
import com.mahmud.todoappbackend.model.User;
import com.mahmud.todoappbackend.model.dto.TodoResponse;
import com.mahmud.todoappbackend.repository.UserRepository;
import com.mahmud.todoappbackend.repository.TodoRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoService(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }


    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found: " + username));
    }

    TodoResponse todoResponseConverter(Todo todo){
        TodoResponse todoResponse = new TodoResponse();
        todoResponse.setId(todo.getId());
        todoResponse.setTitle(todo.getTitle());
        todoResponse.setDescription(todo.getDescription());
        todoResponse.setCompleted(todo.isCompleted());
        return todoResponse;
    }


    public List<TodoResponse> getTodosForCurrentUser() {
        User user = getAuthenticatedUser();
        List<Todo> todos = todoRepository.findByUser(user);
        List<TodoResponse> todoResponses = new ArrayList<>();
        todos.forEach(todo -> todoResponses.add(todoResponseConverter(todo)));
        return todoResponses;
    }


    public TodoResponse addTodo(Todo todo) {
        User user = getAuthenticatedUser();
        todo.setUser(user);
        return todoResponseConverter(todoRepository.save(todo));
    }


    public TodoResponse updateTodo(Long id, Todo updatedTodo) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Todo not found: " + id));

        User user = getAuthenticatedUser();
        if (!existingTodo.getUser().equals(user)) {
            throw new SecurityException("Access denied");
        }

        existingTodo.setTitle(updatedTodo.getTitle());
        existingTodo.setCompleted(updatedTodo.isCompleted());
        existingTodo.setDescription(updatedTodo.getDescription());
        Todo response = todoRepository.save(existingTodo);
        return todoResponseConverter(response);
    }


    public void deleteTodo(Long id) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Todo not found: " + id));

        User user = getAuthenticatedUser();
        if (!existingTodo.getUser().equals(user)) {
            throw new SecurityException("Access denied");
        }

        todoRepository.delete(existingTodo);
    }
}

