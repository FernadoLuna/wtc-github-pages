import React, { useState, useEffect } from "react";
import { map } from "lodash";
import EditContact from "./EditContact";
import ViewContact from "./ViewContact";
import NewContact from "./NewContact";
import { getContactos } from "../../../api/contactos";
import { deleteOneContact } from "../../../api/contactos";
import styles from "../../../utils/styles.css";
import { FaEye, FaMarker, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
export default function ContactosTable() {
  const { auth } = useAuth();
  const [reload, setreload] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [viewContact, setViewContact] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [newContact, setNewContact] = useState(null);
  const [contactos, setContactos] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getContactos(auth);
      if (response.error) {
        setMensajeError("no se puede acceder a la información");
        return;
      }

      if (response.data) {
        setContactos(response.data);
      }
    })();
  }, [reload]);

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOneContact(auth, id);
      if (response.error) {
        alert("no puedes eliminar este contenido");
      }

      if (response.data.id) {
        alert("se ha eliminado un item");
      }
    } else {
      console.log("no eliminado");
    }
    setEditContact(null);
    setreload(!reload);
  };

  const viewContacto = (id) => {
    setViewContact(id);
  };

  const editContacto = (id) => {
    setEditContact(id);
  };

  const contactsPaginate = () => {
    if (contactos) {
      return contactos.slice(currentPage, currentPage + selectNumberItems);
    }
  };

  const nextPage = () => {
    setcurrentPage(currentPage + selectNumberItems);
  };

  const prevPage = () => {
    currentPage > 0 && setcurrentPage(currentPage - selectNumberItems);
  };

  const contactsTable = contactsPaginate();

  const searchContact = async (search) => {
    if (search.length >= 3) {
      const result = contactos.filter((contactos) => {
        if (contactos.attributes.nombre.indexOf(search) >= 0) {
          return contactos;
        } else return null;
      });
      setContactos(result);
    } else if (search.length <= 2) {
      setreload(!reload);
    }
  };

  return (
    <div className="col-10 offset-2">
      {contactos ? (
        <div className="px-5 ">
          <div className="row">
            <button
              onClick={() => setNewContact(true)}
              type="button"
              className="btn btn-primary ml-5 my-5  col-2"
            >
              Agregar Nuevo
            </button>

            <div className="col-4">
              <input
                type="text"
                className="form-control ml-2 mt-5"
                placeholder="buscar"
                onChange={(event) => searchContact(event.target.value)}
              />
            </div>
            <div className="col-4 mt-5">
              <select
                name="select"
                className="form-control"
                onChange={(event) => setSelectNumberItems(event.target.value)}
              >
                <option value={5}>5</option>
                <option value={3}>3</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Extensión</th>
                <th scope="col">Correo</th>
                <th scope="col">Departamento</th>
                <th scope="col">Cliente</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {map(contactsTable, (item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.attributes.nombre}</td>
                    <td>{item.attributes.telefono}</td>
                    <td>{item.attributes.extension}</td>
                    <td>{item.attributes.correo}</td>
                    <td>{item.attributes.departamento}</td>
                    <td>{item.attributes.clientes}</td>
                    <td>
                      <ul className="list-icons">
                        <li onClick={() => onDelete(item.id)}>
                          <abbr title="eliminar">
                            <FaTrashAlt />
                          </abbr>
                        </li>
                        <li onClick={() => editContacto(item.id)}>
                          <abbr title="editar">
                            <FaMarker />
                          </abbr>
                        </li>
                        <li onClick={() => viewContacto(item.id)}>
                          <abbr title="ver">
                            <FaEye />
                          </abbr>
                        </li>
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={prevPage}
            type="button"
            className="btn btn-primary ml-5 mt-5 col-2"
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            type="button"
            className="btn btn-primary ml-5 mt-5 col-2"
          >
            Siguiente
          </button>
        </div>
      ) : (
        <div>
          <h2>{mensajeError}</h2>
        </div>
      )}
      {editContact && (
        <EditContact
          setEditContact={setEditContact}
          editContact={editContact}
          reload={reload}
          setreload={setreload}
        />
      )}
      {viewContact && (
        <ViewContact
          setViewContact={setViewContact}
          viewContact={viewContact}
        />
      )}
      {newContact && (
        <NewContact
          setNewContact={setNewContact}
          reload={reload}
          setreload={setreload}
        />
      )}
    </div>
  );
}
