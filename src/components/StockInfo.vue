<template>
  <b-card class="mt-3">
      <h2 class="font-weight-bold">{{stockName}}</h2>
      <p>{{stock.symbol}}</p>
      <b-row>
          <h3 class="col-4">{{parseInt(stock.price).toFixed(2)}}</h3>
          <b-col :class="parseInt(stock.change) >= 0 ? 'price-increase' : 'price-decrease'" cols="2">{{parseInt(stock.change).toFixed(2)}}</b-col>
          <b-col :class="parseInt(stock.change) >= 0 ? 'price-increase' : 'price-decrease'" cols="2">({{parseInt(stock['change percent']).toFixed(2)}}%)</b-col>
      </b-row>
      <b-row>
          <b-col cols="4">open {{parseInt(stock.open).toFixed(2)}}</b-col>
          <b-col cols="4">high {{parseInt(stock.high).toFixed(2)}}</b-col>
          <b-col cols="4">low {{parseInt(stock.low).toFixed(2)}}</b-col>
      </b-row>
  </b-card>
</template>

<script>
import StockService from '../services/Stocks';
export default {
    name: 'StockInfo',
    props: {
        stock: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            stockName: '',
        }
    },
    async mounted() {
        const name = await StockService.getNameFromSymbol(this.stock.symbol);
        console.log('StockName?: ', name);
        this.stockName = name;
    },
}
</script>

<style scoped>
.price-increase {
    color: #299e00;
}

.price-decrease {
    color: #BB0606;
}
</style>