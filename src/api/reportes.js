import { API_URL } from "../utils/constants";

export async function getReportExistPlaces(auth, id) {
  try {
    const url = `${API_URL}/api/formato-entradas?populate=provedor&populate=archivo_entrada&populate=reubicacione&filters[provedor]=${id}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFormats(auth, id) {
  try {
    const url = `${API_URL}/api/formato-entradas?populate=provedor&filters[provedor]=${id}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFormatsOut(auth, id) {
  try {
    const url = `${API_URL}/api/formato-de-salidas?populate=provedor&filters[provedor]=${id}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
