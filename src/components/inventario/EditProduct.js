import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getOneProduct,
  getCategories,
  updateOneProduct,
} from "../../api/productos";
import { getProvedores } from "../../api/provedores";
import OptionsGenerator from "../comun/OptionsGenerator";
import useAuth from "../../hooks/useAuth";
export default function EditProduct(props) {
  const [providersOptions, setProvidersOptions] = useState(null);
  const [categoriesOptions, setCategoriesOptions] = useState(null);
  const [currentInformation, setCurrentInformation] = useState(null);
  const { reload, setReload, editItem, setEditItem } = props;
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getOneProduct(auth, editItem);
      setCurrentInformation(response.data);

      const providers = await getProvedores(auth);
      if (providers.data) {
        setProvidersOptions(providers.data);
      }

      const categories = await getCategories(auth);
      if (categories.data) {
        setCategoriesOptions(categories.data);
      }
    })();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    let provider = {
      id: currentInformation.id,
      arguments: data,
    };

    const response = await updateOneProduct(auth, provider);

    if (response.error) {
      alert(
        "no se han podido actualizar los datos, revisa tus permisos o intentalo mas tarde"
      );
    } else {
      alert("se han actualizado los datos");
      setReload(!reload);
      setEditItem(null);
    }
  };

  return (
    <div className="modal_info_client col-12 px-5">
      {currentInformation && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-4 mb-2">
              <label className="form-label">Sku</label>
              <input
                type="text"
                className="form-control"
                {...register("sku", { required: true })}
                defaultValue={currentInformation.attributes.sku}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                {...register("descripcion", { required: true })}
                defaultValue={currentInformation.attributes.descripcion}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Polica de Almacen</label>
              <input
                type="text"
                className="form-control"
                {...register("politica_almacen", { required: true })}
                defaultValue={currentInformation.attributes.politica_almacen}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Costo</label>
              <input
                type="text"
                className="form-control"
                {...register("costo", { required: true })}
                defaultValue={currentInformation.attributes.costo}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Provedor</label>
              <select
                type="text"
                className="form-control"
                {...register("provedor", { required: true })}
              >
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
                <OptionsGenerator data={providersOptions} />
              </select>
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Categoria</label>
              <select
                type="text"
                className="form-control"
                {...register("categoria", { required: true })}
              >
                {currentInformation.attributes.categoria.data && (
                  <option
                    value={currentInformation.attributes.categoria.data.id}
                  >
                    {
                      currentInformation.attributes.categoria.data.attributes
                        .nombre
                    }
                  </option>
                )}
                <OptionsGenerator data={categoriesOptions} />
              </select>
            </div>
          </div>
          <input type="submit" className="btn btn-primary" />
          <button
            onClick={() => setEditItem(null)}
            className="btn btn-danger m-1"
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}
