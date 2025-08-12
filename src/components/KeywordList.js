import React from "react";
import styles from "./KeywordList.module.css";
import { putKeywordApi } from "../apis/keywordApis";

const KeywordList = (props) => {

  
  const deleteKeyword = async(keyword_id) => {
      let success = await putKeywordApi(keyword_id);
      props.getKeywordList()
  }

  return (
    <div className={styles.scrollable_container}>
        <ul className={styles.scrollable_list}>
        {
            props.kList?.map?.((item, index) => (
                <li key={index} 
                    className={styles.scrollable_item} 
                    onClick={() => {props.setKeyword(item.word)}}>
                {/* {item.id } */}
                {item.word}
                <button 
                    className={styles.removeBtn} 
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 > 상위 전파 막기
                      deleteKeyword(item.id)}}> X </button>
                </li>
            ))
        }
        </ul>
    </div>
  );
};

export default KeywordList;
