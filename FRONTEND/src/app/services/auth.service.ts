import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Auth } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:4000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  signUp(user) {
    return this.http.post<Auth>(this.URL + '/signup', user);
  }

  signInUser(user) {
    return this.http
      .post<any>(this.URL + '/signin', user)
      .pipe(catchError(this.errorHandler));
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/tasks']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
