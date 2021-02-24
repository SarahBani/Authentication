import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { ProfileGuard } from './guards/profile.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
      { path: 'about', component: AboutComponent },
      { path: 'access-denied', component: AccessDeniedComponent },
      { path: 'not-found', component: PageNotFoundComponent },
      { path: '**', redirectTo: 'not-found' }
    ], { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
