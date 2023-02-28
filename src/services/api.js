import axios from "axios";


//  rota para buscar a conversão do usd para brl - last/USD-BRL

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/'
});

export default api;