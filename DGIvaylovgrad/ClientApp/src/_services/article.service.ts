import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root' 
})

export class ArticleService {
  public articles = [];
  constructor(private http: HttpClient) { }

  createArticle(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.apiUrl}/api/article`, data, { headers, responseType: 'text' })
      .pipe(
        tap(data => console.log('createdArticle: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAll()  {
    return this.http.get(`${environment.apiUrl}/api/article`)
      .pipe(map((data: any[]) => {
        this.articles = data;
        return true;
      }))
  }

  deleteArticle(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/article/${id}`)
      .pipe( 
        tap(data => console.log('deleted article: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
}
}
