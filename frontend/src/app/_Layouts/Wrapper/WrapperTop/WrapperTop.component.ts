import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HomeComponent } from 'src/app/Home/Home.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-WrapperTop',
  templateUrl: './WrapperTop.component.html',
  styleUrls: ['./WrapperTop.component.css']
})
export class WrapperTopComponent implements OnInit {

  constructor(  private translate: TranslateService,
                private route: ActivatedRoute,
                private router: Router,
      ) { }


  ngOnInit() {
  }
  useLanguage(language: string) {
    this.translate.use(language);
    const url = this.router.url.substring(1);
    setTimeout(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([url]));
    }, 1200);
    console.log(this.router.url.substring(1));
  }
}
