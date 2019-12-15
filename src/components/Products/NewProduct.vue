<template>
  <mdb-container>
    <mdb-row class="d-flex justify-content-center my-5 pb-5">
      <mdb-col md="6">
        <mdb-card>
          <mdb-card-body>
            <form @submit.prevent="onSubmit">
              <p class="h4 text-center py-2">Add New Product</p>
              <input type="text" class="form-control" placeholder="Name" v-model="name" required />
              <br />
              <input type="text" class="form-control" placeholder="Brand" v-model="brand" required />
              <br />
              <input
                type="number"
                class="form-control"
                placeholder="Price"
                v-model="price"
                required
              />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Image url"
                v-model="image"
                required
              />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="description"
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
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        price: this.price,
        brand: this.brand,
        image: this.image,
        description: this.description,
      };
      axios
        .post('/products', formData, {
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
  },
};
</script>
