<template>
  <mdb-container class="mt-4 pub">
    <mdb-row>
      <mdb-col>
        <mdb-jumbotron>
          <h2 class="h1 display-3">Home of Brands</h2>
          <p class="lead">
            <mdb-btn color="primary" v-if="auth">
              <router-link to="/new">
                <a class="log">Add New Products</a>
              </router-link>
            </mdb-btn>
          </p>
        </mdb-jumbotron>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col lg="3" md="6" v-for="product in products" :key="product.id">
        <mdb-card class="mb-4" cascade ecommerce wide>
          <img class="ImgP" v-bind:src="product.image" alt="Card Image" />
          <mdb-card-body cascade class="text-center">
            <mdb-card-title>
              <router-link :to="{ path: '/product/' + product.id }">
                <a title="Click to view more info">
                  <strong>{{ product.name }}</strong>
                </a>
              </router-link>
            </mdb-card-title>
            <div>
              <span class="float-left">
                ₦
                {{
                  product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
              </span>
              <span class="float-right">
                <mdb-btn
                  tag="a"
                  @click="addToCart(product)"
                  size="lg"
                  class="p-1 m-0 mr-2 z-depth-0"
                >
                  <mdb-icon title="Add To Cart" icon="shopping-cart" />
                </mdb-btn>
              </span>
            </div>
          </mdb-card-body>
          <div class="align-self-center mb-4">
            <button type="button" class="btn btn-outline-primary waves-effect">
              <router-link :to="{ path: '/product/' + product.id }">
                <a>More Info</a>
              </router-link>
            </button>
          </div>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import axios from 'axios';
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbJumbotron,
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbIcon,
} from 'mdbvue';
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbJumbotron,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbIcon,
  },
  data() {
    return {
      products: null,
    };
  },
  mounted() {
    axios
      .get('/products')
      .then(response => {
        this.products = response.data.products;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product);
      alert('item added to cart');
    },
  },
};
</script>

<style scoped>
.log {
  color: white !important;
}
.ImgP {
  height: 240px;
  width: 100% !important;
  object-fit: cover !important;
}
.pub {
  padding-bottom: 5rem;
}
</style>
