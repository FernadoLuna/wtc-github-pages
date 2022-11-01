import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { getOneOrderOut, updateOneFormatOut } from "../../../api/orders_out";
import { getUsers } from "../../../api/user";
import { getClientes } from "../../../api/clientes";
import UsersOptions from "../../comun/UsersOptions";
import OptionsGenerator from "../../comun/OptionsGenerator";
import ModalEditProduct from "../../entradas/orden/ModalEditProduct";
import { map } from "lodash";
export default function EditOrderOut(props) {
  const { setEditItem, editItem, reload, setReload } = props;
  const [currentInformation, setCurrentInformation] = useState(null);
  const [products, setProducts] = useState([]);
  const [clientsOptions, setClientsOptions] = useState(null);
  const [usersOptions, setUsersOptions] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    data.productos = products;

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
      const response = await updateOneFormatOut(auth, dates);

      setEditItem(null);
    }

    setReload(!reload);
  };

  useEffect(() => {
    (async () => {
      const response = await getOneOrderOut(auth, editItem);
      if (response.data) {
        setCurrentInformation(response.data);
      }
      setProducts(response.data.attributes.productos);
      const users = await getUsers(auth);
      if (users) {
        setUsersOptions(users);
      }

      const clientes = await getClientes(auth);
      if (clientes.data) {
        setClientsOptions(clientes.data);
      }
    })();
  }, [editItem]);

  const getItem = (index) => {
    const result = products.filter((item) => {
      if (products.indexOf(item) === index) {
        return item;
      }
    });
    setEditProduct(result[0]);
  };

  return (
    <div className="modal_info_client col-12 px-5">
      {currentInformation ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 mb-2">
              <label className="form-label">Fecha de Programada</label>
              <input
                type="date"
                className="form-control"
                defaultValue={currentInformation.attributes.fecha_programada}
                {...register("fecha_programada", { required: true })}
              />
            </div>

            {usersOptions && (
              <div className="col-6 mb-2">
                <label className="form-label">Usuario</label>
                <select className="form-control" {...register("user")}>
                  {currentInformation.attributes.user.data && (
                    <option value={currentInformation.attributes.user.data.id}>
                      {
                        currentInformation.attributes.user.data.attributes
                          .username
                      }
                    </option>
                  )}
                  <option value="null">seleccionar</option>
                  <UsersOptions data={usersOptions} />
                </select>
              </div>
            )}

            {clientsOptions && (
              <div className="col-12 mb-2">
                <label className="form-label">Cliente</label>
                <select className="form-control" {...register("cliente")}>
                  {currentInformation.attributes.cliente.data && (
                    <option
                      value={currentInformation.attributes.cliente.data.id}
                    >
                      {
                        currentInformation.attributes.cliente.data.attributes
                          .nombre
                      }
                    </option>
                  )}
                  <option value="null">seleccionar</option>
                  <OptionsGenerator data={clientsOptions} />
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

            <button type="submit" className="btn btn-primary col-2 m-2">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditItem(false)}
              className="btn btn-danger col-2 m-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <h2>no se puede obtener información</h2>
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
