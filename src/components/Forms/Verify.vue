<template>
  <mdb-container>
    <mdb-row class="d-flex justify-content-center pb-5 my-5">
      <mdb-col sm="12" md="8" lg="6">
        <mdb-card>
          <mdb-card-body>
            <form @submit.prevent="onSubmit">
              <p class="h4 text-center py-2">Verification of Account</p>
              <p class="text-center">
                <em>Check your email to get the verification code</em>
              </p>
              <input type="email" class="form-control" placeholder="email" v-model="email" required />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="verification code"
                v-model="code"
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
import axios from 'axios';
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
      code: '',
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        code: this.code,
      };
      axios
        .post('/verify', formData)
        .then(res => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>
