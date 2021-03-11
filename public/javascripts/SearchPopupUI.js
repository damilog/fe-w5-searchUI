import { SearchBarUI } from "./SearchBarUI";
import _ from "./util";

const SearchPopupUI = function (url) {
  this.url = url;
  this.init();
};

SearchPopupUI.prototype = {
  constructor: SearchPopupUI,
  async getJson() {
    //중복 코드 제거 필요
    const res = await fetch(this.url);
    this.result = await res.json();
    return this.result.upkeyword;
  },

  async renderPopUpBox() {
    const keywordList = await this.getJson();
    const innerTemplate = keywordList.reduce((acc, list, idx) => {
      let template;
      switch (idx) {
        case 4:
          template = `<li><span class="list__text">${
            idx + 1
          }</span>${list}</li></ol><ol class="inner__keyword-list">`;
          break;
        case 9:
          template = `<li><span class="list__text">${
            idx + 1
          }</span>${list}</li></ol>`;
          break;
        default:
          template = `<li><span class="list__text">${
            idx + 1
          }</span>${list}</li>`;
      }
      return acc + template;
    }, `<ol class="inner__keyword-list">`);

    const outerTemplate = `<div class="popup-search-wrap__inner">
      <strong>인기 쇼핑 키워드</strong> ${innerTemplate}
    </div>`;

    _.$(".popup-search-wrap").insertAdjacentHTML("afterbegin", outerTemplate);
  },

  init() {
    const $input = _.$(".search-form__input");
    $input.addEventListener("focus", this.showPopUpBox);
  },

  showPopUpBox() {
    const $input = _.$(".search-form__input");
    // $input.style.display = "none";
  },
};

// SearchPopupUI.prototype.checkSearchFocus = function () {};

export { SearchPopupUI };
