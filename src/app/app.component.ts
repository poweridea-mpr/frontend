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
  }

  ngOnInit() {
    // subscribe to changes in auth state change
    this.auth.authState$.subscribe(this.onAuthStateChange.bind(this));
  }

  onAuthStateChange(state: FirebaseAuthState) {
    if (state == null) {
      // unauthenticated user
      this.menu = [];
    } else {
      // authenticated user
      this.menu = [
        { value: 'Logout', click: () => this.auth.logout().then(() => this.router.navigate(['/'])) },
        { value: 'Projects', click: () => this.router.navigate(['/platform/projects']) },
        { value: 'Risks', click: () => this.router.navigate(['/platform/risks']) },
        { value: 'Map of risks', click: () => this.router.navigate(['/platform/map']) },
        { value: 'Admin', click: () => this.router.navigate(['/platform/admin']) },
      ];
    }
  }
}
