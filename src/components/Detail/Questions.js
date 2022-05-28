import React, { useState, useEffect} from 'react';
import styles from './Questions.module.css';

// club 개별
function Questions({questions = {'questions_list' : []}, auth = false}) {
    const [isLoading, setLoading] = useState(false);
    const [ans, setAns] = useState();
    
    const handleInput = () =>{

    }
    useEffect(()=>{
        setLoading(true);
    },[isLoading])

    if (!auth){
        // 질문만 띄움
        return (
            <div  className={styles.ques_container}>
                <div>            
                {questions.question_text}                
                </div>
                <div className={styles.ques_ans}>
                    {questions.answers.answer_text}
                </div>
            </div>
            
        );
    }
    //답변 가능
    else {
        return (
            <div className={styles.ques_container}>
                <div>            
                {questions.question_text}                
                </div>
                <div className={styles.ques_ans}>
                    <textarea type="text" placeholder="여기에 답변해주세요." cols="60" rows="2" onChange={handleInput}/>
                </div>
            </div>
            
        );
    }
    
}

export default Questions;