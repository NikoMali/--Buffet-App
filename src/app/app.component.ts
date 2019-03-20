import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  param = {value: 'world'};
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService
) {
  // this language will be used as a fallback when a translation isn't found in the current language
  translate.setDefaultLang('en');

  // the lang to use, if the lang isn't available, it will use the current loader to get them
  translate.use('en');
 }

ngOnInit() {
  this.router
  .events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => {
      let child = this.activatedRoute.firstChild;
      while (child) {
        if (child.firstChild) {
          child = child.firstChild;
        } else if (child.snapshot.data && child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        } else {
          return null;
        }
      }
      return null;
    })).subscribe( (title: any) => {
      this.titleService.setTitle(title);
    });
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }









}
