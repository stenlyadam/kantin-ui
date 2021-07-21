import store from "./store";
import { saveCart } from "../api/cart";

let currentAuth;
let currentCart;

function listener() {
  let previousAuth = currentAuth;
  let previousCart = currentCart;

  currentAuth = store.getState().auth;
  currentCart = store.getState().cart;

  let { token } = currentAuth;

  if (currentAuth !== previousAuth) {
    localStorage.setItem("auth", JSON.stringify(currentAuth));

    // (1) saveCart saat `auth` berubah
    saveCart(token, currentCart);
  }

  if (currentCart !== previousCart) {
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // (2) saveCart saat `cart` berubah
    saveCart(token, currentCart);
  }
}

function listen() {
  store.subscribe(listener);
}

export { listen };
