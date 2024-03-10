package com.intern.imageEditor.services;


import com.intern.imageEditor.utils.FileUtil;
import org.opencv.core.Mat;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class ImageFilterService {
    
    @Autowired
    StorageService storageService;

    public String applyBlackAndWhiteFilter(String filename) throws IOException {
        // Reading the image
        Mat src = Imgcodecs.imread(storageService.load(filename).toString());
        // Creating the empty destination matrix
        Mat dst = new Mat();
        // Converting the image to grey scale
        Imgproc.cvtColor(src, dst, Imgproc.COLOR_RGB2GRAY);
        // Writing the image
        Path modifiedFilePath = storageService.load("modifed-" + filename);
        Imgcodecs.imwrite(modifiedFilePath.toString(), dst);

        byte[] bytes = Files.readAllBytes(modifiedFilePath);
        String mimeType = Files.probeContentType(modifiedFilePath);
        return FileUtil.bytesToBase64(bytes, mimeType);
    }
}
