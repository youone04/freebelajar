
import {Card , ListGroup} from 'react-bootstrap';

const CardLayout = (props) => {
    return(
        <>
        <Card style={{ width: '18rem' }}>
            <Card.Header>{props.title}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>{props.list1}</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            </Card>
        </>
    )
}
export default CardLayout;