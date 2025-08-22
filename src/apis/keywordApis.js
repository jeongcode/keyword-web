import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function getKeywordListApi(params) {
    const url = `${apiUrl}/keyword/words`;
    return axios.get(url, params)
        .then((response) => {
            return response.data
        })
        .catch(error => (console.log(error)));
}

export function getRelatedKeywordsApi(curKeyword) {
    const params = {
        keyword : curKeyword
    }
    const url = `${apiUrl}/keyword/related/words`;
    return axios.get(url, { params: params })
        .then((response) => {
            return response.data.urls;
        })
        .catch(error => (console.log(error)));
}

export function getRelatedKeywordsHistoryApi(curKeyword) {
    const params = {
        keyword : curKeyword
    }
    const url = `${apiUrl}/keyword/related/words/history`;
    return axios.get(url, { params: params })
        .then((response) => {
            return response.data;
        })
        .catch(error => (console.log(error)));
}

export function postKeywordApi(keyword) {
    const url = `${apiUrl}/keyword/words`;
    return axios.post(url,keyword,{
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
      })
        .then((response) => {
            return response.data;
        })
        .catch(error => (console.log(error)));
}

export function putKeywordApi(keyword_id) {
    const url = `${apiUrl}/keyword/words`;
    return axios.put(url, keyword_id, {
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
      })
        .then((response) => {
            return response.data;
        })
        .catch(error => (console.log(error)));
}