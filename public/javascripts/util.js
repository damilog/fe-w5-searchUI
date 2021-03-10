const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  delay: (data, ms) =>
    new Promise(resolve => setTimeout(() => resolve(data), ms)),
};

export default _;
