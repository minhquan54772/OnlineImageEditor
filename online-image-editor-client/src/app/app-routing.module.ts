import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: EditorComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'my-projects', component: MyProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
