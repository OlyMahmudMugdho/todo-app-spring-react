package com.mahmud.todoappbackend.model.dto;


public class Error {
    private Boolean ok = false;
    private Boolean error = true;
    private Integer status;
    private String message;

    public Error(String message, Integer status) {
        this.status = null;
        this.message = message;
    }
}
