import React from "react";
import { useForm } from "react-hook-form";
import { updateOneCliente } from "../../api/clientes";
import useAuth from "../../hooks/useAuth";
import styles from "../../utils/styles.css";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Form(props) {
  const { currentInformation, setEditClient, reload, setreload } = props;
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (window.confirm("¿Seguro quieres actualizar la información?")) {
      currentInformation.attributes.nombre = data.nombre;
      currentInformation.attributes.razon_social = data.razon_social;
      currentInformation.attributes.estados = data.estado;
      currentInformation.attributes.colonia = data.colonia;
      currentInformation.attributes.calle = data.calle;
      currentInformation.attributes.codigo_postal = data.codigo_postal;
      currentInformation.attributes.num_ext = data.num_ext;
      currentInformation.attributes.num_int = data.num_int;
      currentInformation.attributes.telefono = data.telefono;
      currentInformation.attributes.correo = data.correo;
      currentInformation.attributes.nombre_contacto = data.nombre_contacto;

      const response = await updateOneCliente(auth, currentInformation);
      setEditClient(false);
    }

    setreload(!reload);
  };
  return (
    <div className="px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <label className="form-label">nombre</label>
            <input
              type="text"
              className="form-control"
              {...register("nombre", { required: true })}
              defaultValue={currentInformation.attributes.nombre}
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
              defaultValue={currentInformation.attributes.razon_social}
            />
          </div>

          <div className="col-4">
            <label className="form-label">estado</label>
            <input
              type="text"
              className="form-control"
              {...register("estado", { required: true })}
              defaultValue={currentInformation.attributes.estados}
            />
          </div>

          <div className="col-4">
            <label className="form-label">colonia</label>
            <input
              type="text"
              className="form-control"
              {...register("colonia", { required: true })}
              defaultValue={currentInformation.attributes.colonia}
            />
          </div>

          <div className="col-4">
            <label className="form-label">calle</label>
            <input
              type="text"
              className="form-control"
              {...register("calle", { required: true })}
              defaultValue={currentInformation.attributes.calle}
            />
          </div>
          <div className="col-4">
            <label className="form-label">codigo_postal</label>
            <input
              type="text"
              className="form-control"
              {...register("codigo_postal", { required: true })}
              defaultValue={currentInformation.attributes.codigo_postal}
            />
          </div>
          <div className="col-4">
            <label className="form-label">num_ext</label>
            <input
              type="text"
              className="form-control"
              {...register("num_ext", { required: true })}
              defaultValue={currentInformation.attributes.num_ext}
            />
          </div>
          <div className="col-4">
            <label className="form-label">num_int</label>
            <input
              type="text"
              className="form-control"
              {...register("num_int", { required: true })}
              defaultValue={currentInformation.attributes.num_int}
            />
          </div>
          <div className="col-4">
            <label className="form-label">telefono</label>
            <input
              type="text"
              className="form-control"
              {...register("telefono", { required: true })}
              defaultValue={currentInformation.attributes.telefono}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">correo</label>
            <input
              type="text"
              className="form-control"
              {...register("correo", { required: true })}
              defaultValue={currentInformation.attributes.correo}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">nombre contacto</label>
            <input
              type="text"
              className="form-control"
              {...register("nombre_contacto", { required: true })}
              defaultValue={currentInformation.attributes.nombre_contacto}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              actualizar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setEditClient(false)}
            >
              cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
