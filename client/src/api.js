import axios from 'axios';

export const getAllAdventures = () => {
return axios('/api/adventures')
.then(resp => resp.data);	
};

export const getAdventure = advID => {
return axios.get('api/adventures/${advID}')
.then(resp => resp.data);	
};

export const getAllItems = () => {
return axios('/api/items')
.then(resp => resp.data);	
};

export const updateItem = (_id, newItem) => {
return axios.put(('api/items/' + _id), {newItem})
.then(resp => resp.data);	
};

export const getCharacter = () => {
return axios.get('api/character/')
.then(resp => resp.data);	
};

export const updateChar = (_id, newChar) => {
return axios.put(('api/character/${_id}'), {newChar})
.then(resp => resp.data);	
}; 