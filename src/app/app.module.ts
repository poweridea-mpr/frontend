import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MdCheckboxModule, MdButtonModule,
         MdToolbarModule, MdInputModule, MdListModule,
         MdCardModule, MdCoreModule, MdTooltipModule,
         MdTabsModule, MdIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PlatformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    BrowserAnimationsModule,

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
