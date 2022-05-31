import React, {useState, useEffect} from "react"
import {nanoid} from 'nanoid';
function Quizz ({questions, setQuestions, startGame, setStartGame}){
    const [count, setCount] = useState(0)
    function selectAnswer(questionId, answerObject){
        /*If one of the elements that have different id from the passedf objects has 
        isSelected:true turn it to false. For the passed object, turn isSelected to true */
        for(let question of questions){
            if(question.id == questionId){
                for (let answer of question.answers){
                    if(answer.id!=answerObject.id && answer.isSelected == true){
                        answer.isSelected=false
                    }
                    answerObject.isSelected = true
                    console.log(answer)
                }
            }
            
        }    
       
    }
    const questionsDisplay = questions.map(q =>{
        return (
            <div>
              <h2>{q.question}</h2>
              <div>
                <button onClick={() => selectAnswer(q.id, q.answers[0])}>{q.answers[0].value}</button>
                <button onClick={() => selectAnswer(q.id, q.answers[1])}>{q.answers[1].value}</button>
                <button onClick={() => selectAnswer(q.id, q.answers[2])}>{q.answers[2].value}</button>
                <button onClick={() => selectAnswer(q.id, q.answers[3])}>{q.answers[3].value}</button>
              </div>
            </div>
        )
    })
    
    function calculateScore(){
        for(let question of questions){
            for (let answer of question.answers){
                if(answer.isSelected && answer.isCorrect){
                    setCount(prevCount => prevCount + 1)
                }
            }
        }
        setStartGame(prevState => !prevState)
    }
    return(
        <div>
            {questionsDisplay}
            <div className="finish-game--container">
              {!startGame ? <button className="finish--btn" onClick={calculateScore}>Submit Answers</button>
                         : <button className="finish--btn">Start Again</button>}
              {startGame && <h1>You scored: {count} / 6</h1>}
            </div>
            
            
        </div>
    )
}
export default Quizz