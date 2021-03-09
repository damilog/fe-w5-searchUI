function SearchBarUI() {
  this.get = async function () {
    const res = await fetch(
      "https://m.shoppinghow.kakao.com/v3/m/search/extends.json?_=1615270019198"
    );
    this.result = await res.json();
    console.log(this.result);
  };
}
