import React, { useState, useEffect} from 'react';
import styles from './Questions.module.css';
import {Answer_Question} from '../../api/api'
// club 개별
function Questions({questions = {'questions_list' : []}, auth = false, user_id=0}) {
    const [isLoading, setLoading] = useState(false);
    const [ans, setAns] = useState();
    const onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault();
            alert("버튼을 이용해주세요");
        }
      }
    const handleClick = (e) => {
        let data = {
            "question_id" : questions.id,
            "answer_text" : ans,
            "answerer" : user_id,
        }
        console.log(data);
        Answer_Question(data).then((res)=>
            console.log(res.data)
        )
    } 
    const handleInput = (e) =>{
        setAns(e.target.value);
    }
    useEffect(()=>{ 
        console.log(questions);
        setLoading(true);
    },[isLoading])

    if (!auth || questions.answers.answers === 1){
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
            <div className={styles.ques_container_}>
                <div>            
                {questions.question_text}                
                </div>
                <div className={styles.form_}>
                   
                        {
                            questions.answers.question_id === 0 ? 
                            <form  onKeyDown={onKeyDown}>
                                <div className={styles.ques_text}>
                                    <textarea type="text" placeholder="여기에 답변해주세요." className={styles.text} onChange={handleInput}/>
                                </div>
                                <button type="submit" className={styles.btn} onClick={handleClick} >답변하기</button>
                            </form>
                            :
                            <div className={styles.ques_ans}>
                             {questions.answers.answer_text}
                            </div>

                        }
                                           

                    
                </div>
                

            </div>
            
        );
    }
    
}

export default Questions;