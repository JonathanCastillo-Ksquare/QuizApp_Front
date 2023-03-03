import './style.css'
import FlippableCard from '../../components/FlippableCard'
import { categories } from '../../Mock'
import { useDataContext } from '../../context/dataContext'
import { useLocation, useNavigate } from 'react-router-dom';

const SettingsView = () => {

    const context = useDataContext();

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toQuestionsView = location.pathname && `/questionsView`;

    const handleOnClick = (e: any) => {

        if (categories.find((element) => element.category === e.target.parentNode.children[0].innerText)) {
            context.setCategory(e.target.parentNode.children[0].innerText)
            navigate(toQuestionsView, { replace: true })
        }

    }

    const categoriesCards = categories.map((element) => <FlippableCard key={element.category} category={element.category} description={element.description} />)
    return (
        <div className='WrapperCards'>
            <header className='HeaderSettings'>
                <div className='noth'></div>
                <h1>Who wants to be a certified developer?</h1>
                <div className='UserInfo'>
                    <div className="User">
                        <p className='UserName' >Mariana Mendoza</p>
                        <div className="Photo">
                            <i className='bx bx-user'></i>
                        </div>
                    </div>
                    <div className="Score">Score:{context.globalScore}</div>
                </div>
            </header>
            <div className='CardsContainer' onClick={handleOnClick}>
                {categoriesCards}
            </div>
        </div>
    )
}

export default SettingsView