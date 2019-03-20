import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogList } from '../_models/blogList';

@Injectable({
  providedIn: 'root'
})
export class BlogListService {

private url = 'http://localhost:3000';

constructor(private http: HttpClient) { }

getBlog(lang: string): Observable<BlogList[]> {
  return this.http.get<BlogList[]>(this.url + '/' + lang);
}

getAdmBlog(): Observable<BlogList[]> {
  return this.http.get<BlogList[]>(this.url + '/all');
}

createBlog(blog: BlogList): Observable<BlogList> {
  return this.http.post<BlogList>(this.url + '/all', blog);
}
getBlogById(id: number): Observable<BlogList> {
  return this.http.get<BlogList>(this.url + '/all/' + id);
}
updateBlog(user: BlogList): Observable<BlogList> {
  return this.http.put<BlogList>(this.url + '/all/' + user.id, user);
}

deleteBlog(id: number): Observable<BlogList> {
  return this.http.delete<BlogList>(this.url + '/all/' + id);
}


}
