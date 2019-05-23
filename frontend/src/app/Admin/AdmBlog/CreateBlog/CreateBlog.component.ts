import { Component, OnInit, EventEmitter, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BlogListService } from 'src/app/_services/blogList.service';
import { HttpEventType } from '@angular/common/http';
import { UploadImegeService } from 'src/app/_services/uploadImege.service';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from 'src/app/_Layouts/modal-content/modal-content.component';
@Component({
  selector: 'app-CreateBlog',
  templateUrl: './CreateBlog.component.html',
  styleUrls: ['./CreateBlog.component.scss']
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

                              imageManagerDeleteMethod: 'DELETE',

                              //imageManagerDeleteParams: {name: 'my_editor'},

                              imageManagerDeleteURL: 'http://localhost:4000/api/Upload/DeleteImages',

                              imageManagerLoadParams: {id: 'my_editor'},
                              imageManagerLoadURL: 'http://localhost:4000/api/Upload/LoadImages'
};
    createBlogForm: FormGroup;
    selectLang: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    imageUrl: string = "/assets/img/default-image.png";
    fileToUpload: File = null;
    progress: number;
    message: string;

    tabs: any[] = [
      { langId: 2, title: 'Georgian' },
      { langId: 3, title: 'English' }
    ];

    bsModalRef: BsModalRef;
    modalRef: BsModalRef;
    constructor(
        private formBuilder: FormBuilder,
        private modalService: BsModalService,
        private route: ActivatedRoute,
        private router: Router,
        private alertify: AlertifyService,
        private blogService: BlogListService,
        private uploadService: UploadImegeService
    ) { }

    ngOnInit() {
        this.createBlogForm = this.formBuilder.group({

            // Title: ['', Validators.required],
            // CreateDate: ['', Validators.required],
            // ImgUrl: ['', Validators.required],
            // ShortDesc: ['', Validators.required],
            // LongDesc: ['', Validators.required],
            // LangId: ['', Validators.required],
            // OriginalPostId: ['', Validators.required],
            items: this.formBuilder.array([ this.createItem() ])
        });
        this.selectLang = this.formBuilder.group({
          lang: [''],
      });
        // setTimeout(() => {
        //   var el = document.getElementById('imageRemove-1');
        //   if(el){
        //     console.log( el.addEventListener('click', this.displayDate));
        //   }
        //   console.log(el);
        // }, 1200);
        this.addItem(this.tabs.length);
      console.log( this.createBlogForm.get('items')['controls']);

    }

    displayDate() {

      return console.log('work');
    }

    modalOpen() {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";

      console.log(modal);

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

    }
    modalClose() {
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      var modal = document.getElementById("myModal");

      modal.style.display = "none";

      console.log(modal);
    }
    createItem(): FormGroup {
      return this.formBuilder.group({
        Title: ['', Validators.required],
        CreateDate: ['', Validators.required],
        ImgUrl: ['', Validators.required],
        ShortDesc: ['', Validators.required],
        LongDesc: ['', Validators.required],
        LangId: ['', Validators.required],
        OriginalPostId: ['', Validators.required],
      });
    }
    addItem(count: number = 1): void {
      let items = this.createBlogForm.get('items') as FormArray;
      if (count > 1) {
        for (let index = 0; index < count - 1; index++) {
          items.push(this.createItem());
        }
      }
      else {
          items.push(this.createItem());
      }
    }

    addNewTab(): void {
      console.log(this.selectLang.controls.lang.value)
      const newTabIndex = this.tabs.length + 1;
      this.tabs.push({
        title: this.selectLang.controls.lang.value,
        langId: `Dynamic content ${newTabIndex}`,
        removable: true
      });
      this.addItem(1);
      this.modalClose()
      console.log( this.createBlogForm.get('items')['controls']);

    }

    removeTabHandler(tab: any): void {
      this.tabs.splice(this.tabs.indexOf(tab), 1);
      this.createBlogForm.get('items')['controls'].splice(this.tabs.indexOf(tab), 1);
      this.createBlogForm.get('items')['value'].splice(this.tabs.indexOf(tab), 1);
      this.createBlogForm.updateValueAndValidity();
      console.log( this.createBlogForm.get('items'));


      console.log('Remove Tab handler');
    }
    // convenience getter for easy access to form fields
    get f() {
      return this.createBlogForm['controls']['items']['controls']; }


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

      this.submitted = true;
      // stop here if form is invalid
      //this.createBlogForm.controls['ImgUrl'].patchValue(this.fileToUpload.name);
      console.log(this.createBlogForm);
      if (this.createBlogForm.controls.items.invalid) {
        return;
      }

      this.loading = true;
      console.log(this.editorContent);
      console.log(this.options);
      // this.uploadService.postFile(this.fileToUpload)
      // .subscribe(event => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //         // this.progress = Math.round(100 * event.loaded / event.total);
      //         this.progress = Math.round(100 * event.loaded / event.total);
      //         console.log('upload progress: ' +  Math.round(100 * event.loaded / event.total));
      //       } else if (event.type === HttpEventType.Response) {
      //           // this.message = 'Upload success.';
      //           this.message = 'Upload success.';
      //           console.log('Upload success.');
      //         }
      //       },
      //       error => { console.log(error)});

      //       // tslint:disable-next-line: align
      //         this.blogService.createBlog(this.createBlogForm.value)
      //         .subscribe( data => {
      //             // this.router.navigate(['/admin/blog']);
      //             this.alertify.success('SUCCESS Create');
      //           }, error => { console.log(error)});
      //           // this.authenticationService.login(this.f.username.value, this.f.password.value)
      //           //     .pipe(first())
      //           //     .subscribe(
      //             //         data => {
      //               //             this.router.navigate(['/admin']);
      //               //             this.alertify.success('SUCCESS LOGIN');
      //               //         },
      //               //         error => {
      //                 //             this.loading = false;
      //                 //             this.alertify.error(error);
      //                 //         });
                    }





                  }
