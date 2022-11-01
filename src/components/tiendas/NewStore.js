import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { newOneStore } from "../../api/stores";

export default function NewStore(props) {
  const { reload, setReload, setNewItem } = props;

  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function generateToken(length) {
    let rand = () => Math.random(0).toString(36).substr(2);
    return (rand() + rand() + rand() + rand()).substr(0, length);
  }

  const onSubmit = async (data) => {
    data.token = generateToken(15);
    for (var clave in data) {
      if (
        data[clave] === "" ||
        data[clave] === "null" ||
        data[clave] === null
      ) {
        delete data[clave];
      }
    }

    const response = await newOneStore(auth, data);
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
          <div className="col-12 mb-2">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              {...register("nombre", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary col-4 m-2">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setNewItem(false)}
            className="btn btn-danger col-4 m-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
