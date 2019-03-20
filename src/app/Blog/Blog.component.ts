import { Component, OnInit } from '@angular/core';
import { BlogListService } from '../_services/blogList.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-Blog',
  templateUrl: './Blog.component.html',
  styleUrls: ['./Blog.component.css']
})
export class BlogComponent implements OnInit {
  public blogList = [];
  public errorMsg;
  constructor(private blogListService: BlogListService,
              private translate: TranslateService,
              ) { }

  ngOnInit() {
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
                this.getBlogList();
              }

  getBlogList() {
    console.log(this.translate.currentLang);
    this.blogListService.getBlog(this.translate.currentLang)
    .subscribe(
      data => {this.blogList = data; },
      // data => console.log(data),
      error => {this.errorMsg = error; });
    }
}
