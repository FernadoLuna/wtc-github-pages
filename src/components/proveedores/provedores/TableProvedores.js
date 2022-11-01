import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import ViewProdiver from "./ViewProdiver";
import EditProvider from "./EditProvider";
import NewProvider from "./NewProvider";
import { getProvedores, deleteOneProvider } from "../../../api/provedores";
import { map } from "lodash";
import { FaEye, FaMarker, FaTrashAlt } from "react-icons/fa";
export default function TableProvedores() {
  const [provedores, setProvedores] = useState(null);
  const { auth } = useAuth();
  const [reload, setReload] = useState(false);
  const [mensajeError, setMensajeError] = useState("nada");
  const [viewProvider, setViewProvider] = useState(null);
  const [editProvider, setEditProvider] = useState(null);
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [newProvider, setNewProvider] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await getProvedores(auth);
      if (response.error) {
        setMensajeError("no se puede acceder a la información");
        return;
      }

      if (response.data) {
        setProvedores(response.data);
      }
    })();
  }, [reload]);

  const searchRegister = async (search) => {
    if (search.length >= 3) {
      const result = provedores.filter((cliente) => {
        if (cliente.attributes.nombre.indexOf(search) >= 0) {
          return cliente;
        } else return null;
      });
      setProvedores(result);
    } else if (search.length <= 2) {
      setReload(!reload);
    }
  };

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOneProvider(auth, id);
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

  const verProvider = (id) => {
    setViewProvider(id);
  };

  const provedoresPaginate = () => {
    if (provedores) {
      return provedores.slice(currentPage, currentPage + selectNumberItems);
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

  const provedoresTable = provedoresPaginate();

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <button
          onClick={() => setNewProvider(true)}
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
      {provedores ? (
        <div className="px-5 py-5">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">RAZON SOCIAL</th>
                <th scope="col">ESTADO</th>
                <th scope="col">TELÉFONO</th>
                <th scope="col">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {map(provedoresTable, (item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.attributes.nombre}</td>
                  <td>{item.attributes.razon_social}</td>
                  <td>{item.attributes.estado}</td>
                  <td>{item.attributes.telefono}</td>

                  <td>
                    <ul className="list-icons">
                      <li onClick={() => onDelete(item.id)}>
                        <abbr title="eliminar">
                          <FaTrashAlt />
                        </abbr>
                      </li>
                      <li onClick={() => setEditProvider(item.id)}>
                        <abbr title="editar">
                          <FaMarker />
                        </abbr>
                      </li>
                      <li onClick={() => verProvider(item.id)}>
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
          {viewProvider && (
            <ViewProdiver
              setViewProvider={setViewProvider}
              viewProvider={viewProvider}
            />
          )}
          {editProvider && (
            <EditProvider
              setEditProvider={setEditProvider}
              editProvider={editProvider}
              setReload={setReload}
              reload={reload}
            />
          )}
          {newProvider && (
            <NewProvider
              setReload={setReload}
              reload={reload}
              setNewProvider={setNewProvider}
            />
          )}
        </div>
      ) : (
        <h2>{mensajeError}</h2>
      )}
    </div>
  );
}
