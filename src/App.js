import React, { useState, useEffect, useMemo } from "react";
import AuthContext from "./context/AuthContext";
import jwtDecode from "jwt-decode";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { setTokenApi, getTokenApi, removeTokenApi } from "./api/token";
export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user.id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <div>
      {loading ? (
        <h1>cargando ...</h1>
      ) : (
        <AuthContext.Provider value={authData}>
          {auth ? <Dashboard logout={logout} /> : <Login />}
        </AuthContext.Provider>
      )}
    </div>
  );
}
