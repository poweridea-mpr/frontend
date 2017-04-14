import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {

  // subject that represents state of authentication
  private authState = new BehaviorSubject(null);

  // readonly observable from the auth state
  get authState$(): Observable<FirebaseAuthState> {
    return this.authState.asObservable();
  }

  constructor(public af: AngularFire) { }

  /**
   * logs in an existing user with provided credentials
   * @param email
   * @param password
   */
  login(email: string, password: string): Promise<FirebaseAuthState> {
    return new Promise((resolve, reject) => {
      this.af.auth.login({email: `${email}`, password: `${password}`}).then((state: FirebaseAuthState) => {
        this.authState.next(state);
        resolve(state);
      }).catch((e: Error) => {
        this.authState.next(null);
        reject(e);
      });
    });
  }

  /**
   * registers a new user into the firebase
   * @param email
   * @param password
   */
  register(email: string, password: string): Promise<FirebaseAuthState> {
    return new Promise((resolve, reject) => {
      this.af.auth.createUser({email: `${email}`, password: `${password}`}).then((state: FirebaseAuthState) => {
        this.authState.next(state);
        resolve(state);
      }).catch((e: Error) => {
        this.authState.next(null);
        reject(e);
      });
    });
  }

  logout(): Promise<FirebaseAuthState> {
    return new Promise((resolve, reject) => {
      this.af.auth.logout().then(() => {
        this.authState.next(null);
        resolve();
      }).catch((e: Error) => {
        this.authState.next(null);
        reject(e);
      });
    });
  }
}
