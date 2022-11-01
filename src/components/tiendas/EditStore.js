import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { updateOneStore } from "../../api/stores";

export default function EditStore(props) {
  const { reload, setReload, editItem, setEditItem } = props;

  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const sendData = {
      id: editItem.id,
      arguments: data,
    };
    for (var clave in data) {
      if (
        data[clave] === "" ||
        data[clave] === "null" ||
        data[clave] === null
      ) {
        delete data[clave];
      }
    }

    const response = await updateOneStore(auth, sendData);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    setReload(!reload);
    setEditItem(false);
  };

  return (
    <div className="modal_info_client col-12 px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 mb-2">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              defaultValue={editItem.attributes.nombre}
              {...register("nombre", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary col-4 m-2">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setEditItem(false)}
            className="btn btn-danger col-4 m-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
