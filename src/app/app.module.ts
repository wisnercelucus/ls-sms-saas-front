import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FeedComponent } from './feed/feed.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactComponent } from './welcome/contact/contact.component';
import { AboutComponent } from './welcome/about/about.component';
import { SchoolsComponent } from './schools/schools.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { MaterialModule } from './material/material.module';
import { BannerComponent } from './welcome/banner/banner.component';
import { DonorsComponent } from './donors/donors.component';
import { DonateComponent } from './donate/donate.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PricingComponent } from './welcome/pricing/pricing.component';
import { TestimonialsComponent } from './welcome/testimonials/testimonials.component';
import { FooterComponent } from './welcome/footer/footer.component';
import { FaqComponent } from './welcome/faq/faq.component';

import { ParticlesModule } from 'ngx-particle';
import { ParticlesComponent } from './welcome/particles/particles.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    WelcomeComponent,
    ContactComponent,
    AboutComponent,
    SchoolsComponent,
    HeaderComponent,
    SidenavComponent,
    BannerComponent,
    DonorsComponent,
    DonateComponent,
    AuthComponent,
    PricingComponent,
    TestimonialsComponent,
    FooterComponent,
    FaqComponent,
    ParticlesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
   ParticlesModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
