import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(  private authService: AuthService,
                private fb: FormBuilder,
                private router: Router
  ) { }

  public loginForm = this.fb.group({
    email: ['carlos.perez@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]]
  });

  onLogin() {

    if ( this.loginForm.invalid ) {
      return;
    }

    const { email, password } = this.loginForm.value;

    if ( email?.endsWith('@ccss.sa.cr') ) {
      this.authService.logInDoctor(email!, password!).subscribe( success => {
        if (success) {
          this.router.navigate(['/patient']);
        } else {
          console.log('Login failed');
        }
      });
    } else if ( email?.endsWith('@admin.sa.cr')) {
      console.log('ADMINISTRADOR');
    } else {
      this.authService.logInPatient(email!, password!).subscribe( success => {
        if (success) {
          this.router.navigate(['/patient-user']);
        } else {
          console.log('Login failed');
        }
      });
    }

  }

}
