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

SearchBarUI.prototype.drawKeywordList = async function () {
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
  const timer = setInterval(this.roll.bind(this), 1000);
  if (this.rollSize === 10) clearInterval(timer);
};

SearchBarUI.prototype.roll = function () {
  this.$rollingSearchList.style.transition = "transform 0.3s ease-in-out";

  this.$rollingSearchList.style.transform =
    "translateY(" + -32 * this.rollSize + "px)";
  this.rollSize++;
};

export { SearchBarUI };
