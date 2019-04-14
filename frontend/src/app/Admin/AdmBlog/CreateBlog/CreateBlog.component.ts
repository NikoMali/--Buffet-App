import { Component, OnInit, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BlogListService } from 'src/app/_services/blogList.service';
import { HttpEventType } from '@angular/common/http';
import { UploadImegeService } from 'src/app/_services/uploadImege.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-CreateBlog',
  templateUrl: './CreateBlog.component.html',
  styleUrls: ['./CreateBlog.component.css']
})
export class CreateBlogComponent implements OnInit {
  public editorContent: string ="";
  public options: Object = {
                              charCounterCount: true,
                              // Set the image upload parameter.
                              imageUploadParam: 'image_param',

                              // Set the image upload URL.
                              imageUploadURL: 'http://localhost:4000/api/Upload/UploadFiles',

                              // Additional upload params.
                              imageUploadParams: {id: 'my_editor'},

                              // Set request type.
                              imageUploadMethod: 'POST',

                              // Set max image size to 5MB.
                              imageMaxSize: 5 * 1024 * 1024,

                              // Allow to upload PNG and JPG.
                              imageAllowedTypes: ['jpeg', 'jpg', 'png'],
};

    createBlogForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    imageUrl: string = "/assets/img/default-image.png";
    fileToUpload: File = null;
    progress: number;
    message: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertify: AlertifyService,
        private blogService: BlogListService,
        private uploadService: UploadImegeService
    ) { }

    ngOnInit() {
        this.createBlogForm = this.formBuilder.group({

            Title: ['', Validators.required],
            CreateDate: ['', Validators.required],
            ImgUrl: ['', Validators.required],
            ShortDesc: ['', Validators.required],
            LongDesc: ['', Validators.required],
            LangId: ['', Validators.required],
            OriginalPostId: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() {
      return this.createBlogForm.controls; }


    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);

        //Show image preview
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
    }

    onSubmit() {
      // tslint:disable-next-line: no-string-literal
      debugger
      this.submitted = true;
      // stop here if form is invalid
      this.createBlogForm.controls['ImgUrl'].patchValue(this.fileToUpload.name);
      if (this.createBlogForm.invalid) {
        return;
      }

      this.loading = true;
      console.log(this.editorContent);
      console.log(this.options);
      this.uploadService.postFile(this.fileToUpload)
      .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
              // this.progress = Math.round(100 * event.loaded / event.total);
              this.progress = Math.round(100 * event.loaded / event.total);
              console.log('upload progress: ' +  Math.round(100 * event.loaded / event.total));
            } else if (event.type === HttpEventType.Response) {
                // this.message = 'Upload success.';
                this.message = 'Upload success.';
                console.log('Upload success.');
              }
            },
            error => { console.log(error)});

            // tslint:disable-next-line: align
              this.blogService.createBlog(this.createBlogForm.value)
              .subscribe( data => {
                  // this.router.navigate(['/admin/blog']);
                  this.alertify.success('SUCCESS Create');
                }, error => { console.log(error)});
                // this.authenticationService.login(this.f.username.value, this.f.password.value)
                //     .pipe(first())
                //     .subscribe(
                  //         data => {
                    //             this.router.navigate(['/admin']);
                    //             this.alertify.success('SUCCESS LOGIN');
                    //         },
                    //         error => {
                      //             this.loading = false;
                      //             this.alertify.error(error);
                      //         });
                    }





                  }
