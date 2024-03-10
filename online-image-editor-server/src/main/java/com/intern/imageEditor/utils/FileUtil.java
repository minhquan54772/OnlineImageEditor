package com.intern.imageEditor.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

public class FileUtil {
    private static final String BASE64_DATA_TEMPLATE = "data:%s;base64,%s";
    public static String fileToBase64(MultipartFile file) throws IOException {
        byte[] imageBytes = Base64.getEncoder().encode(file.getBytes());
        String imageDataString = new String(imageBytes);
        return String.format(BASE64_DATA_TEMPLATE, file.getContentType(), imageDataString);
    }

    public  static String bytesToBase64(byte[] bytes, String mimeType) {
        byte[] imageBytes = Base64.getEncoder().encode(bytes);
        String imageDataString = new String(imageBytes);
        return String.format(BASE64_DATA_TEMPLATE, mimeType, imageDataString);
    }
}
