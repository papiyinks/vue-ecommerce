<template>
  <mdb-footer color="blue" class="font-small pt-3 mt-5" id="foot">
    <div class="footer-copyright text-center">
      <mdb-container fluid>
        <p class="textColor">
          PappyStore Designed By
          <strong>Papiyinks</strong> with Stutord
        </p>
      </mdb-container>
    </div>
  </mdb-footer>
</template>

<script>
import { mdbContainer, mdbFooter } from 'mdbvue';
export default {
  components: {
    mdbContainer,
    mdbFooter,
  },
};
</script>

<style scoped>
#foot {
  background-color: #007bff;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  overflow: hidden;
}
.textColor {
  color: #fff;
}
</style>
