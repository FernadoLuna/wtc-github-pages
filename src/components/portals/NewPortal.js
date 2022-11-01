import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { newOnePortal } from "../../api/portals";
import { getAlmacens } from "../../api/ubicaciones";
import AlmacenenesOptions from "../comun/AlmacenesOptions";

export default function NewPortal(props) {
  const { reload, setReload, setNewItem } = props;
  const [almacens, setAlmacens] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getAlmacens(auth);
      response.data && setAlmacens(response.data);
    })();
  }, []);

  const onSubmit = async (data) => {
    for (var clave in data) {
      if (
        data[clave] === "" ||
        data[clave] === "null" ||
        data[clave] === null
      ) {
        delete data[clave];
      }
    }

    const response = await newOnePortal(auth, data);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    setReload(!reload);
    setNewItem(false);
  };

  return (
    <div className="modal_info_client col-12 px-5">
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
            <label className="form-label">Almacen</label>
            <select
              className="form-control"
              {...register("almacen", { required: true })}
            >
              <option value="null">Seleccionar almacen</option>
              {almacens && <AlmacenenesOptions data={almacens} />}
            </select>
          </div>

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
