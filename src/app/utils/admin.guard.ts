import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { TokenStorageService } from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ){}

  canActivate(): boolean{
    if(this.tokenStorageService.getUser().rol === 'ADMIN'){
      return true;
    }
    this.router.navigate(['/404']);
    return false;
  } 
  
}