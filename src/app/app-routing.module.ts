import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from "./views/users/users.component";
import { ListUsersComponent } from "./views/users/list-users/list-users.component";
import { CreateUserComponent } from "./views/users/create-user/create-user.component";
import { EditUserComponent } from "./views/users/edit-user/edit-user.component";
import { DeleteUserComponent } from "./views/users/delete-user/delete-user.component";
import { AppointsComponent } from "./views/appoints/appoints.component";
import { NotFoundComponent } from "./views/not-found/not-found.component";
import { AuthGuard } from "./utils/auth.guard";
import { LoginGuard } from "./utils/login.guard";
import { AdminGuard } from "./utils/admin.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'usuarios/lista',
    component: ListUsersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'usuarios/crear',
    component: CreateUserComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'usuarios/editar',
    component: EditUserComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'usuarios/eliminar',
    component: DeleteUserComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'citas',
    component: AppointsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404', 
    component: NotFoundComponent
  },
  {
    path: '**', 
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
