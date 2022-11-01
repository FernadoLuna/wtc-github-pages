import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { getClientes, deleteOneCliente } from "../../api/clientes";
import useAuth from "./../../hooks/useAuth";
import ClienteView from "./ClienteView";
import EditCliente from "./EditCliente";
import NewCliente from "./NewCliente";
import styles from "../../utils/styles.css";
import { FaEye, FaMarker, FaTrashAlt } from "react-icons/fa";
export default function ClientesTable() {
  const [clientes, setClientes] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [viewClient, setViewClient] = useState(false);
  const [editClient, setEditClient] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const { auth } = useAuth();
  const [reload, setreload] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await getClientes(auth);
      if (response.error) {
        setMensajeError("no se puede acceder a la información");
        return;
      }

      if (response.data) {
        setClientes(response.data);
      }
    })();
  }, [reload]);

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOneCliente(auth, id);
      if (response.error) {
        alert("no puedes eliminar este contenido");
      }

      if (response.data.id) {
        alert("se ha eliminado un item");
      }
    } else {
      console.log("no eliminado");
    }
    setreload(!reload);
  };

  const viewCliente = (id) => {
    setViewClient(id);
  };

  const editCliente = (id) => {
    setEditClient(id);
  };

  const searchClient = async (search) => {
    if (search.length >= 3) {
      const result = clientes.filter((cliente) => {
        if (cliente.attributes.nombre.indexOf(search) >= 0) {
          return cliente;
        } else return null;
      });
      setClientes(result);
    } else if (search.length <= 2) {
      setreload(!reload);
    }
  };

  const clientesPaginate = () => {
    if (clientes) {
      return clientes.slice(currentPage, currentPage + selectNumberItems);
    }
  };

  const nextPage = () => {
    setcurrentPage(currentPage + selectNumberItems);
  };

  const prevPage = () => {
    currentPage > 0 && setcurrentPage(currentPage - selectNumberItems);
  };

  const clientesTable = clientesPaginate();

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <button
          onClick={() => setNewClient(true)}
          type="button"
          className="btn btn-primary ml-5 mt-5 col-2"
        >
          Agregar Nuevo
        </button>

        <div className="col-4">
          <input
            type="text"
            className="form-control ml-2 mt-5"
            placeholder="buscar"
            onChange={(event) => searchClient(event.target.value)}
          />
        </div>
        <div className="col-4 mt-5">
          <select
            name="select"
            className="form-control"
            onChange={(event) => setSelectNumberItems(event.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      {clientes ? (
        <div className="px-5 py-5">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">RAZON SOCIAL</th>
                <th scope="col">ESTADO</th>
                <th scope="col">TELÉFONO</th>
                <th scope="col">CORREO</th>
                <th scope="col">NOMBRE CONTACTO</th>
                <th scope="col">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {map(clientesTable, (item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.attributes.nombre}</td>
                    <td>{item.attributes.razon_social}</td>
                    <td>{item.attributes.estados}</td>
                    <td>{item.attributes.telefono}</td>
                    <td>{item.attributes.correo}</td>
                    <td>{item.attributes.nombre_contacto}</td>

                    <td>
                      <ul className="list-icons">
                        <li onClick={() => onDelete(item.id)}>
                          <abbr title="eliminar">
                            <FaTrashAlt />
                          </abbr>
                        </li>
                        <li onClick={() => editCliente(item.id)}>
                          <abbr title="editar">
                            <FaMarker />
                          </abbr>
                        </li>
                        <li onClick={() => viewCliente(item.id)}>
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
      ) : reload === true ? (
        <h2>cargando</h2>
      ) : (
        <h2>{mensajeError}</h2>
      )}
      {viewClient && (
        <ClienteView setViewClient={setViewClient} viewClient={viewClient} />
      )}
      {editClient && (
        <EditCliente
          setEditClient={setEditClient}
          editClient={editClient}
          reload={reload}
          setreload={setreload}
        />
      )}
      {newClient && (
        <NewCliente
          setNewClient={setNewClient}
          reload={reload}
          setreload={setreload}
        />
      )}
    </div>
  );
}
