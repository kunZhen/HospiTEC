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
    email: ['john.due@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]]
  });

  onLogin() {

    if ( this.loginForm.invalid ) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe( success => {
      if (success) {
        this.router.navigate(['/patient']);
      } else {
        console.log('Login failed');
      }
    });

  }

}
