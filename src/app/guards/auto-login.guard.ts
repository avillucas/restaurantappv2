import { Injectable } from '@angular/core';
import { CanLoad, Router, Routes } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../entities/user';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private routes:RouterService,
    ) {}

  async canLoad(): Promise<boolean> {
    const user = await this.loginService.isLoggedIn();    
    if (user) {            
      const route =   this.routes.definirRutaUsuario(user);      
      this.router.navigateByUrl(route, { replaceUrl: true });      
    }
    return true;
  }

}
