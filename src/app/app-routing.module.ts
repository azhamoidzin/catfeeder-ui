import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FamilyPageComponent } from './family-page/family-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'activate/:token', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'family', component: FamilyPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to profile by default
  { path: '**', redirectTo: '/login' } // Redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
