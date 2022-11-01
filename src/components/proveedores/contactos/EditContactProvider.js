import React, { useState, useEffect } from "react";
import {
  getOneProviderContact,
  getProvedores,
  updateOneContactProvider,
} from "../../../api/provedores";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import OptionsGenerator from "../../comun/OptionsGenerator";
export default function EditContactProvider(props) {
  const [currentInformation, setCurrentInformation] = useState(null);
  const { reload, setReload, Edit, setEdit } = props;
  const [providersOptions, setProvidersOptions] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getOneProviderContact(auth, Edit);
      setCurrentInformation(response.data);
      const providers = await getProvedores(auth);
      setProvidersOptions(providers.data);
    })();
  }, [Edit]);

  const onSubmit = async (data) => {
    let dates = {
      id: currentInformation.id,
      arguments: data,
    };

    if (window.confirm("¿Seguro quieres actualizar la información?")) {
      const response = await updateOneContactProvider(auth, dates);
      setEdit(null);
    }

    setReload(!reload);
    console.log(data);
  };
  return (
    <div className="modal_info_client col-12 px-5">
      {currentInformation ? (
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
              <label className="form-label">Telefono</label>
              <input
                type="text"
                className="form-control"
                {...register("telefono", { required: true })}
                defaultValue={currentInformation.attributes.telefono}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Extension</label>
              <input
                type="text"
                className="form-control"
                {...register("extension", { required: true })}
                defaultValue={currentInformation.attributes.extension}
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
              <label className="form-label">Departamento</label>
              <input
                type="text"
                className="form-control"
                {...register("departamento", { required: true })}
                defaultValue={currentInformation.attributes.departamento}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Provedor</label>
              <select
                type="text"
                className="form-control"
                {...register("provedore", { required: true })}
                defaultValue={currentInformation.attributes.nombre_contacto}
              >
                {" "}
                {currentInformation.attributes.provedore.data && (
                  <option
                    value={currentInformation.attributes.provedore.data.id}
                  >
                    {
                      currentInformation.attributes.provedore.data.attributes
                        .nombre
                    }
                  </option>
                )}
                <OptionsGenerator data={providersOptions} />
              </select>
            </div>
          </div>
          <input type={"submit"} className="btn btn-primary mt-2" />
          <button
            onClick={() => setEdit(null)}
            className="btn btn-danger ml-2 mt-2"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <h2>No se puede Editar este item</h2>
      )}
    </div>
  );
}
