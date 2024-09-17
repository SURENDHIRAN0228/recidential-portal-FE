import { Component, OnInit, inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  authService = inject(AuthService);
  router = inject(Router);

  signinForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log('Sign In Form Submitted', this.signinForm.value);
      this.authService.loginService(this.signinForm.value)
      .subscribe({
        next:(res)=> {
          console.log(res)
          if(res.status==200) {
            
            //localStorage.setItem("jwt", res.jwt);
            this.authService.setLoggedIn(true);
            this.signinForm.reset();
            //alert('Logged in')
            this.router.navigate(['dashboard']);
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
