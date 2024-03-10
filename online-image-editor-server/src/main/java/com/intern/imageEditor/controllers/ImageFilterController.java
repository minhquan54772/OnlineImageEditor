package com.intern.imageEditor.controllers;


import com.intern.imageEditor.payload.request.ApplyFilterRequest;
import com.intern.imageEditor.payload.response.BaseReponse;
import com.intern.imageEditor.services.ImageFilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/filter")
@CrossOrigin
public class ImageFilterController {
    private final  ImageFilterService imageFilterService;

    @Autowired
    public ImageFilterController(ImageFilterService imageFilterService) {
        this.imageFilterService = imageFilterService;
    }


    @PostMapping("/apply")
    public ResponseEntity<BaseReponse<String>> applyImageFilter(@RequestBody ApplyFilterRequest request) throws IOException {
        String result = "";

        switch (request.getFilterName()) {
            case "black-and-white":
//                Apply filter
                result = this.imageFilterService.applyBlackAndWhiteFilter(request.getFileName());
                break;

            default:
                return ResponseEntity.status(400).body(new BaseReponse<>(null, false, "Can not find filter name"));
        }

        return ResponseEntity.ok().body(new BaseReponse<String>(result, true));
    }
}
