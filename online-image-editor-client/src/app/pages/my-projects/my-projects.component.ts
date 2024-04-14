import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { NavigationExtras, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss',
})
export class MyProjectsComponent implements OnInit {
  projects: Array<Project> = new Array();
  currentUser: User = new User();

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private appStateService: AppStateService
  ) {
    const signedInUser = this.userService.getSignedInUser();
    if (signedInUser) {
      this.currentUser = signedInUser;
    }
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.findUserByEmail(this.currentUser.email).subscribe({
      next: (response: BaseResponse<User>) => {
        this.currentUser = response.data;

        this.currentUser.projectList?.forEach((project: Project) => {
          this.getProjectThumbnail(project);
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProjectThumbnail(project: Project) {
    this.projectService.getThumbnail(project.resultImage).subscribe({
      next: (response: BaseResponse<string>) => {
        project.thumbnail = response.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  openProject(project: Project) {
    this.sessionStorageService.setItem('currentFile', project.originalImage);
    this.sessionStorageService.setItem('currentProject', JSON.stringify(project));

    this.router.navigate(['/editor']);
  }
}
