import { Component } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { CommunicatorService } from '../communicator.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private communicatorService: CommunicatorService,
  ) {}

  username: string = '';
  password: string = '';

  onLoginClick(): void {
    this.communicatorService.doLogin(this.username, this.password)
    .subscribe((response) => {
        if (response.access_token) {
          this.authService.setToken(response.access_token);
        }
      })
  }
}
