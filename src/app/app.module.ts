import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './ui/header/header.component';
import { UsersComponent } from './views/users/users.component';
import { AppointsComponent } from './views/appoints/appoints.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { CardComponent } from './ui/card/card.component';
import { ListUsersComponent } from './views/users/list-users/list-users.component';

import { TokenInterceptorService } from "./services/token-interceptor.service";
import { CreateUserComponent } from './views/users/create-user/create-user.component';
import { EditUserComponent } from './views/users/edit-user/edit-user.component';
import { DeleteUserComponent } from './views/users/delete-user/delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UsersComponent,
    AppointsComponent,
    NotFoundComponent,
    CardComponent,
    ListUsersComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
