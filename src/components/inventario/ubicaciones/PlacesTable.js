import React, { useState, useEffect } from "react";
import { FaEye, FaMarker, FaTrashAlt } from "react-icons/fa";
import { getPlaces, deleteOnePlace } from "../../../api/ubicaciones";
import useAuth from "../../../hooks/useAuth";
import ViewPlace from "./ViewPlace";
import EditPlace from "./EditPlace";
import NewPlace from "./NewPlace";
import { map } from "lodash";
export default function PlacesTable() {
  const [places, setPlaces] = useState(null);
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [viewPlace, setViewPlace] = useState(null);
  const [editPlace, setEditPlace] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [reload, setReload] = useState(false);
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getPlaces(auth);
      if (response.data) {
        setPlaces(response.data);
      }
    })();
  }, [reload]);

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOnePlace(auth, id);
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
    if (places) {
      return places.slice(currentPage, currentPage + selectNumberItems);
    }
  };

  const nextPage = () => {
    setcurrentPage(currentPage + selectNumberItems);
  };

  const prevPage = () => {
    currentPage > 0 && setcurrentPage(currentPage - selectNumberItems);
  };

  const selectItems = (event) => {
    setcurrentPage(0);
    setSelectNumberItems(event.target.value);
    setReload(!reload);
  };

  const searchRegister = async (search) => {
    if (search.length >= 3) {
      const result = places.filter((item) => {
        if (item.attributes.nombre.indexOf(search) >= 0) {
          return item;
        } else return null;
      });
      setPlaces(result);
    } else if (search.length <= 2) {
      setReload(!reload);
    }
  };

  const provedoresTable = DataPaginate();

  return (
    <div className="col-10 offset-2">
      <div className="new_table">
        <div className="row mt-3">
          <div className="header_table">
            <button
              onClick={() => setNewPlace(true)}
              className="btn btn-primary col-3 "
            >
              Nueva ubicación
            </button>
            <input
              type="text"
              onChange={(e) => searchRegister(e.target.value)}
              placeholder="buscar"
              className="col-5 ml-5 mb-5"
            />
            <select
              name="select"
              className="col-2 ml-5 mb-5 "
              onChange={(event) => selectItems(event)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        {provedoresTable ? (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Epc</th>
                  <th scope="col">Almacen</th>
                  <th scope="col">Estado</th>
                  <th scope="col">C.P</th>
                  <th scope="col">Num_ext</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {map(provedoresTable, (item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.attributes.nombre}</td>
                    <td>{item.attributes.epc}</td>
                    {item.attributes.almacen.data ? (
                      <>
                        <td>
                          {item.attributes.almacen.data.attributes.nombre}
                        </td>
                        <td>
                          {item.attributes.almacen.data.attributes.estado}
                        </td>
                        <td>
                          {
                            item.attributes.almacen.data.attributes
                              .codigo_postal
                          }
                        </td>
                        <td>
                          {item.attributes.almacen.data.attributes.num_ext}
                        </td>
                      </>
                    ) : (
                      <>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </>
                    )}
                    <td>
                      <ul className="list-icons">
                        <li onClick={() => onDelete(item.id)}>
                          <abbr title="eliminar">
                            <FaTrashAlt />
                          </abbr>
                        </li>
                        <li onClick={() => setEditPlace(item.id)}>
                          <abbr title="editar">
                            <FaMarker />
                          </abbr>
                        </li>
                        <li onClick={() => setViewPlace(item.id)}>
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
            <div className="row ml-5">
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
          </div>
        ) : (
          <h2>no se puede visualizar esta información</h2>
        )}

        {newPlace && (
          <NewPlace
            newPlace={newPlace}
            setNewPlace={setNewPlace}
            reload={reload}
            setReload={setReload}
          />
        )}
        {viewPlace && (
          <ViewPlace viewPlace={viewPlace} setViewPlace={setViewPlace} />
        )}
        {editPlace && (
          <EditPlace
            editPlace={editPlace}
            setEditPlace={setEditPlace}
            reload={reload}
            setReload={setReload}
          />
        )}
      </div>
    </div>
  );
}
