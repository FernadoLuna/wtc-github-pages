import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateOneProvider, getOneProvider } from "../../../api/provedores";
import useAuth from "../../../hooks/useAuth";
export default function EditProvider(props) {
  const { editProvider, setEditProvider, setReload, reload } = props;
  const [currentInformation, setCurrentInformation] = useState(null);
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getOneProvider(auth, editProvider);
      setCurrentInformation(response.data);
    })();
  }, [editProvider]);

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
      const response = await updateOneProvider(auth, provider);
      setEditProvider(null);
    }

    setReload(!reload);
  };

  return (
    <div className="modal_info_client px-5">
      <div>
        {currentInformation && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-4 mb-2">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("nombre", { required: true })}
                  defaultValue={currentInformation.attributes.nombre}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Razon social</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("razon_social", { required: true })}
                  defaultValue={currentInformation.attributes.razon_social}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("estado", { required: true })}
                  defaultValue={currentInformation.attributes.estado}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Colonia</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("colonia", { required: true })}
                  defaultValue={currentInformation.attributes.colonia}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Calle</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("calle", { required: true })}
                  defaultValue={currentInformation.attributes.calle}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">C.P</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("codigo_postal", { required: true })}
                  defaultValue={currentInformation.attributes.codigo_postal}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Num ext</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("num_ext", { required: true })}
                  defaultValue={currentInformation.attributes.num_ext}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Num int</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("num_int", { required: true })}
                  defaultValue={currentInformation.attributes.num_int}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("telefono", { required: true })}
                  defaultValue={currentInformation.attributes.telefono}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Correo</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("correo", { required: true })}
                  defaultValue={currentInformation.attributes.correo}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label">Nombre de contacto</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("nombre_contacto", { required: true })}
                  defaultValue={currentInformation.attributes.nombre_contacto}
                />
              </div>
            </div>
            <input type={"submit"} className="btn btn-primary mt-2" />
            <button
              onClick={() => setEditProvider(null)}
              className="btn btn-danger ml-2 mt-2"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
