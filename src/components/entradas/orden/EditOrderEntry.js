import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import UsersOptions from "../../comun/UsersOptions";
import { map } from "lodash";
import OptionsGenerator from "../../comun/OptionsGenerator";
import ModalEditProduct from "./ModalEditProduct";
import { useForm } from "react-hook-form";
import {
  getOneOrderEntry,
  updateOneOrderEntry,
} from "../../../api/orders_entry";
import { getUsers } from "../../../api/user";
import { getProvedores } from "../../../api/provedores";
export default function EditOrderEntry(props) {
  const { reload, setReload, editItem, setEditItem } = props;
  const [currentInformation, setCurrentInformation] = useState(null);
  const [providersOptions, setProvidersOptions] = useState(null);
  const [usersOptions, setUsersOptions] = useState(null);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    (async () => {
      const response = await getOneOrderEntry(auth, editItem);
      if (response.data) {
        setCurrentInformation(response.data);
      }
      setProducts(response.data.attributes.products);
      const users = await getUsers(auth);
      if (users) {
        setUsersOptions(users);
      }

      const providers = await getProvedores(auth);
      if (providers.data) {
        setProvidersOptions(providers.data);
      }
    })();
  }, [editItem]);

  const onSubmit = async (data) => {
    data.products = products;

    for (var clave in data) {
      if (data[clave] === "" || data[clave] === "null") {
        delete data[clave];
      }
    }

    let dates = {
      id: currentInformation.id,
      arguments: data,
    };

    if (window.confirm("¿Seguro quieres actualizar la información?")) {
      const response = await updateOneOrderEntry(auth, dates);

      setEditItem(null);
    }

    setReload(!reload);
  };

  const getItem = (index) => {
    const result = products.filter((item) => {
      if (products.indexOf(item) === index) {
        return item;
      }
    });
    setEditProduct(result[0]);
  };

  return (
    <div className="modal_info_client col-12 px-5 ">
      {currentInformation ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 mb-2">
              <label className="form-label">Fecha fin</label>
              <input
                type="date"
                className="form-control"
                {...register("fecha_programada")}
                defaultValue={currentInformation.attributes.fecha_programada}
              />
            </div>
            {usersOptions && (
              <div className="col-12 mb-2">
                <label className="form-label">Usuario</label>
                <select className="form-control" {...register("user")}>
                  <option value="null">usuario</option>
                  <UsersOptions data={usersOptions} />
                </select>
              </div>
            )}
            {providersOptions && (
              <div className="col-6 mb-2">
                <label className="form-label">Provedor</label>
                <select className="form-control" {...register("provedor")}>
                  {currentInformation.attributes.provedor.data && (
                    <option
                      value={currentInformation.attributes.provedor.data.id}
                    >
                      {
                        currentInformation.attributes.provedor.data.attributes
                          .nombre
                      }
                    </option>
                  )}
                  <option value="null">provedor</option>
                  <OptionsGenerator data={providersOptions} />
                </select>
              </div>
            )}
            {products && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>sku</th>
                    <th>cantidad</th>
                    <th>registrados</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {map(products, (item) => (
                    <tr key={products.indexOf(item)}>
                      <td>{item.sku}</td>
                      <td>{item.quantity}</td>
                      <td>{item.registrados}</td>
                      <td>
                        <p
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#modalEditProduct"
                          onClick={() => getItem(products.indexOf(item))}
                        >
                          registrar entrada
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="col-12">
            <button
              className="btn btn-danger"
              onClick={() => setEditItem(null)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary ml-2" type="submit">
              Guardar
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2>No se puede visualizar esta información</h2>
          <button onClick={() => setEditItem(null)} className="btn btn-danger">
            Cancelar
          </button>
        </>
      )}
      {editProduct && (
        <ModalEditProduct
          products={products}
          setProducts={setProducts}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      )}
    </div>
  );
}
