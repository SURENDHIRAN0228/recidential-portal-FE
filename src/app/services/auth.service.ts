import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  private isLoggedInStatus = false;

  constructor(private router: Router) {}

  setLoggedIn(status: boolean): void {
    this.isLoggedInStatus = status;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  // Log out the user
  logout(): void {
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}admin/register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}admin/login`, loginObj);
  }

  maintenanceRequestService(requestObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}user/maintenance-requests`, requestObj);
  }

  deleteRequestService(id: any) {
    return this.http.delete<any>(`${apiUrls.authServiceApi}admin/delete-request/${id}`);
  }

  getAllRequestsService() {
    return this.http.get<any>(`${apiUrls.authServiceApi}user/`);
  }

  /*isLoggedIn() {
    return !!localStorage.getItem("jwt");
  }*/
}
 