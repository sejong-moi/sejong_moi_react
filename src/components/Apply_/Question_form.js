import React,{useState,useEffect} from 'react'
import styles from "./Question_form.module.css"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ShortTextIcon from '@material-ui/icons/ShortText';
import {BsTrash} from "react-icons/bs"
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SubjectIcon from '@material-ui/icons/Subject';

// ------------------------------------------

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';



function Question_form() {
    const [documentName, setDocumentName] = useState("Untitiled document");
    const [documentDescription, setDocumentDescription] = useState("Form description");
    const [questions,setQuestions] =useState([{
        "questionText": "write question",
        "questionType":"radio",
        "options" : [
            {"optionText" : "write"}
        ],
        "open":true,
        "required":false
    }]);   
    useEffect(()=>{

    },[]);
    function addMoreQuestionField(){
        expandCloseAll();   
        setQuestions(questions=> [...questions, {questionText: "Question", questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}]);
    }

    function addQuestionType(type,i){
      let qs = [...questions];  
      console.log(type)
      qs[i].questionType = type;      
      setQuestions(qs);      
    }
  
    function deleteQuestion(i){
      let qs = [...questions]; 
      if(questions.length > 1){
        qs.splice(i, 1);
      }
      setQuestions(qs)
    }
    
    function handleOptionValue(text,i, j){
      var optionsOfQuestion = [...questions];
      optionsOfQuestion[i].options[j].optionText = text;
      setQuestions(optionsOfQuestion);
    }  
    function changeQuestion(text,i){
        var newQues = [...questions];
        newQues[i].questionText = text;
        setQuestions(newQues);
        console.log(newQues);
    }
    function changeOptionValue(text,i,j){
        var optionsQuestion = [...questions];
        optionsQuestion[i].options[j].optionText = text;
        setQuestions(optionsQuestion);
    }
    function removeOption(i,j){
        var options = [...questions];
        if(options[i].options.length > 1){
            options[i].options.splice(j,1);
            setQuestions(options);
        }
    }
    function addOption(i){
        var optionsOfQuestion = [...questions];
        if(optionsOfQuestion[i].options.length < 5){
          optionsOfQuestion[i].options.push({optionText: "Option " + (optionsOfQuestion[i].options.length + 1)})
        } else{
          console.log("Max  5 options ");  
        }
        setQuestions(optionsOfQuestion)
      }
    
      function requiredQuestion(i){
        var requiredQuestion = [...questions];
        requiredQuestion[i].required =  ! requiredQuestion[i].required;        
        console.log( requiredQuestion[i].required+" "+i);
        setQuestions(requiredQuestion)
      }     
    
      function expandCloseAll(){
        let qs = [...questions]; 
         for (let j = 0; j < qs.length; j++) {  
          qs[j].open = false;
         }
         setQuestions(qs);
      }
    
    function QuestionsUI() {
        return(
            <div>    
            {questions.map((ques,i)=>(
                <Accordion key = {i} expanded={ques.open} className={ques.open ? styles.add_border : ""} >
                  <div className = {styles.question_boxes}>
                    <AccordionDetails className={styles.add_question}>
                        <div className={styles.add_question_top}>
                            <input type="text" className={styles.question} placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value, i)}} ></input>
                            <Select className={styles.select} style={{color:"#5f6368",fontSize:"13px"}} >                                 
                                <MenuItem id="text" value="Text"  onClick={()=>addQuestionType("text",i)}> <SubjectIcon style={{marginRight:"5px"}}/>  Paragraph</MenuItem>
                                <MenuItem id="checkbox"  value="Checkbox"  onClick={()=>addQuestionType("Checkbox",i)}><CheckBoxIcon style={{marginRight:"5px" ,color:"#70757a"}} checked/> Checkboxes</MenuItem>
                                <MenuItem id="radio" value="Radio"  onClick={()=>addQuestionType("radio",i)}> <Radio style={{marginRight:"5px",color:"#70757a"}} checked/> Multiple Choice</MenuItem>                                    
                            </Select>                                    
                        </div>
                        {ques.options.map((op,j)=>(
                            <div className={styles.add_question_body} key = {j}>
                                 {
                                    (ques.questionType!=="text") ? 
                                    <input type={ques.questionType}  style={{marginRight:"10px"}}/> :
                                    <ShortTextIcon style={{marginRight:"10px"}} />
                                  }
                                <div>
                                    {
                                        (ques.questionType==="text") ? 
                                        <input type="text" 
                                    className="text_input" 
                                    placeholder="option"  
                                    value={ques.options[j].optionText}
                                    
                                    onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                                    ></input>:
                                    <input type="text" 
                                    disabled= "true"
                                    className="text_input" 
                                    placeholder="option"
                                      
                                    value={ques.options[j].optionText}
                                    onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                                    ></input>
                                    }
                                    
                                </div>
                                    <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                                            <CloseIcon />
                                    </IconButton>
                            </div>
                        ))}
                        {ques.options.length < 5 ? (
                                <div className={styles.add_question_body}>
                                <FormControlLabel disabled control={ 
                                
                                (ques.questionType!=="text") ? 
                                <input type={ques.questionType}  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} style={{marginLeft:"10px",marginRight:"10px"}} disabled/> :
                                <ShortTextIcon style={{marginRight:"10px"}} />

                                } label={
                                <div>
                                    <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}>Add Option</Button>
                                </div>
                                } /> 
                                </div>

                                ): ""}
                        <div className={styles.add_footer}>
                            <div className={styles.add_question_bottom}>                          
                                    <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                                        <BsTrash />
                                    </IconButton>
                                    <span style={{color:"#5f6368",fontSize:"13px"}}>Required </span> 
                                    <Switch name="checkedA" color="primary" checked={ques.required} onChange={()=>{requiredQuestion(i)}}/>                                    
                                </div>
                        </div>
                    </AccordionDetails>
                    <div className={styles.question_edit}>
                        <AddCircleOutlineIcon onClick={addMoreQuestionField} className={styles.edit}/>
                              
                    </div>
                </div>
            </Accordion>              
            
            ))}   
        </div>);
    }
      
    return (
        <div >
            <div className={styles.question_form}>   
            <br></br>
                <div className={styles.section}>
                    <div className={styles.question_title_section}>
                        <div className={styles.question_form_top}>
                            <input type="text" className= {styles.question_form_top_name} style={{color:"black"}} placeholder={documentName} value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}}></input>
                            <input type="text" className={styles.question_form_top_desc} placeholder={documentDescription} value={documentDescription} onChange={(e)=>{setDocumentDescription(e.target.value)}} ></input>
                        </div>
                    </div> 
                    {QuestionsUI()}
                </div>
          
            </div>
        </div>)};

export default Question_form;