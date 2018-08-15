import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AuthGuardService implements CanActivate  {
    constructor(private loginService: AppService){}

    canActivate() {
        return this.loginService.matchDetailsRetrieved;
    }
}