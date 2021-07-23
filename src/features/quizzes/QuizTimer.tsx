import React, {useState, useEffect} from 'react';

type QuizTimerProps = {
    // startTimer: boolean,
    updateQuestion: Function,
    seconds: number
}
export const QuizTimer: React.FC<QuizTimerProps> = ({ seconds, updateQuestion }) => {

    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
      // exit early when we reach 0 and timer is still set to on
      if (!timeLeft) {
          updateQuestion();
          return;
      }
  
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      
    }, [timeLeft, updateQuestion]);

    return (
        <>
            {
                timeLeft < 10 ? `0${timeLeft}`: timeLeft
            }
        </>
    )
}
