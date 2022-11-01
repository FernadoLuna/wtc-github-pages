import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { getProvedores } from "../../../api/provedores";
import OptionsGenerator from "../../comun/OptionsGenerator";
import { newOneContactProvider } from "../../../api/provedores";
export default function NewContactProvider(props) {
  const { setNew, reload, setReload } = props;
  const [providersOptions, setProvidersOptions] = useState(null);
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getProvedores(auth);
      setProvidersOptions(response.data);
    })();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await newOneContactProvider(auth, data);
    console.log(response);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    if (response.data.id) {
      alert("se ha registrado un nuevo contacto provedor");
      setReload(!reload);
      setNew(false);
    }
  };

  return (
    <div className="modal_info_client px-5 col-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4 mb-2">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              {...register("nombre", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Telefono</label>
            <input
              type="text"
              className="form-control"
              {...register("telefono", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Extension</label>
            <input
              type="text"
              className="form-control"
              {...register("extension", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Correo</label>
            <input
              type="text"
              className="form-control"
              {...register("correo", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Departamento</label>
            <input
              type="text"
              className="form-control"
              {...register("departamento", { required: true })}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Provedor</label>
            <select
              type="text"
              className="form-control"
              {...register("provedore", { required: true })}
            >
              {providersOptions && <OptionsGenerator data={providersOptions} />}
            </select>
          </div>
        </div>
        <input type={"submit"} className="btn btn-primary mt-2" />
        <button
          onClick={() => setNew(null)}
          className="btn btn-danger ml-2 mt-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
