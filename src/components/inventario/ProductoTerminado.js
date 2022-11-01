import React, { useState, useEffect } from "react";
import { getProducts, deleteOneProduct } from "../../api/productos";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaMarker, FaTrashAlt, FaSafari } from "react-icons/fa";
import { map } from "lodash";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct";
import NewProduct from "./NewProduct";

export default function ProductoTerminado() {
  const [products, setProducts] = useState(null);
  const [selectNumberItems, setSelectNumberItems] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [editItem, setEditItem] = useState(null);
  const [reload, setReload] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getProducts(auth);
      setProducts(response.data);
    })();
  }, [reload]);

  const onDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este item?")) {
      const response = await deleteOneProduct(auth, id);
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
  };

  const DataPaginate = () => {
    if (products) {
      return products.slice(currentPage, currentPage + selectNumberItems);
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
      const result = products.filter((item) => {
        if (item.attributes.sku.indexOf(search) >= 0) {
          return item;
        } else return null;
      });
      setProducts(result);
    } else if (search.length <= 2) {
      setReload(!reload);
    }
  };

  const provedoresTable = DataPaginate();

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <button
          onClick={() => setNewItem(true)}
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
      {products ? (
        <div className="px-5 py-5">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">SKU</th>
                <th scope="col">DESCRIPCION</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">PROVEEDOR</th>
                <th scope="col">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {map(provedoresTable, (item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.attributes.sku}</td>
                    <td>
                      <div
                        className="overflow-hidden"
                        style={{ height: "50px" }}
                      >
                        {item.attributes.descripcion}
                      </div>
                    </td>
                    <td>{item.attributes.cantidad}</td>
                    <td>
                      {item.attributes.provedor.data
                        ? item.attributes.provedor.data.attributes.nombre
                        : "no hay provedor asociado"}
                    </td>
                    <td>
                      <ul className="list-icons">
                        <li onClick={() => onDelete(item.id)}>
                          <abbr title="eliminar">
                            <FaTrashAlt />
                          </abbr>
                        </li>
                        <li onClick={() => setEditItem(item.id)}>
                          <abbr title="editar">
                            <FaMarker />
                          </abbr>
                        </li>
                        <li onClick={() => setViewItem(item.id)}>
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
        <h3>No se puede visualizar esta información</h3>
      )}
      {editItem && (
        <EditProduct
          setEditItem={setEditItem}
          editItem={editItem}
          reload={reload}
          setReload={setReload}
        />
      )}
      {viewItem && (
        <ViewProduct
          reload={reload}
          setReload={setReload}
          setViewItem={setViewItem}
          viewItem={viewItem}
        />
      )}
      {newItem && (
        <NewProduct
          reload={reload}
          setReload={setReload}
          setNewItem={setNewItem}
        />
      )}
    </div>
  );
}
