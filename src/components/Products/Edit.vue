<template>
  <mdb-container>
    <mdb-row class="d-flex justify-content-center my-5 pb-5">
      <mdb-col md="6">
        <mdb-card>
          <mdb-card-body>
            <form @submit.prevent="onSubmit">
              <p class="h4 text-center py-2">Edit {{ name }}</p>
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                v-model="name"
                value="{name}"
                required
              />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Brand"
                v-model="brand"
                value="{brand}"
                required
              />
              <br />
              <input
                type="number"
                class="form-control"
                placeholder="Price"
                v-model="price"
                value="{price}"
                required
              />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Image url"
                v-model="image"
                value="{image}"
                required
              />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="description"
                value="{description}"
                required
              />
              <div class="text-center py-4 mt-3">
                <mdb-btn class="btn btn-outline-purple" type="submit">
                  Submit
                  <mdb-icon far icon="paper-plane" class="ml-2" />
                </mdb-btn>
              </div>
            </form>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import axios from 'axios';
import cookie from 'js-cookie';
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbIcon,
} from 'mdbvue';
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbIcon,
  },
  data() {
    return {
      name: '',
      price: '',
      brand: '',
      image: '',
      description: '',
    };
  },
  mounted() {
    axios
      .get(`/product/${this.$route.params.id}`)
      .then(response => {
        this.name = response.data.product.name;
        this.price = response.data.product.price;
        this.brand = response.data.product.brand;
        this.image = response.data.product.image;
        this.description = response.data.product.description;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        price: this.price,
        image: this.image,
        description: this.description,
      };
      axios
        .patch(`/product/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: cookie.get('token'),
          },
        })
        .then(() => this.$router.push(`/product/${this.$route.params.id}`))
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>
