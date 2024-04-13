package com.intern.imageEditor.services;

import com.intern.imageEditor.models.Project;
import com.intern.imageEditor.models.Subscription;
import com.intern.imageEditor.models.User;
import com.intern.imageEditor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public User createOrUpdateUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            userRepository.delete(user);
        }
    }

    public List<Subscription> getAllUserSubscriptionsById(Long id) throws Exception {
        User userById = getUserById(id);
        if (userById == null) {
            throw new Exception("User not found");
        } else {
            return userById.getSubscriptionList();
        }
    }

    public List<Project> getAllUserProjects(Long id) throws Exception {
        User userById = getUserById(id);
        if (userById == null) {
            throw new Exception("User not found");
        } else {
            return userById.getProjectList();
        }
    }
}
