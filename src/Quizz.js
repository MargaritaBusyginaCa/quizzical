import React, {useState, useEffect} from "react"
import {nanoid} from 'nanoid';
import './App.css';
function Quizz ({questions, setQuestions, startGame, setStartGame, setReload, setCount, count}){
    
    
    function selectAnswer(questionId, answerObject){
        let classes = ""
        /*If one of the elements that have different id from the passedf objects has 
        isSelected:true turn it to false. For the passed object, turn isSelected to true */
        for(let question of questions){
            if(question.id == questionId){
                for (let answer of question.answers){
                    if(answer.id!=answerObject.id && answer.isSelected == true){
                        answer.isSelected=false 
                    }
                    answerObject.isSelected = true  
                }
            }
            
        }    
    }
    const questionsDisplay = questions.map(q =>{
        return (
            <div className="question">
              <h2>{q.question}</h2>
              <div className="answers--container">
                <button onClick={() => selectAnswer(q.id, q.answers[0])}>{q.answers[0].value}</button>
                <button onClick={() => selectAnswer(q.id, q.answers[1])}>{q.answers[1].value}</button>
                <button onClick={() => selectAnswer(q.id, q.answers[2])}>{q.answers[2].value}</button>
                <button onClick={() => selectAnswer(q.id, q.answers[3])}>{q.answers[3].value}</button>
              </div>
              <hr/>
            </div>
        )
    })
    
    function calculateScore(){
        for(let question of questions){
            for (let answer of question.answers){
                if(answer.isSelected && answer.isCorrect){
                    setCount(prevCount => prevCount + 1)
                    console.log(startGame)
                }
            }
        }
        setStartGame(prevState => !prevState)
    }
    function startAgain(){
        setReload(prevState => !prevState)
        setStartGame(prevState => !prevState)
    }
    return(
        <div className="quiz-container">
            <div className='lemon-circle'></div>
            {questionsDisplay}
            <div className="finish-game--container">
              {!startGame ? <button className="finish--btn primary--button" onClick={calculateScore}>Submit Answers</button>
                         : <button className="finish--btn primary--button" onClick={startAgain}>Start Again</button>}
              {startGame && <h1>You scored: {count} / 6</h1>}
            </div>
            <div className='blue-circle'></div>
        </div>
    )
}
export default Quizz