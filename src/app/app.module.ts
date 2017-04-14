import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdCheckboxModule, MdButtonModule,
         MdToolbarModule, MdInputModule, MdListModule,
         MdCardModule, MdCoreModule, MdTooltipModule,
         MdTabsModule } from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule

    // material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
