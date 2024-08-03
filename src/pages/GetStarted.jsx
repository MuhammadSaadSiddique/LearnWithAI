import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap'
import Col from 'react-bootstrap'
import './GetStarted.css'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className='complete-screen-container'>
        <div></div>
        <div>
            <div className='container-sm title'>
                <h1>Learn With AI</h1>
            </div>
            <div className='container-sm'>
                <Form>
                    <Form.Group className='mb-3' controlId='sign-up-email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email'/>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' />
                    </Form.Group>
                    <div className="d-grid"><Button variant='primary' type='submit' size='sm'>Get Started!</Button></div>
                </Form>
            </div>
            <Container>
                <Row>
                    <Col>Already have an account? <Link to="/login">Sign in.</Link></Col>
                </Row>
            </Container>
        </div>
        <div></div>
    </div>
  )
}

export default GetStarted