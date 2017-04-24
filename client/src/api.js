import axios from 'axios';

export const getAll = () => {
return axios('/api/adventures')
.then(resp => resp.data);	
};
