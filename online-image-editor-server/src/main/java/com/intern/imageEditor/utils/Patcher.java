package com.intern.imageEditor.utils;

import com.intern.imageEditor.models.User;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

@Component
public class Patcher {
    public static void userPatcher(User existingUser, User imcompleteUser) throws IllegalAccessException {
        // GET THE COMPILED VERSION OF THE CLASS
        Class<?> userClass = User.class;
        Field[] userFields = userClass.getDeclaredFields();

        for (Field field : userFields) {
            // CANT ACCESS IF THE FIELD IS PRIVATE
            field.setAccessible(true);

            // CHECK IF THE VALUE OF THE FIELD IS NOT NULL, IF NOT UPDATE EXISTING INTERN
            Object value = field.get(imcompleteUser);
            if (value != null) {
                field.set(existingUser, value);
            }
            // MAKE THE FIELD PRIVATE AGAIN
            field.setAccessible(false);
        }
    }
}
