package com.intern.imageEditor.controllers;

import com.intern.imageEditor.services.StorageService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<String> handleUploadFile(@RequestPart MultipartFile file) {
        storageService.store(file);
        return ResponseEntity.ok().build();
    }
}
