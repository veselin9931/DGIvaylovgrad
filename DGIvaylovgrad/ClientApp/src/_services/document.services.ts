import { Injectable } from '@angular/core';
import { HttpEventType, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError, concatMap, map, retry, startWith, tap } from 'rxjs/operators';
import { Document } from '../_models/document';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class DocumentService {

  constructor(
    private http: HttpClient
  ) { }

  document: Document[];
  public documents = [];

  upload(file: File, filleName: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.apiUrl}/api/document/${filleName}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getAll()  {
    return this.http.get(`${environment.apiUrl}/api/document`)
      .pipe(map((data: any[]) => {
        this.documents = data;
        
        this.documents = Object.keys(data).map(function (nameIndex) {
          let items = data[nameIndex];
          return items;
        })
        return true;
      }))
  }

  getById(id: number): Observable<HttpEvent<any>>{
    const req = new HttpRequest("GET", `${environment.apiUrl}/api/document/${id}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteById(id: number): Observable<HttpEvent<any>> {
    const req = new HttpRequest("DELETE", `${environment.apiUrl}/api/document/${id}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteAll(): Observable<HttpEvent<any>> {
    const req = new HttpRequest("DELETE", `${environment.apiUrl}/api/document`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
}
