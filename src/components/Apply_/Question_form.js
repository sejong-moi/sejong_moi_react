import React,{useState,useEffect} from 'react'
import styles from "./Question_form.module.css"

import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import BackupIcon from '@material-ui/icons/Backup';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BsTrash} from "react-icons/bs"
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton } from '@material-ui/core';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import SubjectIcon from '@material-ui/icons/Subject';

// ------------------------------------------

import {Grid} from '@material-ui/core';
import {BsFileText} from "react-icons/bs"
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import {FcRightUp} from "react-icons/fc"
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import SaveIcon from '@material-ui/icons/Save';

import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { useParams } from "react-router";
import axios from "axios";


function Question_form() {
    const [documentName, setDocumentName] = useState("Untitiled document");
    const [documentDescription, setDocumentDescription] = useState("Form description");
    const [questions,setQuestions] =useState([{
        "questionText": "write question",
        "questionType":"text",
        "options" : [
            {"optionText" : "write"},
            {"optionText" : "write"}

        ],
        "open":true,
        "required":false
    }]);   
    function addMoreQuestionField(){
        expandCloseAll(); 
  
        setQuestions(questions=> [...questions, {questionText: "Question", questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}]);
    }

    function addQuestionType(i,type){
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
      //newMembersEmail[i]= email;
      setQuestions(optionsOfQuestion);
    }
  
    function handleQuestionValue(text, i){
      var optionsOfQuestion = [...questions];
      optionsOfQuestion[i].questionText = text;
      setQuestions(optionsOfQuestion);
    }
  
    function onDragEnd(result) {
        if (!result.destination) {
          return;
        }
        var itemgg = [...questions];
        const itemF = reorder(
          itemgg,
          result.source.index,
          result.destination.index
        );
        setQuestions(itemF);
    }
  
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    function showAsQuestion(i){
      let qs = [...questions];  
       qs[i].open = false;
       setQuestions(qs);
    }

    function addMoreQuestionField(){
        expandCloseAll(); //I AM GOD
  
        setQuestions(questions=> [...questions, {questionText: "Question", questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}]);
    }
    function changeQuestion(text,i){
        var newQues = [...questions];
        newQues[i].questionText = text;
        setQuestions(newQues);
        console.log(newQues);
    }
    function addQuestionType(type,i){
        var newQues = [...questions];
        newQues[i].questionType = type;
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
        //console.log(optionsOfQuestion);
        setQuestions(optionsOfQuestion)
      }
    
      function setOptionAnswer(ans,qno){
        var Questions = [...questions];
  
          Questions[qno].answer = ans;
        

        setQuestions(Questions)
        console.log(qno+" "+ans)
      }

      function setOptionPoints(points,qno){
        var Questions = [...questions];
  
          Questions[qno].points = points;
        

        setQuestions(Questions)
        console.log(qno+" "+points)
      }
      function addAnswer(i){
        var answerOfQuestion = [...questions];
        
          answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
        
        setQuestions(answerOfQuestion)
      }
    
      function doneAnswer(i){
        var answerOfQuestion = [...questions];
        
          answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
        
        setQuestions(answerOfQuestion)
      }

      function requiredQuestion(i){
        var requiredQuestion = [...questions];
      
          requiredQuestion[i].required =  ! requiredQuestion[i].required
        
        console.log( requiredQuestion[i].required+" "+i);
        setQuestions(requiredQuestion)
      }
    

      function removeOption(i, j){
        var optionsOfQuestion = [...questions];
        if(optionsOfQuestion[i].options.length > 1){
          optionsOfQuestion[i].options.splice(j, 1);
          setQuestions(optionsOfQuestion)
          console.log(i + "__" + j);
        }   
      }
    
      function expandCloseAll(){
        let qs = [...questions]; 
         for (let j = 0; j < qs.length; j++) {  
          qs[j].open = false;
         }
         setQuestions(qs);
      }
    
      function handleExpand(i){
        let qs = [...questions]; 
        for (let j = 0; j < qs.length; j++) {
          if(i ===j ){
            qs[i].open = true;
     
          } else{
            qs[j].open = false;
           }
        }
         setQuestions(qs);
      }

    
    function QuestionsUI() {
        return(
            <div>    
            {questions.map((ques,i)=>(
                <Accordion key = {i} expanded={ques.open} className={ques.open ? styles.add_border : ""} >
                {/* <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{width:'100%'}} >
                {ques.open ? (                
                    <div className={styles.saved_questions}>          
                        <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >{i+1}. {ques.questionText}</Typography>
                        {ques &&ques.options.map((op, j)=>(             
                        <div key={j} >
                            <div style={{display: 'flex'}}>
                                <FormControlLabel style={{marginLeft:"5px",marginBottom:"5px"}} disabled control={<input type={ques.questionType} color="primary" style={{marginRight: '3px', }} required={ques.type}/>} label={
                                    <Typography style={{fontFamily:' Roboto,Arial,sans-serif',
                                        fontSize:' 13px',
                                        fontWeight: '400',
                                        letterSpacing: '.2px',
                                        lineHeight: '20px',
                                        color: '#202124'}}>
                                    {op.optionText}
                                    </Typography>
                                } />
                            </div>                        
                        </div>                          
                        ))}  
                    </div>            
                ):"" }  
                </AccordionSummary> */}
                
                <div className = {styles.question_boxes}>
                    <AccordionDetails className={styles.add_question}>
                        <div className={styles.add_question_top}>
                            <input type="text" className={styles.question} placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value, i)}} ></input>
                            <Select className={styles.select} style={{color:"#5f6368",fontSize:"13px"}} >                                 
                                <MenuItem id="text" value="Text"  onClick={()=>addQuestionType("text",i)}> <SubjectIcon style={{marginRight:"10px"}}/>  Paragraph</MenuItem>
                                <MenuItem id="checkbox"  value="Checkbox"  onClick={()=>addQuestionType("Checkbox",i)}><CheckBoxIcon style={{marginRight:"10px" ,color:"#70757a"}} checked/> Checkboxes</MenuItem>
                                <MenuItem id="radio" value="Radio"  onClick={()=>addQuestionType("radio",i)}> <Radio style={{marginRight:"10px",color:"#70757a"}} checked/> Multiple Choice</MenuItem>                                    
                            </Select>                                    
                        </div>
                        {ques.options.map((op,j)=>(
                            <div className={styles.add_question_body} key = {j}>
                                 {/* <Checkbox  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled/> */}
                                 {
                                    (ques.questionType!=="text") ? 
                                    <input type={ques.questionType}  style={{marginRight:"10px"}}/> :
                                    <ShortTextIcon style={{marginRight:"10px"}} />
                                }
                                    <div >
                                        <input type="text" className="text_input" placeholder="option"  value={ques.options[j].optionText}onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}></input>
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