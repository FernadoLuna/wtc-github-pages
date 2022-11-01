import React, { useState, useEffect } from "react";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import { deleteOnePortal, getPortals } from "../../api/portals";
import { FaEye, FaMarker, FaTrashAlt } from "react-icons/fa";
import NewPortal from "./NewPortal";
import EditPortal from "./EditPortal";
import ViewPortal from "./ViewPortal";
import { CSVLink, CSVDownload } from "react-csv";
export default function TablePortals() {
  const { auth } = useAuth();
  const [dataTable, setDataTable] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [reload, setReload] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getPortals(auth);
      if (response.data) {
        setDataTable(response.data);
      }
    })();
  }, [reload]);

  const DataPaginate = () => {
    if (dataTable) {
      return dataTable.slice(currentPage, currentPage + selectNumberItems);
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

  const searchRegister = (search) => {
    if (search.length >= 3) {
      const result = dataTable.filter((item) => {
        if (item.attributes.nombre.indexOf(search) >= 0) {
          return item;
        } else return null;
      });
      setDataTable(result);
    } else if (search.length <= 2) {
      setReload(!reload);
    }
  };

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOnePortal(auth, id);
      if (response.error) {
        alert("no puedes eliminar este contenido");
      }

      if (response.data.id) {
        alert("se ha eliminado un item");
      }
    }
    setReload(!reload);
  };

  const iterTable = DataPaginate();

  return (
    <div className="col-10 offset-2 table_boostrap px-5">
      {dataTable ? (
        <>
          <div className="row mt-5">
            <div className="header_table">
              <button
                onClick={() => setNewItem(true)}
                className="btn btn-primary col-3 "
              >
                Agregar nuevo
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
          <div className="row">
            <table className="table table-striped" id="test_table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {map(iterTable, (item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <th scope="row">{item.attributes.nombre}</th>
                    <th scope="row">
                      {item.attributes.almacen.data
                        ? item.attributes.almacen.data.attributes.nombre
                        : "no hay almacen asociado"}
                    </th>
                    <td>
                      <ul className="list-icons">
                        <li onClick={() => onDelete(item.id)}>
                          <abbr title="eliminar">
                            <FaTrashAlt />
                          </abbr>
                        </li>
                        <li onClick={() => setEditItem(item)}>
                          <abbr title="editar">
                            <FaMarker />
                          </abbr>
                        </li>
                        <li onClick={() => setViewItem(item)}>
                          <abbr title="eliminar">
                            <FaEye />
                          </abbr>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row ml5">
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
        </>
      ) : (
        <h2>No se puede obtener la información</h2>
      )}
      {newItem && (
        <NewPortal
          reload={reload}
          setReload={setReload}
          setNewItem={setNewItem}
        />
      )}
      {editItem && (
        <EditPortal
          editItem={editItem}
          setEditItem={setEditItem}
          reload={reload}
          setReload={setReload}
        />
      )}
      {viewItem && <ViewPortal viewItem={viewItem} setViewItem={setViewItem} />}
    </div>
  );
}
