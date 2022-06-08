//отрисовка элементов на странице
export default class Section {
  constructor(renderer, containerSelector, userInfo) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._userInfo = userInfo;
  }

  addItem(element, append = false) {
    if(append) {
      this._container.append(element);
    }else {
      this._container.prepend(element);
    }
  }

  renderItems(res) {
    res.forEach((item) => {
        this._renderer({
          name: item.name,
          link: item.link,
          likes: item.likes.length,
          id: item._id,
          isOwner: item.owner._id === this._userInfo.getUserId(),
          isLiked: Array.from(item.likes).some((like) => like._id === this._userInfo.getUserId())
        }); 
      });
  }
}
