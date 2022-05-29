import React, {useState, useEffect} from "react"
function Quizz (){
   const [allQuestions, setAllQuestions] = React.useState([])
   const [question, setQuestion] = React.useState({
       category:"",
       question:"",
       correct_answer:""
   })
   useEffect(() =>{
    fetch("https://opentdb.com/api.php?amount=2")
     .then(res => res.json())
     .then(data => setAllQuestions(data.results))
    
   }, [])

   const questions = allQuestions.map(item =>{
       const arr = item.incorrect_answers
       const incorrectAnswerEl = arr.map(el =>{
           return(
               <p isCorrect= {false}>{el}</p>
           )
       })
       return (
           <div className="quizz--question__container">
            <h3>{item.question}</h3>
            <div className="answers">
             <p isCorrect={true}>{item.correct_answer}</p>
             {incorrectAnswerEl}
            </div>
            <hr></hr>
           </div>

       )
   })
   
   

    return(
        <div>
            <div className='lemon-circle'></div>
             {questions}
             
            <div className='blue-circle'></div>
            
        </div>
    )
}
export default Quizz