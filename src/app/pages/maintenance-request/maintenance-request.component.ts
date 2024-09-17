import { Component, OnInit, inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.scss']
})
export class MaintenanceRequestComponent implements OnInit{

  authService = inject(AuthService);
  router = inject(Router);

  maintenanceRequestForm!: FormGroup;


  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.maintenanceRequestForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      unitNumber: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      details: ['', [Validators.required]],
    });
    
  }

  

  onSubmit() {
    if (this.maintenanceRequestForm.valid) {
      console.log('Sign Up Form Submitted', this.maintenanceRequestForm.value);

      this.authService.maintenanceRequestService(this.maintenanceRequestForm.value)
      .subscribe({
        next:(res)=> {
          console.log(res)
          if(res.status==200) {
            this.maintenanceRequestForm.reset();
            alert(res.message)
          }
          else {
            console.log(res.message)
          }
          
        },
        error:(err)=> {
          console.log(err);
        }

      })
    }
  }

}
