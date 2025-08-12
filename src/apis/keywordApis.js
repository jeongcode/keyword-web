import axios from 'axios';

export function getKeywordListApi(params) {
    const url = `http://localhost:9090/keyword/words`;
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
    const url = `http://localhost:9090/keyword/related/words`;
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
    const url = `http://localhost:9090/keyword/related/words/history`;
    return axios.get(url, { params: params })
        .then((response) => {
            return response.data;
        })
        .catch(error => (console.log(error)));
}

export function postKeywordApi(keyword) {
    const url = `http://localhost:9090/keyword/words`;
    return axios.post(url,keyword,{
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
      })
        .then((response) => {
            return response.data;
        })
        .catch(error => (console.log(error)));
}

export function putKeywordApi(keyword_id) {
    const url = `http://localhost:9090/keyword/words`;
    return axios.put(url, keyword_id, {
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
      })
        .then((response) => {
            return response.data;
        })
        .catch(error => (console.log(error)));
}