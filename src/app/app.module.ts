import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactComponent } from './welcome/contact/contact.component';
import { AboutComponent } from './welcome/about/about.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { MaterialModule } from './material/material.module';
import { BannerComponent } from './welcome/banner/banner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PricingComponent } from './welcome/pricing/pricing.component';
import { TestimonialsComponent } from './welcome/testimonials/testimonials.component';

import { FaqComponent } from './welcome/faq/faq.component';

import { ParticlesModule } from 'ngx-particle';
import { ParticlesComponent } from './welcome/particles/particles.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SchoolsModule } from './schools/schools/schools.module';
import { UsersModule } from './schools/users/users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DonateModule } from './donate/donate.module';
import { DonateRoutingModule } from './donate/donate-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ContactComponent,
    AboutComponent,
    HeaderComponent,
    SidenavComponent,
    BannerComponent,
    PricingComponent,
    TestimonialsComponent,
    FaqComponent,
    ParticlesComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ParticlesModule,
    FontAwesomeModule,
    SchoolsModule,
    UsersModule,
    SharedModule,
    AuthRoutingModule,
    DonateModule,
    DonateRoutingModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
