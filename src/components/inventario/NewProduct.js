import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { getProvedores } from "../../api/provedores";
import CategoriasOptions from "../comun/CategoriasOptions";
import UmcOptions from "../comun/UmcOptions";
import UmtOptions from "../comun/UmtOptions";
import { newOneProduct, getCategories } from "../../api/productos";
import OptionsGenerator from "../comun/OptionsGenerator";
export default function NewProduct(props) {
  const { setReload, reload, setNewItem } = props;
  const [providersOptions, setProvidersOptions] = useState(null);
  const [categoriesOptions, setCategoriesOptions] = useState(null);
  const [activoFijo, setActivoFijo] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getProvedores(auth);
      setProvidersOptions(response.data);

      const responseCategories = await getCategories(auth);
      if (response.data) {
        setCategoriesOptions(responseCategories.data);
      }
    })();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    data.activo_fijo = activoFijo;

    const response = await newOneProduct(auth, data);
    console.log(response);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    if (response.data.id) {
      alert("se ha registrado un nuevo producto");
      setReload(!reload);
      setNewItem(false);
    }
  };

  return (
    <div className="modal_info_client col-12 px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4 mb-2">
            <label className="form-label">Sku</label>
            <input
              type="text"
              className="form-control"
              {...register("sku", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              {...register("descripcion", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Politica Almacen</label>
            <input
              type="text"
              className="form-control"
              {...register("politica_almacen", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Costo</label>
            <input
              type="text"
              className="form-control"
              {...register("costo", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Fraccion Alancelaria</label>
            <input
              type="text"
              className="form-control"
              {...register("fraccion_alancelaria", { required: true })}
            />
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">UMC</label>
            <select
              type="text"
              className="form-control"
              {...register("umc", { required: true })}
            >
              <UmcOptions />
            </select>
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">UMT</label>
            <select
              type="text"
              className="form-control"
              {...register("umt", { required: true })}
            >
              <UmtOptions />
            </select>
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">Tipo de material</label>
            <select
              type="text"
              className="form-control"
              {...register("tipo_material", { required: true })}
            >
              <option value="directo">Directo</option>
              <option value="indirecto">Indirecto</option>
            </select>
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">Categoria</label>
            <select
              type="text"
              className="form-control"
              {...register("categoria", { required: true })}
            >
              <CategoriasOptions data={categoriesOptions} />
            </select>
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">Provedor</label>
            <select
              type="text"
              className="form-control"
              {...register("provedor", { required: true })}
            >
              {providersOptions && <OptionsGenerator data={providersOptions} />}
            </select>
          </div>

          <div id="wrapper">
            <label htmlFor="yes_no_radio">¿Es activo fijo?</label>
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

          {activoFijo && (
            <>
              <div className="col-4 mb-2">
                <label className="form-label">Marca</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("marca", { required: true })}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("modelo", { required: true })}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Serie</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("serie", { required: true })}
                />
              </div>
            </>
          )}
        </div>
        <input type={"submit"} className="btn btn-primary mt-2" />
        <button
          onClick={() => setNewItem(null)}
          className="btn btn-danger ml-2 mt-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
