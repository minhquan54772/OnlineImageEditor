package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.Subscription;
import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.response.BaseResponse;
import com.intern.imageEditor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "subscriptions")
public class SubscriptionController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<BaseResponse<User>> registerSubscription(@RequestParam Long userId) {
        User userById = userService.getUserById(userId);

        Instant now = Instant.now();

        List<Subscription> subscriptionList = userById.getSubscriptionList();
        Optional<Subscription> activeSubscription = subscriptionList.stream().filter(subscription -> now.compareTo(subscription.getEndDate()) <= 0).findFirst();

        if (subscriptionList.isEmpty() || activeSubscription.isEmpty()) {
            Subscription subscription = new Subscription();
            subscriptionList.add(subscription);
        } else {
            activeSubscription.get().setEndDate(activeSubscription.get().getEndDate().plus(30, ChronoUnit.DAYS));
        }
        userById.setIsVip(true);
        userById.setSubscriptionList(subscriptionList);

        return ResponseEntity.ok().body(new BaseResponse<>(userService.createOrUpdateUser(userById), true));
    }
}
