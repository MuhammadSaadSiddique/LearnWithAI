<<<<<<< HEAD
import React from 'react'
=======
>>>>>>> ashehal
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './GetStarted.css'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className="full-screen background">
        <Container className='d-flex align-items-center justify-content-center fluid full-screen'>
            <Col xs={4}>
                <Row>
                    <h1 className='text-center text-light'>Learn With AI</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Group className='mb-3' controlId='sign-up-email'>
                            <Form.Label className='text-light'>Email address</Form.Label>
                            <Form.Control type='email'/>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='sign-up-password'>
                            <Form.Label className='text-light'>Password</Form.Label>
                            <Form.Control type='password' />
                        </Form.Group>
                        <Container className="d-grid m-0 p-0"><Button variant='primary' type='submit' size='sm'>Get Started!</Button></Container>
                    </Form>
                </Row>
                <Row>
                    <Row>
                        <Col className='text-center m-2 text-light'>Already have an account? <Link to="/login">Sign in.</Link></Col>
                    </Row>
                </Row>
            </Col>
        </Container>
    </div>
  )
}

export default GetStarted