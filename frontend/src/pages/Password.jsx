import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Password = () => {
  return (
    <Form>
        <Form.Group className='mb-3 mt-3' controlId='pasword-email'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password'></Form.Control>
        </Form.Group>
        <Container className='d-grid p-0'>
            <Button type='submit' variant='primary' size='sm'>Login!</Button>
        </Container>
    </Form>

    )
}

export default Password