import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { YoutubeService } from './youtubeservice.service';
import { NavbarComponent } from './navbar/navbar.component';
import * as $ from 'jquery';
import { SearchResultComponent } from './searchresult/searchresult.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FindComponent } from './find/find.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { EternalSunshineComponent } from './eternal-sunshine/eternal-sunshine.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchResultComponent,
    AboutusComponent,
    FindComponent,
    MobileMenuComponent,
    EternalSunshineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
