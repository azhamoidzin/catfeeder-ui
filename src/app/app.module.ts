import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthInterceptor } from './auth.interceptor';
import { MainComponentComponent } from './main-component/main-component.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { FeederInstanceComponent } from './feeder-components/feeder-instance/feeder-instance.component';
import { FeederDialogueComponent } from './feeder-components/feeder-dialogue/feeder-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FamilyPageComponent } from './family-page/family-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainComponentComponent,
    ProfileComponentComponent,
    FeederInstanceComponent,
    FeederDialogueComponent,
    FamilyPageComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatInput,
    MatButton,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
