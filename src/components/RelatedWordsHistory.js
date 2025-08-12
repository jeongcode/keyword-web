import React, {useState, useEffect}from 'react';
import styles from "./RelatedWordsHistory.module.css";
import { getRelatedKeywordsHistoryApi } from '../apis/keywordApis';

const RelatedWordsHistory = ({curKeyword}) => {

  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
      if (!curKeyword) return;

      // 컴포넌트 렌더링 시 최초 실행
      getRelatedKeywordsHistory(curKeyword);

      // 10분마다 getRelatedKeywords 호출하는 인터벌 설정
      const intervalId = setInterval(() => {
        getRelatedKeywordsHistory(curKeyword);
      }, 60000*10);

      // 언마운트 시 인터벌 정리
      return () => clearInterval(intervalId);

  }, [curKeyword])

  const getRelatedKeywordsHistory = async(curKeyword) => {
      let data = await getRelatedKeywordsHistoryApi(curKeyword);
      if(data){
        setHistoryList(data);
      }
  }

    return (
      <>  
        <h2>"{curKeyword}" 관련어 변경 이력</h2>
        <div className={styles.container}>
            <ul className={styles.list}>
            {
                historyList.map((item, index) => (
                    <li key={index} className={styles.item}>
                      <span>
                        {JSON.parse(item.relationUrls).keywords}
                      </span>
                      
                      <span>{item.insert_timestamp}</span>
                    </li>
                ))
            }
            </ul>
        </div>
      </>
      );
}

export default RelatedWordsHistory;