import React from "react";
import { useForm } from "react-hook-form";
import { loginApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import * as bootstrap from "bootstrap";
import styles from "../../utils/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function LoginForm() {
  const { login } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginApi(data);
      login(response);
      if (response.error) {
        throw response.error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="back">
      <form onSubmit={handleSubmit(onSubmit)} className="login_form">
        <img src="https://hokins.com/wp-content/uploads/2020/11/hokins-logo.png" />
        <div class="mb-4 col-12">
          <label>correo</label>
          <input
            type="email"
            {...register("identifier", { required: true })}
            className="form-control"
          />
          {errors.correo?.type === "required" && (
            <p>el campo de correo es obligatorio</p>
          )}
        </div>
        <div class="form-outline mb-4 col-12">
          <label>contraseña</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="form-control"
          />
          {errors.contraseña?.type === "required" && (
            <p>el campo de contraseña es obligatorio</p>
          )}
        </div>
        <div>
          <input
            type="submit"
            className="form-control btn btn-primary col-12"
          />
        </div>
      </form>
    </div>
  );
}
