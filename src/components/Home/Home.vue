<template>
  <mdb-container class="pb-5">
    <mdb-row class="mt-4 mb-5">
      <mdb-col md="4">
        <div>
          <h4 class="mb-3">
            <strong>Categories</strong>
          </h4>
        </div>
        <div>
          <p>Women's Fashion</p>
        </div>
        <div>
          <p>Men's Fashion</p>
        </div>
        <div>
          <p>Mobile & Accessories</p>
        </div>
        <div>
          <p>Computer，Office & Security</p>
        </div>
        <div>
          <p>Consumer Electronics</p>
        </div>
        <div>
          <p>Jewelry & Watches</p>
        </div>
        <div>
          <p>Home, Garden & Appliances</p>
        </div>
        <div>
          <p>Bags & Shoes</p>
        </div>
        <div>
          <p>Outdoor Fun & Sports</p>
        </div>
        <div>
          <p>Automobiles & Motorcycles</p>
        </div>
      </mdb-col>
      <mdb-col md="8">
        <div>
          <h4 class="mb-3">
            <strong>Flash Deals</strong>
          </h4>
        </div>
        <mdb-carousel :interval="8000" slide :items="items" indicators></mdb-carousel>
      </mdb-col>
    </mdb-row>
    <h4 class="text-center">
      <strong>Latest Products</strong>
    </h4>
    <mdb-row class="mb-5 mt-2">
      <mdb-col class="mt-4" sm="6" md="3" v-for="product in products.slice(-4)" :key="product.id">
        <img class="ImgP" v-bind:src="product.image" alt />
        <div class="text-center mt-2">
          <strong>{{product.name}}</strong>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
[Vue warn]: Error in render: "TypeError: Cannot read property 'slice' of null"
<script>
import axios from 'axios';
import { mdbContainer, mdbRow, mdbCol, mdbCarousel } from 'mdbvue';
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCarousel,
  },
  data() {
    return {
      products: [],
      items: [
        {
          img: true,
          src:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        },
        {
          img: true,
          src:
            'https://images.unsplash.com/photo-1551219059-b5f8e7acee56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        },
        {
          img: true,
          src:
            'https://images.unsplash.com/photo-1564507791227-bd8332f2566b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        },
      ],
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
};
</script>

<style scoped>
.ImgP {
  height: 240px;
  width: 100% !important;
  object-fit: cover !important;
}
</style>
