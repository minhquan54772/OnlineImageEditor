package com.intern.imageEditor.controllers;


import com.intern.imageEditor.models.ImageFilter;
import com.intern.imageEditor.payload.request.ApplyFilterRequest;
import com.intern.imageEditor.payload.response.BaseResponse;
import com.intern.imageEditor.services.ImageFilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/filter")
@CrossOrigin
public class ImageFilterController {
    private final ImageFilterService imageFilterService;

    @Autowired
    public ImageFilterController(ImageFilterService imageFilterService) {
        this.imageFilterService = imageFilterService;
    }


    @PostMapping("/apply")
    public ResponseEntity<BaseResponse<String>> applyImageFilter(@RequestBody ApplyFilterRequest request) throws IOException {
        String result = "";

        switch (request.getFilterName()) {
            case "black-and-white":
                result = this.imageFilterService.applyBlackAndWhiteFilter(request.getFileName());
                break;
            case "sepia":
                result = this.imageFilterService.applySepiaFilter(request.getFileName());
                break;
            case "pencil-sketch":
                result = this.imageFilterService.applyPencilSketchFilter(request.getFileName());
                break;
            case "cold":
//                result = this.imageFilterService.applyColdFilter(request.getFileName());
//                break;
            case "hdr":
                result = this.imageFilterService.applyHDRFilter(request.getFileName());
                break;
            case "invert":
                result = this.imageFilterService.applyInvertFilter(request.getFileName());
                break;


            default:
                return ResponseEntity.status(400).body(new BaseResponse<>(null, false, "Can not find filter name"));
        }

        return ResponseEntity.ok().body(new BaseResponse<String>(result, true));
    }

    @GetMapping("/all")
    public ResponseEntity<BaseResponse<List<ImageFilter>>> getAllFilters() {
        List<ImageFilter> filterList = new ArrayList<>();

        // Required Purchase filters
        filterList.add(new ImageFilter("black-and-white", "B&W", true));
        filterList.add(new ImageFilter("sepia", "Sepia", true));

        // Not Required Purchase filters
        filterList.add(new ImageFilter("pencil-sketch", "Pencil Sketch", false));
        filterList.add(new ImageFilter("hdr", "HDR", false));
        filterList.add(new ImageFilter("invert", "Invert", false));

        return ResponseEntity.ok().body(new BaseResponse<>(filterList, true));
    }


}
