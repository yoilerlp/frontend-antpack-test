import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { User } from "../Model/User";
import { UpdateUser } from "../services/user";
import Swal from "sweetalert2";

interface Props {
  user: User;
  deletUseFromrList: (id: string, user: User) => void;
}

export const UpdateUserModal = ({user, deletUseFromrList }: Props) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [lastname, setLastname] = useState(user.lastname);
  const [name, setName] = useState(user.name);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const NewUser: User = {
      id: user.id,
      email,
      lastname,
      name,
    };

    UpdateUser(String(user.id), NewUser)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data.msg,
        });

        deletUseFromrList(String(user.id), NewUser)
       
      })
      .catch((error) => {
        console.log(error.response);
        Swal.fire({
          icon: "error",
          title: error.response.data.msg || "Error actualizando usuario",
        });
      });
    setLoading(false);
    handleClose();
    console.log(NewUser);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario # {user.id} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  required
                  type="text"
                  placeholder="Nombre de usuario"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  name="lastname"
                  required
                  type="text"
                  placeholder="Apellidos"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Correo"
                disabled={true}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button disabled={loading} type="submit" variant="primary">
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
                  "Guardar"
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
