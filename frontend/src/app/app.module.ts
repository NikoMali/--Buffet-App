import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_Layouts/Header/Header.component';
import { ShowerCaseComponent } from './Home/ShowerCase/ShowerCase.component';
import { ReviewSectionComponent } from './Home/ReviewSection/ReviewSection.component';
import { AboutUsSectionComponent } from './Home/AboutUsSection/AboutUsSection.component';
import { AdsSectionComponent } from './Home/AdsSection/AdsSection.component';
import { OurMenuSectionComponent } from './Home/OurMenuSection/OurMenuSection.component';
import { FooterComponent } from './_Layouts/Footer/Footer.component';
import { WrapperTopComponent } from './_Layouts/Wrapper/WrapperTop/WrapperTop.component';
import { WrapperBottomComponent } from './_Layouts/Wrapper/WrapperBottom/WrapperBottom.component';
import { HomeComponent } from './Home/Home.component';
import { AboutComponent } from './About/About.component';
import { BlogComponent } from './Blog/Blog.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { BlogListService } from './_services/blogList.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DashBoardComponent } from './Admin/DashBoard/DashBoard.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
// import { fakeBackendProvider } from './_helpers/fake-backend';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { SiteComponent } from './Site/Site.component';
import { AdminComponent } from './Admin/Admin.component';
import { AdminHeaderComponent } from './_Layouts/AdminHeader/AdminHeader.component';
import { AdmBlogComponent } from './Admin/AdmBlog/AdmBlog.component';
import { AdmFoodComponent } from './Admin/AdmFood/AdmFood.component';
import { AdmGalleryComponent } from './Admin/AdmGallery/AdmGallery.component';
import { AdmMenuComponent } from './Admin/AdmMenu/AdmMenu.component';
import { AdmSlideComponent } from './Admin/AdmSlide/AdmSlide.component';
import { CreateBlogComponent } from './Admin/AdmBlog/CreateBlog/CreateBlog.component';
import { EditBlogComponent } from './Admin/AdmBlog/EditBlog/EditBlog.component';
import { UploadImegeService } from './_services/uploadImege.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './_Layouts/modal-content/modal-content.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http);
}


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      ShowerCaseComponent,
      ReviewSectionComponent,
      AboutUsSectionComponent,
      AdsSectionComponent,
      OurMenuSectionComponent,
      FooterComponent,
      WrapperTopComponent,
      WrapperBottomComponent,
      HomeComponent,
      AboutComponent,
      BlogComponent,
      DashBoardComponent,
      LoginComponent,
      SiteComponent,
      AdminComponent,
      AdminHeaderComponent,
      AdmBlogComponent,
      AdmFoodComponent,
      AdmGalleryComponent,
      AdmMenuComponent,
      AdmSlideComponent,
      CreateBlogComponent,
      EditBlogComponent,
      ModalContentComponent
   ],
   imports: [
      BrowserModule,
      TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
      }),
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FroalaEditorModule.forRoot(),
      FroalaViewModule.forRoot(),
      TabsModule.forRoot(),
      ModalModule.forRoot()
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      // provider used to create fake backend
      // fakeBackendProvider,
      AuthenticationService,
      BlogListService,
      AuthGuard,
      AlertifyService,
      UploadImegeService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [ModalContentComponent]
})
export class AppModule { }
