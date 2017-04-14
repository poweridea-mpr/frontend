import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // menu displayed within toolbar
  public menu: Array<{value: string, click: Function}>;

  constructor(private auth: AuthService, private router: Router, private changeDetector: ChangeDetectorRef) {
    // subscribe to changes in auth state change
  }

  ngOnInit() {
    /*setInterval(() => {
      this.menu = [...this.menu, { value: 'Logout', click: () => this.auth.logout().then(() => this.router.navigate(['/'])) }];
    }, 1500);*/

    this.auth.authState$.subscribe(this.onAuthStateChange.bind(this));
  }

  onAuthStateChange(state: FirebaseAuthState) {
    if (state == null) {
      // unauthenticated user
      this.menu = [];
    } else {
      // authenticated user
      this.menu = [
        { value: 'Logout', click: () => this.auth.logout().then(() => this.router.navigate(['/'])) }
      ];
    }
  }
}
