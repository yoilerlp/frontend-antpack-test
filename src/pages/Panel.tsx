import React, { useEffect, useState } from "react";
import { Container, Row, Spinner, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getToken, deleteToken } from "../util/token";
import { deleteUser, getUsers } from "../services/user";
import { User } from "../Model/User";
import { CreateUser } from "../components/CreateUser";
import { UpdateUserModal } from "../components/UpdateUser";

export default function Panel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = getToken();

    if (!token) navigate("/");
  });

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const deletUseFromrList = (id: string, user: User) => {
    // eslint-disable-next-line eqeqeq
    const listUsers = users.filter((u) => u.id != id);

    setUsers([...listUsers, user]);
  };

  const handlerDeleteUser = async (id: string) => {
    Swal.fire({
      title: `¿ Estas seguro que quieres eliminar el usuario ${id}`,
      showDenyButton: true,
      confirmButtonText: "Cancelar",
      denyButtonText: `Eliminar`,
    }).then((result) => {
      if (!result.isConfirmed) {
        deleteUser(id)
          .then(async (res) => {
            setUsers((prev) => {
              // eslint-disable-next-line eqeqeq
              return prev.filter((u) => u.id != id);
            });

            await Swal.fire(res.data.msg, "", "success");
          })
          .catch((e) => {
            Swal.fire(e.response.data.msg, "", "error");
          });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((error) => {
        let status = error.response.status;

        if (status === 403 || status === 401) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
          });

          navigate("/");
          deleteToken();
        }
      });
    setLoading(false);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        backgroundColor: "#05212A",
      }}
    >
      <Container style={{ marginTop: "1rem" }}>
        <Button
          onClick={() => {
            deleteToken();
            navigate("/");
          }}
          variant="outline-info"
        >
          Cerrar sesion
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <h2 style={{ color: "white" }}>Panel Admin</h2>
          <CreateUser addUser={addUser} />
        </div>
        <Row color={"white"}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner variant="primary" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                style={{ backgroundColor: "white", padding: "40px" }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>email</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>
                          {
                            <UpdateUserModal
                              user={user}
                              deletUseFromrList={deletUseFromrList}
                            />
                          }
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              handlerDeleteUser(String(user.id));
                            }}
                            variant="danger"
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
}
