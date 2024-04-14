package com.intern.imageEditor.controllers;

import com.intern.imageEditor.services.StorageService;
import com.intern.imageEditor.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.intern.imageEditor.payload.response.BaseResponse;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


@RestController
//@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "Access-Control-Allow-Origin")
@RequestMapping("/file")
@CrossOrigin
public class FileController {
    private final StorageService storageService;

    @Autowired
    public FileController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<String>> handleUploadFile(@RequestPart MultipartFile file) throws IOException {
        storageService.store(file);
        String base64Data = FileUtil.fileToBase64(file);
        return ResponseEntity.ok().body(new BaseResponse<>(base64Data, true));
    }

    @GetMapping("")
    public ResponseEntity<BaseResponse<String>> getFileDateBase64(@RequestParam String fileName) {
        Path imagePath;
        try {
            imagePath = storageService.load(fileName);
            byte[] bytes = Files.readAllBytes(imagePath);
            String mimeType = Files.probeContentType(imagePath);
            String base64 = FileUtil.bytesToBase64(bytes, mimeType);
            return ResponseEntity.ok().body(new BaseResponse<>(base64, true));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new BaseResponse<>(null, false, e.getMessage()));
        }
    }

}
