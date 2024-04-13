package com.intern.imageEditor.controllers;

import com.intern.imageEditor.models.Project;
import com.intern.imageEditor.models.User;
import com.intern.imageEditor.payload.request.CreateProjectRequest;
import com.intern.imageEditor.payload.response.BaseResponse;
import com.intern.imageEditor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("projects")
@CrossOrigin
public class ProjectController {

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<Project>> saveProject(@RequestBody CreateProjectRequest request) {
        User userById = userService.getUserById(request.getUserId());

        List<Project> projectList = userById.getProjectList();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm").withZone(ZoneId.systemDefault());
        String formattedTime = formatter.format(Instant.now());

        String projectName = request.getProjectName() != null ? request.getProjectName() : formattedTime  + "-" + request.getFileName() ;

        Project newProject = new Project();
        newProject.setName(projectName) ;
        newProject.setOriginalImage(request.getFileName());
        newProject.setResultImage("modified-" + request.getFileName());

        projectList.add(newProject);

        userById.setProjectList(projectList);
        userService.createOrUpdateUser(userById);

        return ResponseEntity.ok().body(new BaseResponse<>(newProject, true));
    }
}
