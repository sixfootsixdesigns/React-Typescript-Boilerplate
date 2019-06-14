import auth0 from 'auth0-js';

export interface AuthProfile {
  at_hash?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  nonce?: string;
  sub?: string;
  locale?: string;
  name?: string;
  picture?: string;
  email?: string;
}

export class Auth {
  private accessToken: string | null = null;
  private idToken: string | null = null;
  private expiresAt: number = 0;
  private profile: AuthProfile | null = null;
  private auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN || '',
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID || '',
    redirectUri:
      process.env.REACT_APP_AUTH_CALLBACK || 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.silentAuth = this.silentAuth.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  public login() {
    this.auth0.authorize();
  }

  public handleAuthentication(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return reject(err);
        }
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public getProfile() {
    return this.profile;
  }

  public getIdToken() {
    return this.idToken;
  }

  public silentAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  public logout() {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.profile = null;

    this.auth0.logout({
      returnTo: process.env.REACT_APP_AUTH_RETURN_URL,
      clientID: process.env.REACT_APP_AUTH_CLIENT_ID
    });
  }

  public isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  private async setSession(authResult: any) {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = expiresAt;
  }
}
