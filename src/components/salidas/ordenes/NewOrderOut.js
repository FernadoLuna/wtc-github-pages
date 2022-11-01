import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { API_URL } from "../../../utils/constants";
import { useForm } from "react-hook-form";
import OptionsGenerator from "../../comun/OptionsGenerator";
import UsersOptions from "../../comun/UsersOptions";
import { newOneOrderOut, updateOneFormatOut } from "../../../api/orders_out";
import { getClientes } from "../../../api/clientes";
import { getUsers } from "../../../api/user";

import { map } from "lodash";
export default function NewOrderEntry(props) {
  const { reload, setReload, setNewItem } = props;
  const { auth } = useAuth();
  const [clientsOptions, setClientsOptions] = useState(null);
  const [usersOptions, setUsersOptions] = useState(null);
  const [sku, setSku] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [products, setProducts] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getClientes(auth);
      if (response.data) {
        setClientsOptions(response.data);
      }

      const users = await getUsers(auth);
      if (users) {
        setUsersOptions(users);
      }
    })();
  }, []);

  const dateConvert = () => {
    const date = new Date().toISOString().slice(0, 10);
    var date1 = date.replace("-", "");

    return date1;
  };

  const onSubmit = async (data) => {
    if (products.length > 0) {
      data.productos = products;
    }

    for (var clave in data) {
      if (
        data[clave] === "" ||
        data[clave] === "null" ||
        data[clave] === null
      ) {
        delete data[clave];
      }
    }

    const response = await newOneOrderOut(auth, data);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    if (response.data.id) {
      const getFolio = `Os-${dateConvert()}-${response.data.id}`;

      const setFolio = await updateOneFormatOut(auth, {
        id: response.data.id,
        arguments: {
          folio: getFolio,
        },
      });

      if (setFolio.data) {
        alert("se ha registrado un nueva orden de salida");
      }

      setReload(!reload);
      setNewItem(false);
    }
  };

  const addProduct = () => {
    const temporalProducts = [...products];

    const newProduct = {
      sku: sku,
      quantity: quantity,
      registrados: 0,
    };

    temporalProducts.push(newProduct);
    setProducts(temporalProducts);
  };

  const deleteProduct = (index) => {
    const filtrados = products.filter(
      (item) => products.indexOf(item) != index
    );

    setProducts(filtrados);
  };

  return (
    <div className="modal_info_client col-12 px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-6 mb-2">
            <label className="form-label">Fecha de Programada</label>
            <input
              type="date"
              className="form-control"
              {...register("fecha_programada", { required: true })}
            />
          </div>

          {usersOptions && (
            <div className="col-6 mb-2">
              <label className="form-label">Usuario</label>
              <select className="form-control" {...register("user")}>
                <option value="null">seleccionar</option>
                <UsersOptions data={usersOptions} />
              </select>
            </div>
          )}

          {clientsOptions && (
            <div className="col-12 mb-2">
              <label className="form-label">Cliente</label>
              <select className="form-control" {...register("cliente")}>
                <option value="null">seleccionar</option>
                <OptionsGenerator data={clientsOptions} />
              </select>
            </div>
          )}

          <div className="col-12">
            <h5 className="my-2">Productos</h5>
            <div className="row">
              <div className="col-5 mr-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="sku"
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
              <div className="col-4 mr-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="cantidad"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="col-2 mr-2">
                <p className="btn btn-primary" onClick={() => addProduct()}>
                  agregar
                </p>
              </div>
            </div>
          </div>
          {products.length > 0 && (
            <div className="col-12 my-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>sku</th>
                    <th>cantidad</th>
                    <th>acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {map(products, (item) => (
                    <tr key={products.indexOf(item)}>
                      <td>
                        <i>{item.sku} </i>
                      </td>
                      <td>{item.quantity}</td>
                      <td onClick={() => deleteProduct(products.indexOf(item))}>
                        <p className="btn btn-danger">borrar</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button type="submit" className="btn btn-primary col-2 m-2">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setNewItem(false)}
            className="btn btn-danger col-2 m-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
