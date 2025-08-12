import $ from 'jquery';
import React, {useEffect, useState} from 'react';

// import ChartComponent from '../components/ChartComponent';
import RelatedWordsHistory from '../components/RelatedWordsHistory';
import RankList from '../components/RankList';
import KeywordList from '../components/KeywordList';
import styles from "./KeywordMain.module.css";

import { 
    getKeywordListApi 
    , postKeywordApi
    , putKeywordApi 
} from '../apis/keywordApis';

const KeywordMain = () => {
    const [keywordList, setKeywordList] = useState([]);
    const [keyword, setKeyword] = useState(keywordList?keywordList[0]:null);


    const getKeywordList = async() => {
        let data = await getKeywordListApi();
        setKeywordList(data)
        setKeyword(data[0]['word'])
        return data;
    }

    useEffect(() => {
        try {
            getKeywordList();
        } catch {
        }
    }, [])

    const addKeyword = async (word) => {
        if(word.trim().length < 3 || keywordList.length  > 4 ){
            alert("세글자 이상 추가 가능. 키워드 5개만 추가 가능");
        }else{
            await postKeywordApi(word)
            await getKeywordList()
            // setKeywordList([...keywordList, word]);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftPane}>
                <input
                    id="newWord"
                    type="text"
                    placeholder='새로운 수집어 추가하기'
                />

                <button onClick= {() => {addKeyword($('#newWord').val())}}>
                추가
                </button>
                
                <KeywordList 
                    kList={keywordList}
                    setKeyword={setKeyword}
                    getKeywordList={getKeywordList}/>
            </div>
            <div className={styles.rightPane}>
                <RankList 
                    curKeyword={keyword}/>
                {/* <ChartComponent
                    curKeyword={keyword}/> */}
                <RelatedWordsHistory
                    curKeyword={keyword}/>
            </div>
        </div>
    );
}

export default KeywordMain;