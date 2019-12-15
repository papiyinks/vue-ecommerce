import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import cookie from 'js-cookie';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    user: null,
    cart: [],
    cartCount: 0,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.user = userData.user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.user = null;
    },
    addToCart(state: { cart: any; cartCount: any }, item) {
      let found = state.cart.find(
        (product: { id: any }) => product.id === item.id
      );

      if (found) {
        found.quantity++;
        found.totalPrice = found.quantity * found.price;
      } else {
        state.cart.push(item);

        Vue.set(item, 'quantity', 1);
        Vue.set(item, 'totalPrice', item.price);
      }

      state.cartCount++;
    },
    removeFromCart(state: { cart: any; cartCount: any }, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {
        let product = state.cart[index];
        state.cartCount -= product.quantity;

        state.cart.splice(index, 1);
      }
    },
    increaseQuantity(state: { cart: any; cartCount: any }, item) {
      let addedItem = state.cart.find(
        (product: { id: any }) => product.id === item.id
      );

      if (addedItem) {
        addedItem.quantity++;
        addedItem.totalPrice = addedItem.quantity * addedItem.price;
      } else {
        state.cart.push(item);

        Vue.set(item, 'quantity', 1);
        Vue.set(item, 'totalPrice', item.price);
      }

      state.cartCount++;
    },
    decreaseQuantity(state: { cart: any; cartCount: any }, item) {
      let addedItem = state.cart.find(
        (product: { id: any }) => product.id === item.id
      );

      if (addedItem) {
        addedItem.quantity--;
        addedItem.totalPrice = addedItem.quantity * addedItem.price;
      } else {
        state.cart.push(item);

        Vue.set(item, 'totalPrice', item.price);
      }

      state.cartCount--;
    },
    clearCartData(state) {
      state.cart = [];
      state.cartCount = 0;
    },
  },
  actions: {
    login({ commit }, authData) {
      axios
        .post('/login', {
          email: authData.email,
          password: authData.password,
        })
        .then(res => {
          cookie.set('token', res.data.idToken);
          cookie.set('user', JSON.stringify(res.data));
          commit('authUser', {
            token: res.data.idToken,
            user: JSON.stringify(res.data),
          });
          router.push('/products');
        })
        .catch(error => {
          console.log(error);
        });
    },
    tryAutoLogin({ commit }) {
      const token = cookie.get('token');
      if (!token) {
        return;
      }

      const user = cookie.get('user');
      commit('authUser', {
        token: token,
        user: user,
      });
    },
    logout({ commit }) {
      commit('clearAuthData');
      cookie.remove('token');
      cookie.remove('user');
      router.replace('/');
    },
    clearCart({ commit }) {
      commit('clearCartData');
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null;
    },
  },
  modules: {},
});
