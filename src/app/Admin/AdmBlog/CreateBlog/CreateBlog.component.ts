import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BlogListService } from 'src/app/_services/blogList.service';

@Component({
  selector: 'app-CreateBlog',
  templateUrl: './CreateBlog.component.html',
  styleUrls: ['./CreateBlog.component.css']
})
export class CreateBlogComponent implements OnInit {

    createBlogForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertify: AlertifyService,
        private blogService: BlogListService
    ) { }

    ngOnInit() {
        this.createBlogForm = this.formBuilder.group({
            id: [],
            title: ['', Validators.required],
            date: ['', Validators.required],
            imageUrl: ['', Validators.required],
            shortDesc: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.createBlogForm.controls; }

    onSubmit() {
        console.log(this.f);
        this.submitted = true;

        // stop here if form is invalid
        if (this.createBlogForm.invalid) {
            return;
        }

        this.loading = true;
        this.blogService.createBlog(this.createBlogForm.value)
        .subscribe( data => {
          this.router.navigate(['/admin/blog']);
          this.alertify.success('SUCCESS Create');
        });
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
