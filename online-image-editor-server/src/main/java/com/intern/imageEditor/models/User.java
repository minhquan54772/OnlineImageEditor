package com.intern.imageEditor.models;

import jakarta.persistence.*;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.List;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "displayName", nullable = true)
    private String displayName;

    @Column(name = "is_vip", nullable = false, columnDefinition = "boolean default false")
    private boolean isVip = false;

    @OneToMany(targetEntity = Project.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Project> projectList;

    @OneToMany(targetEntity = Subscription.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Subscription> subscriptionList;

    public User() {
    }

    public User(String password, String email) {
        this.password = password;
        this.email = email;
    }

    public User(long id, String password, String email, String displayName, List<Project> projectList, List<Subscription> subscriptionList) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.displayName = displayName;
        this.projectList = projectList;
        this.subscriptionList = subscriptionList;
    }

    public long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = Base64.getEncoder().encodeToString(password.getBytes(StandardCharsets.UTF_8));
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void updateInfo(User newInfo) {
        this.setDisplayName(newInfo.getDisplayName());
        this.setEmail(newInfo.getEmail());
    }

    public List<Project> getProjectList() {
        return projectList;
    }

    public void setProjectList(List<Project> projectList) {
        this.projectList = projectList;
    }

    public List<Subscription> getSubscriptionList() {
        return subscriptionList;
    }

    public void setSubscriptionList(List<Subscription> subscriptionList) {
        this.subscriptionList = subscriptionList;
    }

    public boolean getIsVip() {
        return isVip;
    }

    public void setIsVip(boolean vip) {
        isVip = vip;
    }
}
