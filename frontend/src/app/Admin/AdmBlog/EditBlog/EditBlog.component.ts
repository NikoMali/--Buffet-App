import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogList } from 'src/app/_models/blogList';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogListService } from 'src/app/_services/blogList.service';
import { first } from 'rxjs/operators';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-EditBlog',
  templateUrl: './EditBlog.component.html',
  styleUrls: ['./EditBlog.component.css']
})
export class EditBlogComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';
  blog: BlogList;
  editBlogForm: FormGroup;




  constructor(
                private formBuilder: FormBuilder,
                private router: Router,
                private blogService: BlogListService,
                private alertify: AlertifyService
                ) { }
  ngOnInit() {
    const blogId = window.localStorage.getItem('editBlogId');
    if (!blogId) {
      this.alertify.warning('invalid Action');
      this.router.navigate(['/admin/blog']);
      return;
    }
    this.editBlogForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      date: ['', Validators.required],
      imageUrl: ['', Validators.required],
      shortDesc: ['', Validators.required],
      langId: ['', Validators.required]
    });
    this.blogService.getBlogById(+blogId)
      .subscribe( data => {
        this.editBlogForm.setValue({
          id: data.Id,
          title: data.Title,
          date: data.CreateDate,
          imageUrl: data.ImgUrl,
          shortDesc: data.ShortDesc,
          langId: data.LangId,
          LongDesc: data.LongDesc,
          OriginalPostId: data.OriginalPostId,
        });
      });
  }
  get f() { return this.editBlogForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.editBlogForm.invalid) {
      return;
  }
    this.loading = true;
    this.blogService.updateBlog(this.editBlogForm.value)
      .pipe(first())
      .subscribe(
        data => {
            this.loading = false;
            this.alertify.success('blog updated successfully.');
            this.router.navigate(['/admin/blog']);
        });
    }
  }


