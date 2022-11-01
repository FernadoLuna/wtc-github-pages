import React, { useState, useEffect } from "react";
import { getOneCategory, updateOneCategory } from "../../api/categories";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
export default function EditItem(props) {
  const { reload, setReload, setEditItem, editItem } = props;
  const { auth } = useAuth();
  const [currentInformation, setCurrentInformation] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getOneCategory(auth, editItem);
      if (response.data) {
        setCurrentInformation(response.data);
      }
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

    const object = {
      id: editItem,
      attributes: data,
    };

    const response = await updateOneCategory(auth, object);
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
    <div className="modal_info_client col-12 px-5">
      {currentInformation && (
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
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                defaultValue={currentInformation.attributes.descripcion}
                {...register("descripcion", { required: true })}
              />
            </div>

            <button type="submit" className="btn btn-primary col-2 m-2">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditItem(false)}
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
