import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.rol;
      
      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showUserBoard = this.roles.includes('CLIENT');
      
      this.username = user.nombre;
    }
    
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
