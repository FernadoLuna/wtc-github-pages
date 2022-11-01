import React, { useState, useEffect } from "react";
import UsersOptions from "../../comun/UsersOptions";
import PortalesOptions from "../../comun/PortalesOptions";
import OptionsGenerator from "../../comun/OptionsGenerator";
import { getOneFormat, updateOneFormatEntry } from "../../../api/formats_entry";
import { getPortals } from "../../../api/portals";
import { getUsers } from "../../../api/user";
import { getProvedores } from "../../../api/provedores";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
export default function EditFormat(props) {
  const { reload, setReload, editFormat, setEditFormat } = props;
  const [currentInformation, setCurrentInformation] = useState(null);
  const [usersOptions, setUsersOptions] = useState(null);
  const [portalsOptions, setPortalsOptions] = useState(null);
  const [providersOptions, setProvidersOptions] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getOneFormat(auth, editFormat);
      if (response.data) {
        setCurrentInformation(response.data);
      }
      const users = await getUsers(auth);
      if (users) {
        setUsersOptions(users);
      }

      const portals = await getPortals(auth);
      if (portals.data) {
        setPortalsOptions(portals.data);
      }

      const providers = await getProvedores(auth);
      if (providers.data) {
        setProvidersOptions(providers.data);
      }
    })();
  }, [editFormat]);

  const onSubmit = async (data) => {
    for (var clave in data) {
      if (data[clave] === "" || data[clave] === "null") {
        delete data[clave];
      }
    }

    let dates = {
      id: currentInformation.id,
      arguments: data,
    };

    if (window.confirm("¿Seguro quieres actualizar la información?")) {
      const response = await updateOneFormatEntry(auth, dates);

      setEditFormat(null);
    }

    setReload(!reload);
  };

  return (
    <div className="modal_info_client col-12">
      {currentInformation ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-4 mb-2">
              <label className="form-label">Fecha inicio</label>
              <input
                type="date"
                className="form-control"
                {...register("fecha_inicio", { required: true })}
                defaultValue={currentInformation.attributes.fecha_inicio}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Fecha fin</label>
              <input
                type="date"
                className="form-control"
                {...register("fecha_fin")}
                defaultValue={currentInformation.attributes.fecha_fin}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">N° sello</label>
              <input
                type="text"
                className="form-control"
                {...register("numero_sello")}
                defaultValue={currentInformation.attributes.numero_sello}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Fecha registro</label>
              <input
                type="date"
                className="form-control"
                {...register("fecha_registro", { required: true })}
                defaultValue={currentInformation.attributes.fecha_registro}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Hora registro</label>
              <input
                type="time"
                className="form-control"
                {...register("hora_registro", { required: true })}
                defaultValue={currentInformation.attributes.hora_registro}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Bol</label>
              <input
                type="text"
                className="form-control"
                {...register("bol")}
                defaultValue={currentInformation.attributes.bol}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Linea transportista</label>
              <input
                type="text"
                className="form-control"
                {...register("linea_transportista")}
                defaultValue={currentInformation.attributes.linea_transportista}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Nombre chofer</label>
              <input
                type="text"
                className="form-control"
                {...register("nombre_chofer")}
                defaultValue={currentInformation.attributes.nombre_chofer}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Placas</label>
              <input
                type="text"
                className="form-control"
                {...register("placas")}
                defaultValue={currentInformation.attributes.placas}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Caja</label>
              <input
                type="text"
                className="form-control"
                {...register("numero_caja")}
                defaultValue={currentInformation.attributes.numero_caja}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Tractor</label>
              <input
                type="text"
                className="form-control"
                {...register("numero_tractor")}
                defaultValue={currentInformation.attributes.numero_tractor}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Carta porte</label>
              <input
                type="text"
                className="form-control"
                {...register("carta_porte")}
                defaultValue={currentInformation.attributes.carta_porte}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Tipo operación</label>
              <input
                type="text"
                className="form-control"
                {...register("tipo_operacion")}
                defaultValue={currentInformation.attributes.tipo_operacion}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Maniobras</label>
              <input
                type="text"
                className="form-control"
                {...register("maniobras")}
                defaultValue={currentInformation.attributes.maniobras}
              />
            </div>

            <div className="col-4 mb-2">
              <label className="form-label">Servicios adicionales</label>
              <input
                type="text"
                className="form-control"
                {...register("servicios_adicionales")}
                defaultValue={
                  currentInformation.attributes.servicios_adicionales
                }
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Pallet</label>
              <input
                type="text"
                className="form-control"
                {...register("pallet")}
                defaultValue={currentInformation.attributes.pallet}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Carton</label>
              <input
                type="text"
                className="form-control"
                {...register("carton")}
                defaultValue={currentInformation.attributes.carton}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Tipo de carga</label>
              <input
                type="text"
                className="form-control"
                {...register("tipo_carga")}
                defaultValue={currentInformation.attributes.tipo_carga}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Comentarios</label>
              <input
                type="text"
                className="form-control"
                {...register("comentarios")}
                defaultValue={currentInformation.attributes.comentarios}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Patente</label>
              <input
                type="text"
                className="form-control"
                {...register("patente")}
                defaultValue={currentInformation.attributes.patente}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Fecha modulación</label>
              <input
                type="date"
                className="form-control"
                {...register("fecha_modulacion")}
                defaultValue={currentInformation.attributes.fecha_modulacion}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Hora modulacion</label>
              <input
                type="time"
                className="form-control"
                {...register("hora_modulacion")}
                defaultValue={currentInformation.attributes.hora_modulacion}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Modulo operación</label>
              <input
                type="text"
                className="form-control"
                {...register("modulo_operacion")}
                defaultValue={currentInformation.attributes.modulo_operacion}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Pedimento</label>
              <input
                type="text"
                className="form-control"
                {...register("pedimento_chronos")}
                defaultValue={currentInformation.attributes.pedimento_chronos}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Pedimento cliente</label>
              <input
                type="text"
                className="form-control"
                {...register("pedimento_cliente")}
                defaultValue={currentInformation.attributes.pedimento_cliente}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="form-label">Avisos</label>
              <input
                type="text"
                className="form-control"
                {...register("aviso_electrico")}
                defaultValue={currentInformation.attributes.aviso_electrico}
              />
            </div>
            {usersOptions && (
              <div className="col-12 mb-2">
                <label className="form-label">Usuario</label>
                <select className="form-control" {...register("user")}>
                  <option value="null">usuario</option>
                  <UsersOptions data={usersOptions} />
                </select>
              </div>
            )}
            {portalsOptions && (
              <div className="col-12 mb-2">
                <label className="form-label">Portal</label>
                <select className="form-control" {...register("portal")}>
                  {currentInformation.attributes.portal.data && (
                    <option
                      value={currentInformation.attributes.portal.data.id}
                    >
                      {
                        currentInformation.attributes.portal.data.attributes
                          .nombre
                      }
                    </option>
                  )}
                  <option value="null">portal</option>
                  <PortalesOptions data={portalsOptions} />
                </select>
              </div>
            )}

            {providersOptions && (
              <div className="col-12 mb-2">
                <label className="form-label">Provedor</label>
                <select className="form-control" {...register("provedor")}>
                  {currentInformation.attributes.provedor.data && (
                    <option
                      value={currentInformation.attributes.provedor.data.id}
                    >
                      {
                        currentInformation.attributes.provedor.data.attributes
                          .nombre
                      }
                    </option>
                  )}
                  <option value="null">provedor</option>
                  <OptionsGenerator data={providersOptions} />
                </select>
              </div>
            )}
            <div className="col-12">
              <button
                className="btn btn-danger"
                onClick={() => setEditFormat(null)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary ml-2" type="submit">
                Guardar
              </button>
            </div>
          </div>
        </form>
      ) : (
        <h4>No se puede obtener la información</h4>
      )}
    </div>
  );
}
