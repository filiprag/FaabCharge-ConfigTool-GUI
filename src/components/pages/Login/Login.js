import React, { useState } from "react";
import {Form, Button, Card, Col, Row, Container} from "react-bootstrap";
import Logo from '../../../img/users-solid.svg';
import swal from 'sweetalert'
import { Link, useHistory } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  function handleSubmit(e) {

    if(username == "Admin" && password == "Admin"){

      localStorage.setItem("isAuth", username)
      history.push('/AllComponents')
      
    } else {

      swal("Login failed", "Login failed, please try again", "error")
    }
  }

  return (
    <div className="p-5">
      <Row className="">
        <Col sm={12} md={6} lg={3} className="m-0 m-auto">
          <Card className="p-5 shadow">
            <Card.Img
              className="m-0 m-auto"
              src={Logo}
              style={{ width: "7vw" }}>
            </Card.Img>

            <Card.Body style={{ display: "flex", flexDirection: "column" }}>
              <Card.Title>Login</Card.Title>
              <Form>
                <div className='text-left'>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control  placeholder="Username..." onChange={e => setUsername(e.target.value)}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password..." onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                </div>
                <Form.Group>
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button type='submit' onClick={handleSubmit} style={{ width: "40%" }} variant="dark">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}