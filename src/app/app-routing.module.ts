import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { AboutComponent } from './About/About.component';
import { BlogComponent } from './Blog/Blog.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashBoardComponent } from './Admin/DashBoard/DashBoard.component';
import { SiteComponent } from './Site/Site.component';
import { AdminComponent } from './Admin/Admin.component';
import { AdmSlideComponent } from './Admin/AdmSlide/AdmSlide.component';
import { AdmBlogComponent } from './Admin/AdmBlog/AdmBlog.component';
import { AdmGalleryComponent } from './Admin/AdmGallery/AdmGallery.component';
import { AdmMenuComponent } from './Admin/AdmMenu/AdmMenu.component';
import { AdmFoodComponent } from './Admin/AdmFood/AdmFood.component';
import { CreateBlogComponent } from './Admin/AdmBlog/CreateBlog/CreateBlog.component';
import { EditBlogComponent } from './Admin/AdmBlog/EditBlog/EditBlog.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full', data: {title: 'Home Page'}},
      { path: 'about', component: AboutComponent, data: {title: 'About Page'} },
      { path: 'blog', component: BlogComponent, data: {title: 'Blog Page'} },
      // { path: 'test/:id', component: AboutComponent }
    ]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashBoardComponent },
      { path: 'slide', component: AdmSlideComponent },

      { path: 'blog', component: AdmBlogComponent },
      { path: 'blog/create', component: CreateBlogComponent },
      { path: 'blog/edit/:id', component: EditBlogComponent },
      // { path: 'blog/edit', component: EditBlogComponent },


      { path: 'gallery', component: AdmGalleryComponent },
      { path: 'menu', component: AdmMenuComponent },
      { path: 'food', component: AdmFoodComponent }
    ]
  },
  { path: 'login', component: LoginComponent, data: {title: 'login Page'} },


  // { path: '', component: HomeComponent,  data: {title: 'Home Page'} },
  // { path: 'about', component: AboutComponent, data: {title: 'About Page'} },
  // { path: 'blog', component: BlogComponent, data: {title: 'Blog Page'} },
  // {
  //   path: 'admin',
  //   component: DashBoardComponent,
  //   canActivate: [AuthGuard],
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
