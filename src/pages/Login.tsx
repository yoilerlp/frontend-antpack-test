import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";


import Swal from "sweetalert2";
import { loginUser } from '../services/login';
import { saveToken } from "../util/token";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true)

    try {
       const { data } = await loginUser({ email, password });
      
       const { data: { token,  }} = data
       console.log(token)

       if (!data.error) {
        await Swal.fire({
           icon: "success",
           title: "Logueado correctamente",
           text: data.msg,
         });

         saveToken(token)
         navigate("/panel");
       }

       console.log(data)
    } catch (error) {
      
         Swal.fire({
           icon: "error",
           title: "Usuario o contraseña incorrectos",
         });
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#05212A",
      }}
    >
      <Container>
        <Row color={"white"}>
          <Col lg={3}></Col>
          <Col
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "40px",
            }}
            lg={6}
          >
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log({ email: e.target.value });
                  }}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log({ password: e.target.value });
                  }}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button disabled={loading} variant="primary" type="submit">
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
