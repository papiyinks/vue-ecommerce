<template>
  <mdb-container>
    <mdb-row class="d-flex justify-content-center pb-5 my-5">
      <mdb-col sm="12" md="8" lg="6">
        <mdb-card>
          <mdb-card-body>
            <form @submit.prevent="onSubmit">
              <p class="h4 text-center py-2">Login</p>
              <input
                type="email"
                class="form-control"
                placeholder="Email Address"
                v-model="email"
                required
              />
              <br />
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
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
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbBtn,
  mdbIcon,
} from 'mdbvue';
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbBtn,
    mdbIcon,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('login', {
        email: formData.email,
        password: formData.password,
      });
    },
  },
};
</script>
