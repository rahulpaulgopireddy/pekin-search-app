import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { UserauthService } from './services/userauth.service';
import { FormvalidationService } from './services/formvalidation.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchtableComponent } from './searchtable/searchtable.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { SavedComponent } from './saved/saved.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    SidebarComponent,
    SearchtableComponent,
    DashboardComponent,
    AboutComponent,
    SavedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserauthService, FormvalidationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
