import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
<<<<<<< HEAD

const Email = () => {
=======
import { useNavigate } from 'react-router-dom'

const Email = () => {

    const navigate = useNavigate();

    const TakeToPassword = () => {
        navigate('/login/password');
    }
>>>>>>> ashehal
  return (
    <Form>
        <Form.Group className='mb-3' controlId='login-email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email'></Form.Control>
        </Form.Group>
        <Container className='d-grid p-0'>
<<<<<<< HEAD
            <Button type='submit' variant='primary' size='sm'></Button>
=======
            <Button type='submit' variant='primary' size='sm' onClick={TakeToPassword}>Submit</Button>
>>>>>>> ashehal
        </Container>
    </Form>

    )
}

export default Email