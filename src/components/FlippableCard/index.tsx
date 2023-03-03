import './style.css'
import Card from '../Card'

type Props = {
    category: string
    description: string
}

const FlippableCard = ({ category, description }: Props) => {

    return (
        <div className='Flippable-card-container'>
            <Card category={category} description={description} />
        </div>
    )
}

export default FlippableCard