<template>
  <div id="app">
    <h1>Stock Watcher</h1>
    <new-stock-form class="mb-1" @newStock="handleNewStock"/>
    <b-row>
        <b-col v-for="stock in stocks" :key="stock.symbol" cols="4">
          <stock-info class="col-12"  :stock="stock"/>
        </b-col>
    </b-row>
  </div>
</template>

<script>
import StockService from './services/Stocks';
import NewStockForm from './components/NewStockForm.vue'
import StockInfo from './components/StockInfo.vue'

export default {
  name: 'App',
  components: {
    NewStockForm,
    StockInfo,
  },
  data() {
    return {
        stocks: [],
        form: {
          symbol: ''
        },
    };
  },
  methods: {
    handleNewStock(newStock) {
      console.log('newStock in handleNewStock', newStock);
      this.stocks.push(newStock);
    },
    async onSubmit(event) {
      event.preventDefault();
      console.log('called handleSubmit ', this.form)
      try {
        const stockInfo = await StockService.getQuote(this.form.symbol);
        console.log('stockInfo: ', stockInfo)
        this.stocks.push(stockInfo);
      } catch(error) {
          this.$bvToast.toast(`That symbol does not exist. Please try something different.`, {
            title: 'error',
            variant: 'danger',
            autoHideDelay: 5000,
        })
      }
      this.form.symbol = '';
    },
  },
}
</script>

<style>
body {
  background-color: #fafafac9;
  height: 100%;
  width: 100%;
}

#app {
  font-family: Open Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 5%px;
  padding: 5%;
}


</style>
