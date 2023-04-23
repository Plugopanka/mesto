export default class userInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._name.textContent;
    this._userData.description = this._description.textContent;
    return this._userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }
}
