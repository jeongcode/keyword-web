import React, {useState, useEffect} from 'react';
import styles from "./RankList.module.css";
import { getRelatedKeywordsApi } from '../apis/keywordApis';

const RankList = ({curKeyword}) => {

    const [urlList, setUrlList] = useState([]);

    useEffect(() => {
        if (!curKeyword) return;

        // 컴포넌트 렌더링 시 최초 실행
        getRelatedKeywords(curKeyword);

        // 10분마다 getRelatedKeywords 호출하는 인터벌 설정
        const intervalId = setInterval(() => {
        getRelatedKeywords(curKeyword);
        }, 60000*10);

        // 언마운트 시 인터벌 정리
        return () => clearInterval(intervalId);

    }, [curKeyword])

    const getRelatedKeywords = async(curKeyword) => {
        let data = await getRelatedKeywordsApi(curKeyword);

        if (data){
            setUrlList(data);
        }
        
    }

    return (
        <div>
            <h2 className={styles.title}>"{curKeyword}" 관련어 Top 5</h2>
            <ul className={styles.list}>
            {
                urlList.map((url, index) => (
                    <li key={index} className={styles.item}>
                    <span className={styles.rankNumber}>
                        🔹
                    </span>
                    <span className={styles.name}>{url.keyword}</span>
                    <a href={url.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.score}>
                        관련 링크 바로가기
                    </a>
                    </li>
                ))
            }
            </ul>
        </div>
    );
};


export default RankList;