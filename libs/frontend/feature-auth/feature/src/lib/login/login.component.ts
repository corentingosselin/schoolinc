import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from '@schoolinc/frontend/feature-auth/data-access';


@Component({
  selector: 'schoolinc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private toast: HotToastService, private loginService: LoginService) {}
  readonly loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  login() {
    if (this.loginForm.valid) {
      const login = this.loginService.login(this.loginForm.value.username, this.loginForm.value.password);
      login.subscribe(
        (response) => {
          this.toast.success('Login successful ');
          const token = response?.token;
          const userId = response?.user.id;
          if(!token || !userId) {
            this.toast.error('Login failed ');
            return;
          }
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);

          this.router.navigate(['/']);
        }, error => {
          this.toast.error('Login failed ', error);
        });
    }
  }
}
