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

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';
import { RisksComponent } from './platform/risks/risks.component';
import { ProjectsComponent } from './platform/projects/projects.component';
import { MapComponent } from './platform/map/map.component';

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

    // material
    MdCheckboxModule, MdButtonModule,
    MdToolbarModule, MdInputModule, MdListModule,
    MdCardModule, MdCoreModule, MdTooltipModule,
    MdTabsModule, MdIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
