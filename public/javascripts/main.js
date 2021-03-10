import "regenerator-runtime/runtime";
import TopCarouselUI from "./TopCarouselUI.js";
import BottomCarouselUI from "./BottomCarouselUI.js";
import ViewMoreUI from "./ViewMoreUI.js";
import _ from "./util.js";
import { SearchBarUI } from "./SearchBarUI.js";

const $rollingSearchList = _.$(".roll-search-list");

const topCarouselUI = new TopCarouselUI();
const viewMoreUI = new ViewMoreUI();
const bottomCarouselUI = new BottomCarouselUI();
const searchBarUI = new SearchBarUI(
  "https://m.shoppinghow.kakao.com/v3/m/search/extends.json",
  $rollingSearchList
);

searchBarUI.getJson();
searchBarUI.drawKeywordList();
searchBarUI.setToRepeatRoll();
searchBarUI.roll();
