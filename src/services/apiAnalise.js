import axios from 'axios';

const getPending = async  () => {
    const response = await axios.get('https://5d7fbf6f99f8a20014cf8ef3.mockapi.io/api/v1/solicitacoes')
    
    return response;
}


export {getPending};