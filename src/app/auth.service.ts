import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {

  // readonly observable from the auth state
  get authState$(): Observable<FirebaseAuthState> {
    return this.af.auth.asObservable();
  }

  constructor(public af: AngularFire) {
  }

  /**
   * logs in an existing user with provided credentials
   * @param email
   * @param password
   */
  login(email: string, password: string): Promise<FirebaseAuthState> {
    return <any>this.af.auth.login({email: `${email}`, password: `${password}`})
  }

  /**
   * registers a new user into the firebase
   * @param email
   * @param password
   */
  register(email: string, password: string): Promise<FirebaseAuthState> {
    return <any>this.af.auth.createUser({email: `${email}`, password: `${password}`});
  }

  logout(): Promise<void> {
    return this.af.auth.logout();
  }
}
