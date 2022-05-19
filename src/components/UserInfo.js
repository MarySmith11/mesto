export default class UserInfo {
    constructor({ nameSelector, professionSelector }) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
    }

    getUserInfo() {
        return {name: this._name.textContent, profession: this._profession.textContent};
    }

    setUserInfo(values) {
        this._name.textContent = values.name;
        this._profession.textContent = values.profession;
    }
}