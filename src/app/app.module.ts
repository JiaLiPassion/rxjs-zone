import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'zone.js/dist/zone-patch-rxjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
