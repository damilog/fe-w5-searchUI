import _ from "./util";

const SearchBarUI = function (url, listWrap) {
  this.url = url;
  this.$rollingSearchList = listWrap;
  this.rollSize = 0;
  console.log(33);
};

SearchBarUI.prototype.getJson = async function () {
  const res = await fetch(this.url);
  this.result = await res.json();
  return this.result.upkeyword;
};

SearchBarUI.prototype.renderKeywordList = async function () {
  const keywordList = await this.getJson();
  const keywordListTemplate = keywordList.reduce((acc, list, idx) => {
    const template = `<li><span class="list-rank">${
      idx + 1
    }</span>${list}</li>`;
    return acc + template;
  }, "");
  this.$rollingSearchList.insertAdjacentHTML("afterbegin", keywordListTemplate);

  const keywordFirstChild = this.$rollingSearchList.firstElementChild.cloneNode(
    true
  );
  this.$rollingSearchList.appendChild(keywordFirstChild);
};

SearchBarUI.prototype.setToRepeatRoll = function () {
  const timer = setInterval(this.roll.bind(this), 3000);
};

SearchBarUI.prototype.roll = function () {
  if (this.rollSize === 11) {
    this.$rollingSearchList.style.transition = "";
    this.$rollingSearchList.style.top = 0;
    this.rollSize = 0;
  } else {
    this.$rollingSearchList.style.transition = "transform 0.5s ease-in-out";
    this.$rollingSearchList.style.transform =
      "translateY(" + -31 * this.rollSize + "px)";
    this.rollSize++;
  }
};

SearchBarUI.prototype.renderPopUpBox = async function () {
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
        template = `<li><span class="list__text">${idx + 1}</span>${list}</li>`;
    }
    return acc + template;
  }, `<ol class="inner__keyword-list">`);

  const outerTemplate = `<div class="popup-search-wrap__inner">
  <strong>인기 쇼핑 키워드</strong> ${innerTemplate}
</div>`;

  _.$(".popup-search-wrap").insertAdjacentHTML("afterbegin", outerTemplate);
};

export { SearchBarUI };
