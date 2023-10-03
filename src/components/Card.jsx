import Card from 'react-bootstrap/Card';


const CardContainer = ({pelicula}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
            <Card.Body>
                <Card.Title>{pelicula.title}</Card.Title>
                <Card.Text>{pelicula.overview}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardContainer
