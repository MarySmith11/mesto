export default class UserInfo {
    constructor({ nameSelector, professionSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._id = null;
    }

    getUserInfo() {
        return {name: this._name.textContent, profession: this._profession.textContent};
    }

    setUserInfo({name, profession, avatar, id}) {
        if(typeof name !== 'undefined' && typeof profession !== 'undefined'){ 
            this._name.textContent = name; 
            this._avatar.alt = name;
            this._profession.textContent = profession; 
          } 
          if(typeof avatar !== 'undefined'){ 
            this._avatar.src = avatar; 
          } 
          if(typeof id !== 'undefined'){ 
            this._id = id; 
          } 
    }

    getUserId(){ 
        return this._id; 
      } 
}