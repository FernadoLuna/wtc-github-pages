import React, { useState } from "react";
import LoginForm from "./Auth/LoginForm";
export default function Login() {
  const [Logeado, setLogeado] = useState(false);

  return (
    <div>
      <LoginForm setLogeado={setLogeado} />
    </div>
  );
}
