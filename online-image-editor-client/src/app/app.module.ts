import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInSignUpComponent } from './components/sign-in-sign-up/sign-in-sign-up.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DownloadDialogComponent } from './components/download-dialog/download-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorComponent } from './pages/editor/editor.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangePasswordPopupComponent } from './components/change-password-popup/change-password-popup.component';
import { ConfirmDeleteAccountComponent } from './components/confirm-delete-account/confirm-delete-account.component';
import { BuyVipPopupComponent } from './components/buy-vip-popup/buy-vip-popup.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    SideMenuComponent,
    SignInSignUpComponent,
    DownloadDialogComponent,
    EditorComponent,
    MyAccountComponent,
    ChangePasswordPopupComponent,
    ConfirmDeleteAccountComponent,
    BuyVipPopupComponent,
    MyProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatTabsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
