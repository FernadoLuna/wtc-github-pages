import React, { useState, useEffect } from "react";
import styles from "../../utils/styles.css";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Form from "./Form";
import { getOneCliente } from "../../api/clientes";

export default function EditCliente(props) {
  const { editClient, setEditClient, reload, setreload } = props;
  const { auth } = useAuth();
  const [currentInformation, setCurrentInformation] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getOneCliente(auth, editClient);
      setCurrentInformation(response.data);
    })();
  }, [editClient]);

  return (
    <div className="modal_info_client">
      {currentInformation && (
        <Form
          setEditClient={setEditClient}
          currentInformation={currentInformation}
          reload={reload}
          setreload={setreload}
        />
      )}
    </div>
  );
}
