package com.intern.imageEditor.payload.request;

public class CreateProjectRequest {
    private Long userId;
    private String fileName;
    private String projectName;

    public CreateProjectRequest() {
    }

    public CreateProjectRequest(Long userId, String fileName, String projectName) {
        this.userId = userId;
        this.fileName = fileName;
        this.projectName = projectName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}
