
let menu = document.getElementsByClassName("header__menu");
let icons = document.getElementsByClassName("menu_icon");

for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener("click", getActive);
}

function getActive() {
  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.toggle("active");
    menu[i].classList.toggle("active");
  }
}
