import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})
export class DashboardComponent implements OnInit{
  
  authService = inject(AuthService);
  RequestArray : any[] = [];

  //currentRequestID = "";

  name: string ="";
  email: string = "";
  unitNumber: string = "";
  serviceType: string = "";
  summary: string = "";
  details: string = "";

  constructor() {}


  ngOnInit(): void {
    this.getAllRequestsService();

  }

  

  getAllRequestsService() 
  {
    this.authService.getAllRequestsService()
      .subscribe({
        next:(res)=> {
          console.log("res data: " , res.data);
          if(res.status==200) {
            this.RequestArray = res.data;
          }
          else {
            alert(res.message)
          }
          
        }
      });
  }

  setDelete(data: any) {
    console.log(data._id)
    this.authService.deleteRequestService(data._id)
      .subscribe({
        next:(res)=> {
          if(res.status==201) {
            alert("Request deleted");
            this.getAllRequestsService(); 
          }
          else {
            alert(res.message)
          }
          
        }
      });
    }


  logout(): void {
    this.authService.logout(); // Log out the user and redirect to login page
  }

}
