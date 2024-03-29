export default class userInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._name.textContent;
    this._userData.about = this._about.textContent;
    this._userData.avatar = this._avatar.src;
    return this._userData;
  }

  setUserInfo(data) {
    if (data.name) {
    this._name.textContent = data.name;
    }
    if (data.about) {
    this._about.textContent = data.about;
    }
  }

  setUserAvatar(data) {
    if (data) {
    this._avatar.src = data;
    }
  }
}
