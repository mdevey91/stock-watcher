import Api from './Api';
import { apiKey } from '../constants';

function getCleanData(data) {
    const obj = {};
    Object.keys(data).forEach((key) => {
        obj[key.substring(4)] = data[key];
    });
    console.log('cleaned obj: ', obj)
    return obj;
}

 async function getTimeSeriesDaily(companySymbol) {
     const resp = await Api.get(`/query?function=TIME_SERIES_DAILY&symbol=${companySymbol}&interval=5min&apikey=${apiKey}`);
     console.log(resp)
     return resp.data;
 }

 async function getTimeSeriesIntraday(companySymbol) {
     const resp = await Api.get(`/query?function=TIME_SERIES_INTRADAY&symbol=${companySymbol}&interval=5min&apikey=${apiKey}`);
     console.log(resp)
     return resp.data;
 }

 async function getQuote(companySymbol) {
    const { data } = await Api.get(`/query?function=GLOBAL_QUOTE&symbol=${companySymbol}&interval=5min&apikey=${apiKey}`);
    return getCleanData(data['Global Quote']);
 }

 async function getInfoFromSymbol(companySymbol) {
     const resp = await Api.get(`/query?function=SYMBOL_SEARCH&keywords=${companySymbol}&apikey=${apiKey}`);
     console.log('getInfoFromSymbol', resp.data)
     return resp.data.bestMatches[0];
 }

 async function getNameFromSymbol(companySymbol) {
     const resp = await getInfoFromSymbol(companySymbol);
     console.log('getNameFromSymbol', resp);
     return resp['2. name'];
 }

 export default {
    getTimeSeriesDaily,
    getTimeSeriesIntraday,
    getQuote,
    getInfoFromSymbol,
    getNameFromSymbol,
 }