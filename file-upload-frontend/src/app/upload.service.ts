import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  uploadImage(image: any): Observable<any> {
    return this.http.post('http://localhost:3000/upload', image);
  }
  uploadImageS3(image: any): Observable<any> {
    return this.http.post('http://localhost:3000/uploads3', image);
  }
}
