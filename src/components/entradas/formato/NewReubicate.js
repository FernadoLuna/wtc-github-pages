import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import UsersOptions from "../../comun/UsersOptions";
import { newOneReubication } from "../../../api/reubications";
import { getUsers } from "../../../api/user";
export default function NewReubicate(props) {
  const { reubicate, setReubicate, reload, setReload } = props;
  const [closeModal, setCloseModal] = useState(null);
  const [usersOptions, setUsersOptions] = useState(null);
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getUsers(auth);
      if (response) {
        setUsersOptions(response);
      }

      setCloseModal(false);
    })();
  }, []);

  const onSubmit = async (data) => {
    data.formato_entrada = reubicate;
    const response = await newOneReubication(auth, data);
    setReload(!reload);
    setCloseModal(true);
  };

  return (
    <div
      className="modal fade col-10"
      id="modalNewReubicate"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Reubicar Entrada
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {closeModal && (
              <div className="bg-success col-12">
                <h6 className="text-center">registrado con exito</h6>
              </div>
            )}
            <div className="modal-body">
              <div className="col-12 mb-2">
                <label className="form-label">usuario</label>
                <select
                  className="form-control"
                  {...register("user", { required: true })}
                >
                  {usersOptions && <UsersOptions data={usersOptions} />}
                </select>
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">Nueva ubicación</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("nueva_ubicacion", { required: true })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-dismiss={closeModal && "modal"}
              >
                {closeModal ? "Cerrar" : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
