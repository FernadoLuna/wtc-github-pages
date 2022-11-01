import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { API_URL } from "../../../utils/constants";
import { useForm } from "react-hook-form";
import OptionsGenerator from "../../comun/OptionsGenerator";
import {
  newOneOrderEntry,
  updateOneOrderEntry,
} from "../../../api/orders_entry";
import { getProvedores } from "../../../api/provedores";
import axios from "axios";
import { map } from "lodash";
export default function NewOrderEntry(props) {
  const { reload, setReload, setNewItem } = props;
  const { auth } = useAuth();
  const [providersOptions, setProvidersOptions] = useState(null);
  const [activoFijo, setActivoFijo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
      const response = await getProvedores(auth);
      if (response.data) {
        setProvidersOptions(response.data);
      }
    })();
  }, []);

  const dateConvert = () => {
    const date = new Date().toISOString().slice(0, 10);
    var date1 = date.replace("-", "");

    return date1;
  };

  const onSubmit = async (data) => {
    if (selectedFile) {
      const data0 = new FormData();
      data0.append("files", selectedFile);

      const upload = await axios({
        method: "POST",
        url: `${API_URL}/api/upload`,
        data: data0,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (upload.data[0].id) {
        data.archivo_orden = upload.data[0].id;
      }
    }

    data.activo_fijo = activoFijo;

    if (products.length > 0) {
      data.products = products;
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

    const response = await newOneOrderEntry(auth, data);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    if (response.data.id) {
      const getFolio = `Oe-${dateConvert()}-${response.data.id}`;

      const setFolio = await updateOneOrderEntry(auth, {
        id: response.data.id,
        arguments: {
          folio: getFolio,
        },
      });

      if (setFolio.data) {
        alert("se ha registrado un nuevo formato de entrada");
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
          <div className="col-12 mb-2">
            <label className="form-label">Fecha de registro</label>
            <input
              type="date"
              className="form-control"
              {...register("fecha_programada", { required: true })}
            />
          </div>

          <div className="col-6 mb-2">
            <label className="form-label">¿Es activo fijo?</label>
            <p>
              <input
                type="radio"
                name="yes_no"
                onChange={(e) => setActivoFijo(true)}
              />
              Yes
            </p>
            <p>
              <input
                type="radio"
                name="yes_no"
                defaultChecked
                onChange={(e) => setActivoFijo(false)}
              />
              No
            </p>
          </div>

          <div className="col-6 mb-2">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>

          {providersOptions && (
            <div className="col-12 mb-2">
              <label className="form-label">Provedor</label>
              <select className="form-control" {...register("provedor")}>
                <option value="null">provedor</option>
                <OptionsGenerator data={providersOptions} />
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
