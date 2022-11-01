import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import OptionsGenerator from "../../comun/OptionsGenerator";
import useAuth from "../../../hooks/useAuth";
import { getClientes } from "../../../api/clientes";
import { newOneContact } from "../../../api/contactos";
export default function NewContact(props) {
  const { setNewContact, reload, setreload } = props;
  const { auth } = useAuth();
  const [clientsOptions, setClientsOptions] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getClientes(auth);
      setClientsOptions(response.data);
    })();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const response = await newOneContact(auth, data);

    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    if (response.data.id) {
      alert("se ha registrado un nuevo cliente");
      setreload(!reload);
      setNewContact(false);
    }
  };

  return (
    <div className="modal_info_client px-5 col-12">
      <div className="div_formulario">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Nombre</label>
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
              <label className="form-label">Telefono</label>
              <input
                type="text"
                className="form-control"
                {...register("telefono", { required: true })}
              />
              {errors.telefono?.type === "required" && (
                <p>el campo de correo es obligatorio</p>
              )}
            </div>
            <div className="col-4">
              <label className="form-label">Extensión</label>
              <input
                type="number"
                className="form-control"
                {...register("extension", { required: true })}
              />
              {errors.extension?.type === "required" && (
                <p>el campo de correo es obligatorio</p>
              )}
            </div>
            <div className="col-4">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                {...register("correo", { required: true })}
              />
              {errors.correo?.type === "required" && (
                <p>el campo de correo es obligatorio</p>
              )}
            </div>
            <div className="col-4">
              <label className="form-label">Departamento</label>
              <input
                type="text"
                className="form-control"
                {...register("departamento", { required: true })}
              />
              {errors.departamento?.type === "required" && (
                <p>el campo de correo es obligatorio</p>
              )}
            </div>
            <div className="col-4 mb-3">
              <label className="form-label">Cliente</label>
              <select
                name="select"
                className="form-control"
                {...register("cliente", { required: true })}
              >
                <OptionsGenerator data={clientsOptions} />
              </select>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
          <button
            className="btn btn-danger ml-2"
            type="submit"
            onClick={() => setNewContact(false)}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
