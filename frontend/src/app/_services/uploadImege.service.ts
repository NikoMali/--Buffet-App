import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadImegeService {

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File) {
    const endpoint = 'http://localhost:4000/api/Upload';
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData, {reportProgress: true, observe: 'events'});
  }

}
