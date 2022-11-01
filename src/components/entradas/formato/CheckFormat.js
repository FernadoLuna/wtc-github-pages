import React, { useState, useEffect } from "react";
import { API_URL } from "../../../utils/constants";
import TypeChargeOptions from "../../comun/TypeChargeOptions";
import ServicesAddedOptions from "../../comun/ServicesAddedOptions";
import ManiobrasOptions from "../../comun/ManiobrasOptions";
import TypeOperacionOptions from "../../comun/TypeOperacionOptions";
import PortalesOptions from "../../comun/PortalesOptions";
import OptionsGenerator from "../../comun/OptionsGenerator";
import { getOneFormat, updateOneFormatEntry } from "../../../api/formats_entry";
import { getPortals } from "../../../api/portals";
import { getProvedores } from "../../../api/provedores";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
export default function CheckFormat(props) {
  const { reload, setReload, checkFormat, setCheckFormat } = props;
  const [currentInformation, setCurrentInformation] = useState(null);
  const [portalsOptions, setPortalsOptions] = useState(null);
  const [providersOptions, setProvidersOptions] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getOneFormat(auth, checkFormat);
      if (response.data) {
        setCurrentInformation(response.data);
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
  }, [checkFormat]);

  const onSubmit = async (data) => {
    if (selectedFile) {
      const data0 = new FormData();
      data0.append("files", selectedFile);

      const upload = await axios({
        method: "POST",
        url: `${API_URL}/api/upload`,
        data: data0,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (upload.data[0].id) {
        data.archivo_entrada = upload.data[0].id;
      }
    }

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
      if (response.data) {
        setCheckFormat(null);
      } else {
        alert("no se pudo actualizar información");
      }
    }

    setReload(!reload);
  };

  return (
    <div className="modal_info_client col-12 px-5">
      {currentInformation ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 mb-2">
              <label className="form-label">Folio</label>
              <input
                type="text"
                disabled={true}
                className="form-control"
                placeholder={currentInformation.attributes.folio}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Pedimento</label>
              <input
                type="text"
                disabled={true}
                className="form-control"
                placeholder={currentInformation.attributes.pedimento_chronos}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Pedimento Cliente</label>
              <input
                type="text"
                disabled={true}
                className="form-control"
                placeholder={currentInformation.attributes.pedimento_cliente}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Aviso Electronico</label>
              <input
                type="text"
                disabled={true}
                className="form-control"
                placeholder={currentInformation.attributes.aviso_electrico}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Fecha Inicio</label>
              <input
                type="date"
                className="form-control"
                {...register("fecha_inicio", { required: true })}
                defaultValue={currentInformation.attributes.fecha_inicio}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Fecha Fin</label>
              <input
                type="date"
                className="form-control"
                {...register("fecha_fin", { required: true })}
                defaultValue={currentInformation.attributes.fecha_fin}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">N° Sello</label>
              <input
                type="text"
                className="form-control"
                {...register("numero_sello", { required: true })}
                defaultValue={currentInformation.attributes.numero_sello}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Tipo Operación</label>
              <select
                className="form-control"
                {...register("tipo_operacion", { required: true })}
                defaultValue={currentInformation.attributes.numero_sello}
              >
                <option>seleccionar</option>
                <TypeOperacionOptions />
              </select>
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Maniobras</label>
              <select
                className="form-control"
                {...register("maniobras", { required: true })}
                defaultValue={currentInformation.attributes.maniobras}
              >
                <option>seleccionar</option>
                <ManiobrasOptions />
              </select>
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Servicios Adicionales</label>
              <select
                className="form-control"
                {...register("sevicios_adicionales", { required: true })}
                defaultValue={
                  currentInformation.attributes.sevicios_adicionales
                }
              >
                <option>seleccionar</option>
                <ServicesAddedOptions />
              </select>
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Pallet</label>
              <input
                type="text"
                className="form-control"
                {...register("pallet", { required: true })}
                defaultValue={currentInformation.attributes.pallet}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Carton</label>
              <input
                type="text"
                className="form-control"
                {...register("carton", { required: true })}
                defaultValue={currentInformation.attributes.carton}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Tipo de Carga</label>
              <select
                className="form-control"
                {...register("tipo_carga", { required: true })}
                defaultValue={currentInformation.attributes.tipo_carga}
              >
                <option>seleccionar</option>
                <TypeChargeOptions />
              </select>
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Comentarios</label>
              <input
                type="text"
                className="form-control"
                {...register("comentarios", { required: true })}
                defaultValue={currentInformation.attributes.comentarios}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Patente</label>
              <input
                type="text"
                className="form-control"
                {...register("patente", { required: true })}
                defaultValue={currentInformation.attributes.patente}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Remesa</label>
              <input
                type="text"
                className="form-control"
                {...register("remesa", { required: true })}
                defaultValue={currentInformation.attributes.remesa}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Orden de Compra</label>
              <input
                type="text"
                className="form-control"
                {...register("orden_compra", { required: true })}
                defaultValue={currentInformation.attributes.orden_compra}
              />
            </div>
            {portalsOptions && (
              <div className="col-6 mb-2">
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
              <div className="col-6 mb-2">
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
            {currentInformation.attributes.archivo_entrada.data ? (
              <div className="col-6">
                <label className="form-label">Archivo de entrada</label>
                <br />
                <a
                  target="_blank"
                  className="btn btn-primary"
                  href={`${API_URL}${currentInformation.attributes.archivo_entrada.data.attributes.url}`}
                >
                  ver archivo de entrada
                </a>
              </div>
            ) : (
              <div className="col-12 mb-2">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            )}

            <div className="col-12">
              <button
                className="btn btn-danger"
                onClick={() => setCheckFormat(null)}
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
        <h3>NO SE PUEDE OBTENER ESTA INFORMACIÓN</h3>
      )}
    </div>
  );
}
