<template>
  <b-form @submit="onSubmit" inline>
    <b-input
      id="stock-symbol"
      v-model="form.symbol"
      required
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Stock Symbol"
    ></b-input>
    <b-button type="submit" variant="primary">Add Stock</b-button>
  </b-form>
</template>

<script>
import StockService from '../services/Stocks';

export default {
  name: 'NewStockForm',
  data() {
    return {
        form: {
          symbol: ''
        },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      try {
        const stockInfo = await StockService.getQuote(this.form.symbol);
        this.$emit('newStock', stockInfo);
      } catch(error) {
        this.$bvToast.toast(`That symbol does not exist. Please try something different.`, {
          title: 'error',
          variant: 'danger',
          autoHideDelay: 5000,
        });
      }
      this.form.symbol = '';
    },
  },
}
</script>

<style>

</style>