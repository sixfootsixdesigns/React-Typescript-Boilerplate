'use strict';

import { resolve } from "path";

function WebAuth(options) {}

const token = {
  idToken: 'foo',
  expiresIn: 10000,
  accessToken: 'bar'
}

WebAuth.prototype.parseHash = (options, cb) => {
  return cb(null, token);
};

WebAuth.prototype.checkSession = (options, cb) => {
  return cb(null, token);
}

WebAuth.prototype.authorize = () => {
  return;
}

WebAuth.prototype.logout = (options) => {
  return;
}

export default {
  WebAuth
};
