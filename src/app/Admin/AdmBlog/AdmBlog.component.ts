import { Component, OnInit } from '@angular/core';
import { BlogListService } from 'src/app/_services/blogList.service';
import { BlogList } from 'src/app/_models/blogList';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-AdmBlog',
  templateUrl: './AdmBlog.component.html',
  styleUrls: ['./AdmBlog.component.scss']
})
export class AdmBlogComponent implements OnInit {

  public blogList = [];
  public errorMsg;
  constructor(private blogListService: BlogListService,
              private router: Router,
              private alertify: AlertifyService
              ) { }

  ngOnInit() {
                this.getBlogList();
              }

  getBlogList() {
    this.blogListService.getAdmBlog()
    .subscribe(
      data => {this.blogList = data; console.log(data); },
      // data => console.log(data),
      error => {this.errorMsg = error; });
    }
    viewBlog(blog: BlogList): void {
      window.localStorage.removeItem('editBlogId');
      window.localStorage.setItem('editUserId', blog.id.toString());
      this.router.navigate(['/admin/edit']);
    }

    editBlog(blog: BlogList): void {
      window.localStorage.removeItem('editBlogId');
      window.localStorage.setItem('editBlogId', blog.id.toString());
      this.router.navigate(['/admin/blog/edit/' + blog.id]);
    }

    deleteBlog(blog: BlogList): void {
     this.alertify.confirm('Are u sure that Delete Blog', () => {
       this.blogListService.deleteBlog(blog.id)
         .subscribe( data => {
           this.blogList = this.blogList.filter(u => u !== blog);
           this.alertify.success('delete success blog');
         });
     } );
    }
}
