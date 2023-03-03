import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css'
import { questions } from '../../Mock'
import { useDataContext } from '../../context/dataContext'

export const QuestionsView = () => {

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toSettingsView = location.pathname && `/settingsView`;

    // function randomDataPicker(arr: {}[], qtty: number) {
    //     const array: {}[] = []
    //     const noRepeatedArr: number[] = []
    //     for (let i = 0; i < qtty; i++) {
    //         const ran = Math.floor(Math.random() * arr.length);
    //         if (!noRepeatedArr.find((i) => i === ran)) {
    //             noRepeatedArr.push(ran)
    //         }
    //         else {
    //             i--
    //         }
    //     }

    //     noRepeatedArr.forEach((i) => array.push(arr[i]))

    //     return array
    // }

    function shuffleArray(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function randomElements(array: any, quantity: any) {
        return shuffleArray([...array]).slice(0, quantity);
    }


    // Bring all the context info into a variale
    const context = useDataContext();

    // To asign the amount of time of the timer
    const mins = 0;
    const secs = 5;

    // State variables
    const [actualQuestion, setActualQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [bttnsDisabled, setBttnsDisabled] = useState(false);
    const [minutes, setMinutes] = useState(mins);
    const [seconds, setSeconds] = useState(secs);
    const [questionsFiltered, setQuestionsFiltered] = useState<any>([])

    // useEffect to manage the interval API to create a timer
    useEffect(() => {

        let timer = setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setBttnsDisabled(true);
                    clearInterval(timer);
                    setActualQuestion(actualQuestion + 1);
                    setMinutes(mins);
                    setSeconds(secs);
                    setBttnsDisabled(false);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [minutes, seconds, actualQuestion])

    // useEffect to filter questions by category and level
    useEffect(() => {
        if (context.category === "") {
            navigate(toSettingsView, { replace: true })
        }
        // Filter first by category
        const filterQuestions = questions.filter((element) => element.category === context.category);

        // Questions filtered now need to be filtered by levels to pick some of each level
        const easyQuestions = filterQuestions.filter((element) => element.level === "easy");
        const mediumQuestions = filterQuestions.filter((element) => element.level === "medium");
        const hardQuestions = filterQuestions.filter((element) => element.level === "hard");

        // Take some questions of each level according to the instructions
        const randomEasy = randomElements(easyQuestions, 3);
        const randomMedium = randomElements(mediumQuestions, 4);
        const randomHard = randomElements(hardQuestions, 3);

        // Array to simulate the array of 10 object questions
        const questionsReadyToSet: {}[] = new Array(10).fill(null);

        // Set the questions in the order as required
        // 3 hard questions at the positions: 3, 6,10
        questionsReadyToSet[2] = randomHard[0]
        questionsReadyToSet[5] = randomHard[1]
        questionsReadyToSet[9] = randomHard[2]

        // 4 medium questions at the positions: 2, 5,8,9
        questionsReadyToSet[1] = randomMedium[0]
        questionsReadyToSet[4] = randomMedium[1]
        questionsReadyToSet[7] = randomMedium[2]
        questionsReadyToSet[8] = randomMedium[3]

        // 3 easy questions at the positions: 1,4,7
        questionsReadyToSet[0] = randomEasy[0]
        questionsReadyToSet[3] = randomEasy[1]
        questionsReadyToSet[6] = randomEasy[2]

        // Set the state variale of the array of questions to access in the whole
        setQuestionsFiltered(questionsReadyToSet)
    }, [context.category])

    // Handlers

    // Handler to selec answers
    const handleOnClick = (isCorrect: any, evt: any) => {
        if (isCorrect) {
            if (questionsFiltered[actualQuestion].level === "hard") {
                setScore(score + 300);
            }
            else if (questionsFiltered[actualQuestion].level === "medium") {
                setScore(score + 200)
            }
            else if (questionsFiltered[actualQuestion].level === "easy") {
                setScore(score + 100);
            }
        }

        setBttnsDisabled(true)

        evt.target.classList.add(isCorrect ? "CorrectAnswer" : "IncorrectAnswer");

        setTimeout(() => {
            setBttnsDisabled(false)

            if (actualQuestion !== questionsFiltered.length - 1) {
                evt.target.classList.remove(isCorrect ? "CorrectAnswer" : "IncorrectAnswer")
                setActualQuestion(actualQuestion + 1)
                setMinutes(mins)
                setSeconds(secs)
            }
            else {
                console.log(isEnd)
                setIsEnd(true)
                setMinutes(0)
                setSeconds(0)
                context.setGlobalScore((prev) => prev + score);

            }
        }, 1000)
    }

    if (isEnd) {
        if (score === 2000) {
            // const hard questionsFiltered
        }
        return (
            <main className='Over'>
                <div className='GameOver'>
                    <p>Yo earn {score} of 2000 Points</p>
                    <button onClick={() => navigate(toSettingsView, { replace: true })}>Home</button>
                </div>
            </main>
        )
    }

    const handleIconOnClick = () => {
        const incorrectAnswersArray = questionsFiltered[actualQuestion].options.filter((element: any) => element.isCorrect === false);
        const deletedAnswers: any[] = []
        const noRepeatedArr: number[] = []
        for (let i = 0; i < 2; i++) {
            const ran = Math.floor(Math.random() * incorrectAnswersArray.length);
            if (!noRepeatedArr.find((i) => i === ran)) {
                noRepeatedArr.push(ran)
            }
            else {
                i--
            }
        }

        noRepeatedArr.forEach((i) => deletedAnswers.push(incorrectAnswersArray[i]))
        const reducedAnswers = questionsFiltered[actualQuestion].options.filter((item: any) => !deletedAnswers.find((aux: any) => aux.option === item.option));

        questionsFiltered[actualQuestion].options = reducedAnswers;
    }

    const handleOnHomeIconClick = () => {
        setScore(0)
        navigate(toSettingsView, { replace: true })
    }

    const answersList = questionsFiltered[actualQuestion]?.options.map((answer: any) => <button className='Bttn' key={answer.option} onClick={(evt: any) => handleOnClick(answer.isCorrect, evt)} disabled={bttnsDisabled}>{answer.option}</button>)
    return (
        <div className='Wrapper'>
            <header className='HeaderSettingsQuestions'>
                <div className='nothQuestions'>
                    <i className='bx bxs-home' onClick={handleOnHomeIconClick}></i>
                </div>
                <h1>{context.category}</h1>
                <div className='UserInfoQuestions'>
                    <div className="UserQuestions">
                        <p className='UserNameQuestions' >Mariana Mendoza</p>
                        <div className="PhotoQuestions">
                            <i className='bx bx-user'></i>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className='QuestionTitle'>Question {actualQuestion + 1}/{questionsFiltered.length}</div>
                <div className='QuestionName'>{questionsFiltered[actualQuestion]?.title}</div>
                <div className='Answers'>
                    {answersList}
                </div>
            </main>
            <footer>
                <i className='bx bx-help-circle bx-md' onClick={handleIconOnClick}></i>
                <p>Time Remaining: 0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                <p>Score: {score}</p>
            </footer>
        </div>
    )
}

export default QuestionsView;