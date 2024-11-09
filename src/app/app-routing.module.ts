import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { FamilyPageComponent } from './family-page/family-page.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponentComponent },
  { path: 'family', component: FamilyPageComponent },
  { path: '', redirectTo: '/profile', pathMatch: 'full' }, // Redirect to profile by default
  { path: '**', redirectTo: '/profile' } // Redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
