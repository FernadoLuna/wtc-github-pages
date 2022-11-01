import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getOnePlace,
  updateOnePlace,
  getAlmacens,
} from "../../../api/ubicaciones";
import useAuth from "../../../hooks/useAuth";
import AlmacenesOptions from "../../comun/AlmacenesOptions";
export default function EditPlace(props) {
  const { reload, setReload, editPlace, setEditPlace } = props;
  const [currentInformation, setCurrentInformation] = useState(null);
  const [almacenesOptions, setAlmacenesOptions] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOnePlace(auth, editPlace);
      setCurrentInformation(response.data);

      const response2 = await getAlmacens(auth);
      setAlmacenesOptions(response2.data);
    })();
  }, [editPlace]);

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

    if (window.confirm("¿Seguro quieres actualizar la información?")) {
      const response = await updateOnePlace(auth, provider);
      setEditPlace(null);
    }

    setReload(!reload);
  };

  return (
    <div className="modal_info_client col-12">
      {currentInformation && almacenesOptions && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 mb-2">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentInformation.attributes.nombre}
                {...register("nombre", { required: true })}
              />
            </div>

            <div className="col-6 mb-2">
              <label className="form-label">Epc</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentInformation.attributes.epc}
                {...register("epc", { required: true })}
              />
            </div>

            <div className="col-12 mb-2">
              <label className="form-label">Almacen</label>
              <select
                className="form-control"
                defaultValue={currentInformation.attributes.epc}
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
              onClick={() => setEditPlace(null)}
              type="button"
              className="btn btn-danger col-2 m-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
