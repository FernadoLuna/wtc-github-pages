import React, { useState, useEffect } from "react";
import { getOneContact, updateOneContact } from "../../../api/contactos";
import { getClientes } from "../../../api/clientes";
import OptionsGenerator from "../../comun/OptionsGenerator";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import styles from "../../../utils/styles.css";
import * as bootstrap from "bootstrap";
export default function EditContact(props) {
  const { setEditContact, editContact, reload, setreload } = props;
  const { auth } = useAuth();
  const [currentInformation, setCurrentInformation] = useState(null);
  const [clientsOptions, setClientsOptions] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    (async () => {
      const response = await getOneContact(auth, editContact);
      setCurrentInformation(response.data);
      const clients = await getClientes(auth);
      setClientsOptions(clients.data);
    })();
  }, []);

  const onSubmit = async (data) => {
    if (window.confirm("¿Seguro quieres actualizar la información?")) {
      const update = {
        id: editContact,
        arguments: data,
      };

      const response = await updateOneContact(auth, update);
      if (response.error) {
        alert(
          "ha ocurrido un error posiblement no tengas permiso para realizar esta acción"
        );
      } else {
        setEditContact(false);
        setreload(!reload);
      }
    }
  };

  return (
    <div className="modal_info_client col-12 px-5">
      {currentInformation && clientsOptions && (
        <div className="div_formulario">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-4 mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentInformation.attributes.nombre}
                  {...register("nombre", { required: true })}
                />
              </div>
              <div className="col-4 mb-3">
                <label className="form-label">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentInformation.attributes.telefono}
                  {...register("telefono", { required: true })}
                />
              </div>
              <div className="col-4 mb-3">
                <label className="form-label">Extensión</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={currentInformation.attributes.extension}
                  {...register("extension", { required: true })}
                />
              </div>
              <div className="col-5 mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={currentInformation.attributes.correo}
                  {...register("correo", { required: true })}
                />
              </div>
              <div className="col-4 mb-3">
                <label className="form-label">Departamento</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentInformation.attributes.departamento}
                  {...register("departamento", { required: true })}
                />
              </div>
              <div className="col-3 mb-3">
                <label className="form-label">Cliente</label>
                <select
                  name="select"
                  className="form-control"
                  {...register("cliente", { required: true })}
                >
                  {currentInformation.attributes.cliente.data != null && (
                    <option
                      value={currentInformation.attributes.cliente.data.id}
                    >
                      {
                        currentInformation.attributes.cliente.data.attributes
                          .nombre
                      }
                    </option>
                  )}

                  <OptionsGenerator data={clientsOptions} />
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              guardar
            </button>
            <button
              onClick={() => setEditContact(null)}
              className="btn btn-danger"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
