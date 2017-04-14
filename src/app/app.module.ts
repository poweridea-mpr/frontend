import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MdCheckboxModule, MdButtonModule,
         MdToolbarModule, MdInputModule, MdListModule,
         MdCardModule, MdCoreModule, MdTooltipModule,
         MdTabsModule, MdIconModule } from '@angular/material';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';
import { RisksComponent } from './platform/risks/risks.component';
import { ProjectsComponent } from './platform/projects/projects.component';
import { MapComponent } from './platform/map/map.component';

import { AuthService } from './auth.service';

// routing configuration
const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'platform', component: PlatformComponent,
    children: [
      { path: 'risks', component: RisksComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'map', component: MapComponent },
    ],
  },
];

// firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyARz8XRdcHClmQTA51whtPIxnq5ghefmPI',
  authDomain: 'poweridea-95395.firebaseapp.com',
  databaseURL: 'https://poweridea-95395.firebaseio.com',
  storageBucket: 'poweridea-95395.appspot.com',
  messagingSenderId: '134030378014'
};

// firebase auth config
export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PlatformComponent,
    RisksComponent,
    ProjectsComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),

    // material
    MdCheckboxModule, MdButtonModule,
    MdToolbarModule, MdInputModule, MdListModule,
    MdCardModule, MdCoreModule, MdTooltipModule,
    MdTabsModule, MdIconModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
