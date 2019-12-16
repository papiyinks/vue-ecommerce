<template>
  <mdb-container class="pub">
    <mdb-row>
      <mdb-col class="mt-4" md="6">
        <h3>
          <strong>{{ name }}</strong>
        </h3>
        <p>
          <strong>Brand:</strong>
          {{ brand }}
        </p>
        <div>
          <img alt v-bind:src="image" class="img-fluid w-75 ImgP" />
        </div>
        <div>
          <p class="pt-4">₦ {{ price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</p>
          <mdb-btn class="beat mb-4" @click="addToCart(product)" color="info">Add to cart</mdb-btn>
        </div>
      </mdb-col>
      <mdb-col class="mt-md-5" md="6">
        <p class="text-justify mt-md-3">
          <strong>Description:</strong>
          {{ description }}
        </p>
        <div class="d-flex">
          <div v-if="this.userSub.sub === this.owner">
            <mdb-btn color="success">
              <router-link :to="{ path: '/edit/' + id }">
                <a class="text-reset">Edit</a>
              </router-link>
            </mdb-btn>
            <mdb-btn @click="deleted" color="danger">Delete</mdb-btn>
          </div>
          <mdb-btn color="primary">
            <router-link to="/products">
              <a class="logg">Back to products</a>
            </router-link>
          </mdb-btn>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import axios from 'axios';
import cookie from 'js-cookie';
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from 'mdbvue';
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
  },
  data() {
    return {
      name: '',
      price: '',
      brand: '',
      image: '',
      description: '',
      id: '',
      owner: '',
      userSub: '',
      product: [],
    };
  },
  mounted() {
    const authUser = cookie.get('user');
    if (authUser) {
      this.userSub = JSON.parse(authUser);
    }

    axios
      .get(`/product/${this.$route.params.id}`)
      .then(response => {
        this.name = response.data.product.name;
        this.price = response.data.product.price;
        this.brand = response.data.product.brand;
        this.image = response.data.product.image;
        this.description = response.data.product.description;
        this.id = response.data.product.id;
        this.owner = response.data.product.owner;
        this.product = response.data.product;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    deleted() {
      axios
        .delete(`/product/${this.$route.params.id}`, {
          headers: {
            Authorization: cookie.get('token'),
          },
        })
        .then(res => {
          this.$router.push('/products');
        })
        .catch(error => {
          console.log(error);
        });
    },
    addToCart(product) {
      this.$store.commit('addToCart', product);
      alert('item added to cart');
    },
  },
};
</script>

<style scoped>
.ImgP {
  min-width: 335px;
  min-height: 335px;
}
.pub {
  padding-bottom: 6rem;
}
.beat {
  border-radius: 10em;
}
.logg {
  color: white !important;
}
</style>
