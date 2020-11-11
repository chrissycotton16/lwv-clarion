import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AdminService } from './services/admin.service';

@Injectable({
providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {

    constructor(private adminService: AdminService,private router: Router ) {}

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
        const routeurl: string = state.url;
        return this.isLogin(routeurl);
    }

    isLogin(routeurl: string) {
        if (this.adminService.isLoggedIn()) {
        return true;
    }   

    this.adminService.redirectUrl = routeurl;
    this.router.navigate(['/login'], {queryParams: { returnUrl: routeurl }} );
    }
} 