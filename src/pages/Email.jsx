import React from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Email = () => {
  return (
    <Form>
        <Form.Group className='mb-3' controlId='login-email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email'></Form.Control>
        </Form.Group>
        <Container className='d-grid p-0 m-0'>
            <Button type='submit' variant='primary' size='sm'>Login!</Button>
        </Container>
    </Form>

    )
}

export default Email