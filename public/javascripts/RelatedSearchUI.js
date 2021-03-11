import _ from "./util";
const RelatedSearchUI = function (input) {
  this.$input = input;
  this.activeTimer;
  this.init();
};

RelatedSearchUI.prototype = {
  constructor: RelatedSearchUI,

  requestJsonp(word, callbackName) {
    const script = document.createElement("script");
    script.src = `https://suggest-bar.daum.net/suggest?callback=${callbackName}&limit=10&mode=json&code=utf_in_out&q=${word}&id=shoppinghow_suggest`;
    document.body.append(script);
    window["responseJsonpData"] = function (data) {
      console.log(data);
    };
  },
  showKeywordBox() {},

  colorKeyword() {},

  getData() {
    const currentKeyword = _.$(".search-form__input").value;
    console.log(currentKeyword);

    this.requestJsonp(currentKeyword, "responseJsonpData");
  },

  getInputValue() {
    if (!this.activeTimer) {
      this.activeTimer = _.debounce(this.getData.bind(this), 1000);
    }
    this.activeTimer();
  },

  init() {
    this.$input.addEventListener("input", this.getInputValue.bind(this));
  },
};

export { RelatedSearchUI };
