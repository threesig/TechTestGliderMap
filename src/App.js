import React, { useState } from 'react';
import './App.css';
import Question1 from "./questions/Question1";
import Question2 from "./questions/Question2";
import Question3 from "./questions/Question3";
import {GliderProvider} from './contexts/GliderContext';

function App() {
  const questions = [
    'Question1',
    'Question2',
    'Question3',
  ]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const renderQuestion = () => {
    switch (currentQuestionIndex) {
      case 0:
        return (
          <Question1/>
        )
      case 1:
        return (
          <Question2/>
        )
      case 2:
        return (
          <GliderProvider>
            <Question3/>
          </GliderProvider>
        )
      default:
        return (
          <Question1/>
        )
    }
  }

  return (
    <div className="App">
      <div style={{margin: 20}}>
        {questions.map((question, index) => <button key={`q-${index}`} onClick={() => setCurrentQuestionIndex(index)}>{question}</button>)}
      </div>
      <div style={{justifyContent: 'center', alignItems: 'center'}}>
        {renderQuestion()}
      </div>
    </div>
  );
}

export default App;
