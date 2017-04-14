import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable((sub) => {
      const asub = this.auth.authState$.subscribe((state) => {
        if (state === null) {
          this.router.navigate(['/']);
        }

        sub.next(state !== null);
        sub.complete();
        asub.unsubscribe();
      });
    });
  }
}
