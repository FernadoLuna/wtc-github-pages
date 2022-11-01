import React, { useState, useEffect } from "react";
import { getFormats, deleteOneFormatEntry } from "../../../api/formats_entry";
import useAuth from "../../../hooks/useAuth";
import NewFormat from "./NewFormat";
import ViewFormat from "./ViewFormat";
import EditFormat from "./EditFormat";
import CheckFormat from "./CheckFormat";
import NewReubicate from "./NewReubicate";
import {
  FaEye,
  FaMarker,
  FaTrashAlt,
  FaRegThumbsUp,
  FaCrosshairs,
} from "react-icons/fa";
import { map } from "lodash";
import PrintEntry from "../../comun/printPdf/PrintEntry";
export default function FormatTable() {
  const { auth } = useAuth();
  const [formats, setFormats] = useState(null);
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [editFormat, setEditFormat] = useState(null);
  const [viewFormat, setViewFormat] = useState(null);
  const [newFormat, setNewFormat] = useState(null);
  const [checkFormat, setCheckFormat] = useState(null);
  const [reubicate, setReubicate] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getFormats(auth);
      if (response.data) {
        setFormats(response.data);
      }
    })();
  }, [reload]);

  const DataPaginate = () => {
    if (formats) {
      return formats.slice(currentPage, currentPage + selectNumberItems);
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
      const result = formats.filter((item) => {
        if (item.attributes.folio.indexOf(search) >= 0) {
          return item;
        } else return null;
      });
      setFormats(result);
    } else if (search.length <= 2) {
      setReload(!reload);
    }
  };

  const iterTable = DataPaginate();

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOneFormatEntry(auth, id);
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

  return (
    <div className="col-10 offset-2 table_boostrap">
      <div className="new_table mt-5">
        <div className="row mt-3">
          <div className="header_table">
            <button
              onClick={() => setNewFormat(true)}
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
        {iterTable ? (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Folio</th>
                  <th scope="col">Fecha registro</th>
                  <th scope="col">Provedor</th>
                  <th scope="col">BOL</th>
                  <th scope="col">Linea Transportista</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {map(iterTable, (item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.attributes.folio}</td>
                    <td>{item.attributes.fecha_registro}</td>
                    <td>
                      {item.attributes.provedor.data
                        ? item.attributes.provedor.data.attributes.nombre
                        : "no hay provedor asociado"}
                    </td>
                    <td>{item.attributes.bol}</td>
                    <td>{item.attributes.linea_transportista}</td>
                    <td>
                      <ul className="list-icons">
                        <li onClick={() => onDelete(item.id)}>
                          <abbr title="eliminar">
                            <FaTrashAlt />
                          </abbr>
                        </li>
                        <li onClick={() => setEditFormat(item.id)}>
                          <abbr title="editar">
                            <FaMarker />
                          </abbr>
                        </li>
                        <li onClick={() => setViewFormat(item.id)}>
                          <abbr title="ver">
                            <FaEye />
                          </abbr>
                        </li>
                        {!item.attributes.portal.data && (
                          <li onClick={() => setCheckFormat(item.id)}>
                            <abbr title="checar">
                              <FaRegThumbsUp />
                            </abbr>
                          </li>
                        )}
                        {!item.attributes.reubicacione.data && (
                          <li
                            onClick={() => setReubicate(item.id)}
                            data-toggle="modal"
                            data-target="#modalNewReubicate"
                          >
                            <abbr title="reubicar">
                              <FaCrosshairs />
                            </abbr>
                          </li>
                        )}
                        <li>
                          <abbr title="Imprimir">
                            <PrintEntry data={item} />
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

        {reubicate && (
          <NewReubicate
            reload={reload}
            setReload={setReload}
            reubicate={reubicate}
            setReubicate={setReubicate}
          />
        )}

        {newFormat && (
          <NewFormat
            newFormat={newFormat}
            setNewFormat={setNewFormat}
            reload={reload}
            setReload={setReload}
          />
        )}

        {viewFormat && (
          <ViewFormat viewFormat={viewFormat} setViewFormat={setViewFormat} />
        )}

        {editFormat && (
          <EditFormat
            editFormat={editFormat}
            setEditFormat={setEditFormat}
            reload={reload}
            setReload={setReload}
          />
        )}

        {checkFormat && (
          <CheckFormat
            reload={reload}
            setReload={setReload}
            setCheckFormat={setCheckFormat}
            checkFormat={checkFormat}
          />
        )}
      </div>
    </div>
  );
}
