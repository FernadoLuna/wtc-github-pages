import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { getAlmacens } from "../../../api/ubicaciones";
import AlmacenesOptions from "../../comun/AlmacenesOptions";
import { newOnePlace } from "../../../api/ubicaciones";
export default function NewPlace(props) {
  const { newPlace, setNewPlace, reload, setReload } = props;
  const [almacenesOptions, setAlmacenesOptions] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getAlmacens(auth);
      setAlmacenesOptions(response.data);
    })();
  }, [newPlace]);

  const onSubmit = async (data) => {
    const response = await newOnePlace(auth, data);
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
      setNewPlace(false);
    }
  };

  return (
    <div className="modal_info_client col-12">
      <div className="row ">
        <div className="col-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6 mb-2">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("nombre", { required: true })}
                />
              </div>

              <div className="col-6 mb-2">
                <label className="form-label">Epc</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("epc", { required: true })}
                />
              </div>

              <div className="col-12 mb-2">
                <label className="form-label">Almacen</label>
                <select
                  className="form-control"
                  {...register("almacen", { required: true })}
                >
                  {almacenesOptions && (
                    <AlmacenesOptions data={almacenesOptions} />
                  )}
                </select>
              </div>
              <button type="submit" className="btn btn-primary col-2 m-2">
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setNewPlace(false)}
                className="btn btn-danger col-2 m-2"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
