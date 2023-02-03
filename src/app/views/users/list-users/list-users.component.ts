import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{

  users:any=[];

  constructor(
    private location: Location,
    private userService: UserService
    ){}

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe({
      next: (v) => {this.users=v},
      error: (e) => console.error(e)
    })
  }



  backClicked() {
    this.location.back();
  }

} 