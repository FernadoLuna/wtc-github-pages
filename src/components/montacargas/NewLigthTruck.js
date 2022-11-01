import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { API_URL } from "../../utils/constants";
import { useForm } from "react-hook-form";
import axios from "axios";
import { newOneLigthTruck } from "../../api/lighttrucks";
export default function NewLigthTruck(props) {
  const { reload, setReload, setNewItem } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
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
    data.imagen = upload.data[0].id;

    for (var clave in data) {
      if (
        data[clave] === "" ||
        data[clave] === "null" ||
        data[clave] === null
      ) {
        delete data[clave];
      }
    }

    const response = await newOneLigthTruck(auth, data);
    if (response.error) {
      if (response.error.message === "Forbidden") {
        alert("no tienes permisos para realizar esta acción");
      } else {
        alert("error desconocido, revisa tu información o intenta mas tarde");
      }
    }

    setReload(!reload);
    setNewItem(false);
  };

  return (
    <div className="modal_info_client col-12 px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-6 mb-2">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              {...register("nombre", { required: true })}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Epc</label>
            <input
              type="text"
              className="form-control"
              {...register("epc", { required: true })}
            />
          </div>
          <div className="col-12 mb-2">
            <label className="form-label">Imagen</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary col-2 m-2">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setNewItem(false)}
            className="btn btn-danger col-2 m-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
