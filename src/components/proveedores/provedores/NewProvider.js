import React from "react";
import { useForm } from "react-hook-form";
import { newOneProvider } from "../../../api/provedores";
import useAuth from "../../../hooks/useAuth";
export default function NewProvider(props) {
  const { reload, setReload, setNewProvider } = props;
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await newOneProvider(auth, data);
    console.log(response);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    if (response.data.id) {
      alert("se ha registrado un nuevo provedor");
      setReload(!reload);
      setNewProvider(false);
    }
  };
  return (
    <div className="modal_info_client px-5">
      <div>
        <h2 className="mb-5">Agregar Proveedor</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-4">
              <label className="form-label">nombre</label>
              <input
                type="text"
                className="form-control"
                {...register("nombre", { required: true })}
              />
              {errors.nombre?.type === "required" && (
                <p>el campo de correo es obligatorio</p>
              )}
            </div>
            <div className="col-4">
              <label className="form-label">razon_social</label>
              <input
                type="text"
                className="form-control"
                {...register("razon_social", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">estado</label>
              <input
                type="text"
                className="form-control"
                {...register("estado", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">pais</label>
              <input
                type="text"
                className="form-control"
                {...register("pais", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">colonia</label>
              <input
                type="text"
                className="form-control"
                {...register("colonia", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">calle</label>
              <input
                type="text"
                className="form-control"
                {...register("calle", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">codigo_postal</label>
              <input
                type="text"
                className="form-control"
                {...register("codigo_postal", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">num_ext</label>
              <input
                type="text"
                className="form-control"
                {...register("num_ext", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">num_int</label>
              <input
                type="text"
                className="form-control"
                {...register("num_int", { required: true })}
              />
            </div>
            <div className="col-4">
              <label className="form-label">telefono</label>
              <input
                type="text"
                className="form-control"
                {...register("telefono", { required: true })}
              />
            </div>
            <div className="mb-3 col-8">
              <label className="form-label">correo</label>
              <input
                type="text"
                className="form-control"
                {...register("correo", { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">nombre contacto</label>
              <input
                type="text"
                className="form-control"
                {...register("nombre_contacto", { required: true })}
              />
            </div>
            {/*corte*/}

            <div className="col-3 mb-3">
              <label className="form-label">RFC</label>
              <input
                type="text"
                className="form-control"
                {...register("rfc", { required: true })}
              />
            </div>

            <div className="col-3 mb-3">
              <label className="form-label">Tipo de provedor</label>
              <select
                type="text"
                className="form-control"
                {...register("tipo_provedor", { required: true })}
              >
                <option value="nacional">Nacional</option>
                <option value="extranjero">Extranjero</option>
              </select>
            </div>

            <div className="col-3 mb-3">
              <label className="form-label">INMEX</label>
              <input
                type="text"
                className="form-control"
                {...register("immex", { required: true })}
              />
            </div>

            <div className="col-3 mb-3">
              <label className="form-label">ECEX</label>
              <input
                type="text"
                className="form-control"
                {...register("ecex", { required: true })}
              />
            </div>

            <div className="col-3 mb-3">
              <label className="form-label">automotriz</label>
              <input
                type="text"
                className="form-control"
                {...register("automotriz", { required: true })}
              />
            </div>

            <div className="col-3 mb-3">
              <label className="form-label">rfe</label>
              <input
                type="text"
                className="form-control"
                {...register("rfe", { required: true })}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button
                onClick={() => setNewProvider(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
