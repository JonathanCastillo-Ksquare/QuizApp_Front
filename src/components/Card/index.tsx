import './style.css'
import { useDataContext } from '../../context/dataContext'

type Props = {
    category: string
    description: string
}

const Card = ({ category, description }: Props) => {

    const context = useDataContext();

    const handleOnBackCardClick = (e: any) => {

        context.setDifficulty(e.target.innerText)
        console.log(e.currentTarget.currentTarget)

    }

    return (
        <div className='Card'>
            <div className='Card-front'>
                <header>{category}</header>
                <main>{description}</main>
            </div>
        </div>
    )
}

export default Card