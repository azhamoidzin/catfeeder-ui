import { Component } from '@angular/core';
import { CommunicatorService } from '../communicator.service';
import { AuthService } from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ActivationDialogComponent} from '../activation-dialog/activation-dialog.component';
import {RegistrationDialogComponent} from '../registration-dialog/registration-dialog.component';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private communicatorService: CommunicatorService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  email: string = '';
  password: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.router.navigate(['login'])
        let dialogRef = this.dialog.open(ActivationDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.communicatorService.setPassword(token, { password: result }).subscribe(result => {
            });
          }
        })
      }
    });

  }

  onLoginClick(): void {
    this.communicatorService.doLogin(this.email, this.password)
    .subscribe((response) => {
        if (response.access_token) {
          this.authService.setToken(response.access_token);
          this.router.navigate(['profile'])
        }
      })
  }

  onRegisterClick() {
    let dialogRef = this.dialog.open(RegistrationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }
}
