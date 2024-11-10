import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FamilyPageComponent } from './family-page/family-page.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'family', component: FamilyPageComponent },
  { path: 'register/:token', component: FamilyPageComponent },
  { path: '', redirectTo: '/profile', pathMatch: 'full' }, // Redirect to profile by default
  { path: '**', redirectTo: '/profile' } // Redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
