import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { updateOneLigthTruck, getOneLigthTruck } from "../../api/lighttrucks";
export default function EditLigthTruck(props) {
  const { reload, setReload, editItem, setEditItem } = props;
  const [currentInformation, setCurrentInformation] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getOneLigthTruck(auth, editItem);
      response.data && setCurrentInformation(response.data);
    })();
  }, [editItem]);

  const onSubmit = async (data) => {
    const dataUpdate = {
      id: editItem,
      arguments: data,
    };
    const response = await updateOneLigthTruck(auth, dataUpdate);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    setReload(!reload);
    setEditItem(null);
  };

  return (
    <div className="modal_info_client col-12 px-5 py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {currentInformation && (
            <>
              <div className="col-6 mb-2">
                <label className="form-label">Nombre </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentInformation.attributes.nombre}
                  {...register("nombre", { required: true })}
                />
              </div>
              <div className="col-6 mb-2">
                <label className="form-label">Epc </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentInformation.attributes.epc}
                  {...register("epc", { required: true })}
                />
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary col-2 m-2">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setEditItem(null)}
            className="btn btn-danger col-2 m-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
