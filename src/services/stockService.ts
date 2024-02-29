import api from './api';

export default class StockService {
  async getStock(): Promise<any> {
    return api.get('/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo');
  }
}
