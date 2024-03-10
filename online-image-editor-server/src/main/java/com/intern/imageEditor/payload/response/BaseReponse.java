package com.intern.imageEditor.payload.response;

public class BaseReponse<T> {
    private T data;
    private boolean success;
    private String message;

    public BaseReponse(T data, boolean success, String message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }

    public BaseReponse(T data, boolean success) {
        this.data = data;
        this.success = success;
    }

    public BaseReponse() {
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
