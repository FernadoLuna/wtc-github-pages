import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { map } from "lodash";
import {
  getProvidersContacts,
  deleteOneContactProvider,
} from "../../../api/provedores";
import { FaEye, FaMarker, FaTrashAlt } from "react-icons/fa";
import EditContactProvider from "./EditContactProvider";
import ViewContactProvider from "./ViewContactProvider";
import NewContactProvider from "./NewContactProvider";
export default function TableContactsProviders() {
  const [contacts, setContacts] = useState(null);
  const { auth } = useAuth();
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [Edit, setEdit] = useState(null);
  const [View, setView] = useState(null);
  const [New, setNew] = useState(null);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await getProvidersContacts(auth);
      setContacts(response.data);
    })();
  }, [reload]);

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOneContactProvider(auth, id);
      if (response.error) {
        alert("no puedes eliminar este contenido");
      }

      if (response.data.id) {
        alert("se ha eliminado un item");
      }
    } else {
      console.log("no eliminado");
    }
    setReload(!reload);
    console.log(id);
  };

  const DataPaginate = () => {
    if (contacts) {
      return contacts.slice(currentPage, currentPage + selectNumberItems);
    }
  };

  const nextPage = () => {
    setcurrentPage(currentPage + selectNumberItems);
  };

  const prevPage = () => {
    currentPage > 0 && setcurrentPage(currentPage - selectNumberItems);
  };

  const selectItems = (event) => {
    setSelectNumberItems(event.target.value);
    setReload(!reload);
  };

  const searchRegister = async (search) => {
    if (search.length >= 3) {
      const result = contacts.filter((cliente) => {
        if (cliente.attributes.nombre.indexOf(search) >= 0) {
          return cliente;
        } else return null;
      });
      setContacts(result);
    } else if (search.length <= 2) {
      setReload(!reload);
    }
  };

  const provedoresTable = DataPaginate();

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <button
          onClick={() => setNew(true)}
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
            onChange={(event) => searchRegister(event.target.value)}
          />
        </div>
        <div className="col-4 mt-5">
          <select
            name="select"
            className="form-control"
            onChange={(event) => selectItems(event)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      {contacts ? (
        <div className="px-5 py-5">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">TELÉFONO</th>
                <th scope="col">EXTENSION</th>
                <th scope="col">CORREO</th>
                <th scope="col">AREA</th>
                <th scope="col">PROVEEDOR</th>
                <th scope="col">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {map(provedoresTable, (item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.attributes.nombre}</td>
                  <td>{item.attributes.telefono}</td>
                  <td>{item.attributes.extension}</td>
                  <td>{item.attributes.correo}</td>
                  <td>{item.attributes.departamento}</td>
                  <td>
                    {item.attributes.provedore.data
                      ? item.attributes.provedore.data.attributes.nombre
                      : "no hay"}
                  </td>
                  <td>
                    <ul className="list-icons">
                      <li onClick={() => onDelete(item.id)}>
                        <abbr title="eliminar">
                          <FaTrashAlt />
                        </abbr>
                      </li>
                      <li onClick={() => setEdit(item.id)}>
                        <abbr title="editar">
                          <FaMarker />
                        </abbr>
                      </li>
                      <li onClick={() => setView(item.id)}>
                        <abbr title="ver">
                          <FaEye />
                        </abbr>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
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
        <h2>no se puede acceder a la información</h2>
      )}
      {Edit && (
        <EditContactProvider
          reload={reload}
          setReload={setReload}
          Edit={Edit}
          setEdit={setEdit}
        />
      )}

      {New && (
        <NewContactProvider
          reload={reload}
          setReload={setReload}
          setNew={setNew}
        />
      )}
      {View && (
        <ViewContactProvider
          reload={reload}
          setReload={setReload}
          setView={setView}
          View={View}
        />
      )}
    </div>
  );
}
