package com.intern.imageEditor.services;


import com.intern.imageEditor.utils.FileUtil;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.photo.Photo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        Path modifiedFilePath = storageService.load("modified-" + filename);
        Imgcodecs.imwrite(modifiedFilePath.toString(), dst);

        byte[] bytes = Files.readAllBytes(modifiedFilePath);
        String mimeType = Files.probeContentType(modifiedFilePath);
        return FileUtil.bytesToBase64(bytes, mimeType);
    }

    public String applySepiaFilter(String filename) throws IOException {

        // Reading the image
        Mat src = Imgcodecs.imread(storageService.load(filename).toString());
        // Creating the empty destination matrix
        Mat dst = new Mat();
        // Create Sepia Mat to apply filter
        Mat sepiaKernel = new Mat(3, 3, CvType.CV_32F);
        sepiaKernel.put(0, 0, 0.272f, 0.534f, 0.131f);
        sepiaKernel.put(1, 0, 0.349f, 0.686f, 0.168f);
        sepiaKernel.put(2, 0, 0.393f, 0.769f, 0.189f);
        Core.transform(src, dst, sepiaKernel);

        // Writing the image
        Path modifiedFilePath = storageService.load("modified-" + filename);
        Imgcodecs.imwrite(modifiedFilePath.toString(), dst);

        byte[] bytes = Files.readAllBytes(modifiedFilePath);
        String mimeType = Files.probeContentType(modifiedFilePath);
        return FileUtil.bytesToBase64(bytes, mimeType);
    }

    public String applyPencilSketchFilter(String filename) throws IOException {
        // Reading the image
        Mat src = Imgcodecs.imread(storageService.load(filename).toString());
        // Creating the empty destination matrix
        Mat dst1 = new Mat();
        Mat dst2 = new Mat();

        Photo.pencilSketch(src, dst1, dst2);

        // Writing the image
        Path modifiedFilePath = storageService.load("modified-" + filename);
        Imgcodecs.imwrite(modifiedFilePath.toString(), dst1);

        byte[] bytes = Files.readAllBytes(modifiedFilePath);
        String mimeType = Files.probeContentType(modifiedFilePath);
        return FileUtil.bytesToBase64(bytes, mimeType);
    }

    public String applyColdFilter(String filename) throws IOException {
        // Reading the image
        Mat src = Imgcodecs.imread(storageService.load(filename).toString());

        double[] increaseTable = new double[256];
        increaseTable[0] = 0;
        increaseTable[64] = 80;
        increaseTable[128] = 160;
        increaseTable[255] = 255;

        // Construct the decrease table
        double[] decreaseTable = new double[256];
        decreaseTable[0] = 0;
        decreaseTable[64] = 45;
        decreaseTable[128] = 95;
        decreaseTable[255] = 255;

        // Split the blue, green, and red channels of the image
        List<Mat> channels = new ArrayList<>();
        Core.split(src, channels);

        // Apply the lookup tables to the channels
        Core.LUT(channels.get(2), new MatOfDouble(decreaseTable), channels.get(2));
        Core.LUT(channels.get(0), new MatOfDouble(increaseTable), channels.get(0));

        // Merge the channels
        Mat dst = new Mat();
        Core.merge(channels, dst);

        // Writing the image
        Path modifiedFilePath = storageService.load("modified-" + filename);
        Imgcodecs.imwrite(modifiedFilePath.toString(), dst);

        byte[] bytes = Files.readAllBytes(modifiedFilePath);
        String mimeType = Files.probeContentType(modifiedFilePath);
        return FileUtil.bytesToBase64(bytes, mimeType);
    }


    public String applyHDRFilter(String filename) throws IOException {
        // Reading the image
        Mat src = Imgcodecs.imread(storageService.load(filename).toString());
        // Creating the empty destination matrix
        Mat dst = new Mat();

        Photo.detailEnhance(src, dst);

        // Writing the image
        Path modifiedFilePath = storageService.load("modified-" + filename);
        Imgcodecs.imwrite(modifiedFilePath.toString(), dst);

        byte[] bytes = Files.readAllBytes(modifiedFilePath);
        String mimeType = Files.probeContentType(modifiedFilePath);
        return FileUtil.bytesToBase64(bytes, mimeType);
    }
    public String applyInvertFilter(String filename) throws IOException {
        // Reading the image
        Mat src = Imgcodecs.imread(storageService.load(filename).toString());
        // Creating the empty destination matrix
        Mat dst = new Mat();

        Core.bitwise_not(src, dst);

        // Writing the image
        Path modifiedFilePath = storageService.load("modified-" + filename);
        Imgcodecs.imwrite(modifiedFilePath.toString(), dst);

        byte[] bytes = Files.readAllBytes(modifiedFilePath);
        String mimeType = Files.probeContentType(modifiedFilePath);
        return FileUtil.bytesToBase64(bytes, mimeType);
    }

}
