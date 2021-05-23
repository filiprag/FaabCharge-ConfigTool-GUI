import React, { useState, useEffect } from "react";
import { Form, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import Logo from "../../../img/users-solid.svg";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      window.location.replace("/AllComponents");
    } else {
      setLoading(false);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (username == "Admin") {
      
      document.getElementById("username").classList.remove("is-invalid");
      document.getElementById("username").classList.add("is-valid");

      if (password == "Admin") {
        document.getElementById("password").classList.remove("is-invalid");
        document.getElementById("password").classList.add("is-valid");

        localStorage.setItem("isAuth", username);
        history.push("/AllComponents");
      } else {
        document.getElementById("password").classList.add("is-invalid");
      }
    } else {
      document.getElementById("username").classList.add("is-invalid");
    }
  }

  return (
    <div className="p-5">
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="">
          <Col sm={12} md={6} lg={3} className="m-0 m-auto">
            <Card className="p-5 shadow">
              <Card.Img
                className="m-0 m-auto"
                src={Logo}
                style={{ width: "7vw" }}
              ></Card.Img>

              <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                <Card.Title>Login</Card.Title>
                <Form>
                  <div className="text-left">
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        id="username"
                        placeholder="Username..."
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid username!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        id="password"
                        type="password"
                        placeholder="Password..."
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid password!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    style={{ width: "40%" }}
                    variant="dark"
                  >
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
