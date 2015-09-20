import { Parse } from 'parse';

const auth = {
  logIn(email, password, cb) {
    Parse.User.logIn(email, password).then(() => {
      if (cb) cb(true);
      this.onChange(true);
    }, (e) => {
      if (cb) cb(false);
      this.onChange(false);
    });
  },

  logInWithResetPasswordToken(token, cb) {
    Parse.Cloud.run('requestToken', {token}).then((result) => {
      return Parse.User.become(result);
    }).then(() => {
      if (cb) cb(true);
      this.onChange(true);
    }, (e) => {
      if (cb) cb(false);
      this.onChange(false);
    });
  },

  logOut(cb) {
    Parse.User.logOut().then(() => {
      if (cb) cb();
      this.onChange(false);
    });
  },

  loggedIn() {
    return !!Parse.User.current();
  },

  onChange () {}
};

export default auth;