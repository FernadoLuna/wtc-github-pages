import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { newOneFormatOut, updateOneFormatOut } from "../../../api/formats_out";
import TipoTransporte from "../../comun/TipoTransporte";
export default function NewFormat(props) {
  const { reload, setReload, setNewFormat } = props;
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dateConvert = () => {
    const date = new Date().toISOString().slice(0, 10);
    var date1 = date.replace("-", "");

    return date1;
  };

  const onSubmit = async (data) => {
    data.hora_registro = `${data.hora_registro}:00`;
    data.fecha_inicio = new Date();
    if (data.hora_modulacion === "") {
      delete data.hora_modulacion;
    } else {
      data.hora_modulacion = `${data.hora_modulacion}:00`;
    }

    if (data.fecha_modulacion === "") {
      delete data.fecha_modulacion;
    }

    const response = await newOneFormatOut(auth, data);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    if (response.data.id) {
      const getFolio = `S-${dateConvert()}-${response.data.id}`;

      const setFolio = await updateOneFormatOut(auth, {
        id: response.data.id,
        arguments: {
          folio: getFolio,
        },
      });

      if (setFolio.data) {
        alert("se ha registrado un nuevo formato de salida");
      }

      setReload(!reload);
      setNewFormat(false);
    }
  };

  return (
    <div className="modal_info_client col-12 px-5 py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-6 mb-2">
            <label className="form-label">Fecha de registro</label>
            <input
              type="date"
              className="form-control"
              {...register("fecha_registro", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Hora de registro</label>
            <input
              type="time"
              className="form-control"
              {...register("hora_registro", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Bol</label>
            <input
              type="text"
              className="form-control"
              {...register("bol", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Linea transportista</label>
            <input
              type="text"
              className="form-control"
              {...register("linea_transportista", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Nombre chofer</label>
            <input
              type="text"
              className="form-control"
              {...register("nombre_chofer", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Tipo transporte</label>
            <select
              className="form-control"
              {...register("tipo_transporte", { required: true })}
            >
              <TipoTransporte />
            </select>
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Placas</label>
            <input
              type="text"
              className="form-control"
              {...register("placas", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Numero de caja</label>
            <input
              type="text"
              className="form-control"
              {...register("numero_caja", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Numero de tractor</label>
            <input
              type="text"
              className="form-control"
              {...register("numero_tractor", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Carta porte</label>
            <input
              type="text"
              className="form-control"
              {...register("carta_porte", { required: true })}
            />
          </div>

          <div className="col-6 mb-2">
            <label className="form-label">Fecha Modulación</label>
            <input
              type="date"
              className="form-control"
              {...register("fecha_modulacion")}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Hora Modulación</label>
            <input
              type="time"
              className="form-control"
              {...register("hora_modulacion")}
            />
          </div>

          <div className="col-6 mb-2">
            <label className="form-label">Modulo Operación</label>
            <input
              type="text"
              className="form-control"
              {...register("modulo_operacion", { required: false })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Pedimento chronos</label>
            <input
              type="text"
              className="form-control"
              {...register("pedimento_chronos", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Pedimento Cliente</label>
            <input
              type="text"
              className="form-control"
              {...register("pedimento_cliente", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Avisos Electronicos</label>
            <input
              type="text"
              className="form-control"
              {...register("aviso_electrico", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary col-2 m-2">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setNewFormat(false)}
            className="btn btn-danger col-2 m-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
