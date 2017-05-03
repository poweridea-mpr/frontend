import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MdCheckboxModule, MdButtonModule,
         MdToolbarModule, MdInputModule, MdListModule,
         MdCardModule, MdCoreModule, MdTooltipModule,
         MdTabsModule, MdIconModule, MdChipsModule,
         MdDialogModule, MdSelectModule, MdAutocompleteModule,
         MdSnackBarModule } from '@angular/material';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';
import { RisksComponent, AddRiskDialogComponent } from './platform/risks/risks.component';
import { ProjectsComponent, AddProjectDialogComponent } from './platform/projects/projects.component';
import { MapComponent } from './platform/map/map.component';
import { AdminComponent, AddUserDialogComponent } from './platform/admin/admin.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

// routing configuration
const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'platform', component: PlatformComponent, canActivate: [AuthGuard],
    children: [
      { path: 'risks', component: RisksComponent },
      { path: 'risks/:project', component: RisksComponent }, // risks for a project
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:owner', component: ProjectsComponent }, // projects for an owner
      { path: 'map', component: MapComponent },
      { path: 'admin', component: AdminComponent },
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
    AddRiskDialogComponent,
    ProjectsComponent,
    MapComponent,
    AdminComponent,
    AddUserDialogComponent,
    AddProjectDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    NgxDatatableModule,

    // material
    MdCheckboxModule, MdButtonModule,
    MdToolbarModule, MdInputModule, MdListModule,
    MdCardModule, MdCoreModule, MdTooltipModule,
    MdTabsModule, MdIconModule, MdChipsModule,
    MdDialogModule, MdSelectModule, MdAutocompleteModule,
    MdSnackBarModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    // dialogs must be entry components
    AddUserDialogComponent,
    AddProjectDialogComponent,
    AddRiskDialogComponent,
  ]
})
export class AppModule { }
