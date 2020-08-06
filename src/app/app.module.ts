import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactComponent } from './welcome/contact/contact.component';
import { AboutComponent } from './welcome/about/about.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { BannerComponent } from './welcome/banner/banner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PricingComponent } from './welcome/pricing/pricing.component';
import { TestimonialsComponent } from './welcome/testimonials/testimonials.component';
import { FaqComponent } from './welcome/faq/faq.component';
import { ParticlesModule } from 'ngx-particle';
import { ParticlesComponent } from './welcome/particles/particles.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DonateModule } from './donate/donate.module';
import { DonateRoutingModule } from './donate/donate-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { ForumModule } from './forum/forum.module';
import { ForumRoutingModule } from './forum/forum.routing';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { FeedRoutingModule } from './feed/feed.routing';
import { FeedModule } from './feed/feed.module';
import { NotificationsComponent } from './notifications/notifications.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ForumEffects } from './forum/store/forum.effects';
import { TopicResolver } from './forum/topic-resolver.service';

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
    ParticlesComponent,
    NotificationsComponent,

  ],

  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    NgxLinkifyjsModule.forRoot(
      {
        enableHash: false,
        enableMention: false
      }
    ),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, ForumEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ParticlesModule,
    SchoolsModule,
    UsersModule,
    SharedModule,
    AuthRoutingModule,
    DonateModule,
    DonateRoutingModule,
    UsersRoutingModule,
    ForumModule,
    ForumRoutingModule,
    FeedRoutingModule,
    FeedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
