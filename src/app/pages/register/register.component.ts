import { Component, OnInit, inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  
  authService = inject(AuthService);
  router = inject(Router);

  signupForm!: FormGroup;


  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }

  

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Sign Up Form Submitted', this.signupForm.value);

      this.authService.registerService(this.signupForm.value)
      .subscribe({
        next:(res)=> {
          console.log(res)
          if(res.status==200) {
            
            localStorage.setItem("jwt", res.jwt);
            this.signupForm.reset();
            this.router.navigate(['login']);
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
