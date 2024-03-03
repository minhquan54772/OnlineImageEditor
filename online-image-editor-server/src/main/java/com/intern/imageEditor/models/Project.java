package com.intern.imageEditor.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Project")
public class Project {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "original_image")
    private String originalImage;

    @Column(name = "result_image")
    private String resultImage;

    public Project() {
    }

    public Project(long id, String name, String originalImage, String resultImage) {
        this.id = id;
        this.name = name;
        this.originalImage = originalImage;
        this.resultImage = resultImage;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOriginalImage() {
        return originalImage;
    }

    public void setOriginalImage(String originalImage) {
        this.originalImage = originalImage;
    }

    public String getResultImage() {
        return resultImage;
    }

    public void setResultImage(String resultImage) {
        this.resultImage = resultImage;
    }
}
