import { API_URL } from "../utils/constants";

export async function newOneFormatEntry(auth, data) {
  try {
    const url = `${API_URL}/api/formato-entradas`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ data: { ...data } }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFormats(auth) {
  try {
    const url = `${API_URL}/api/formato-entradas?populate=provedor&populate=user&populate=portal&populate=reubicacione`;
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

export async function getOneFormat(auth, id) {
  try {
    const url = `${API_URL}/api/formato-entradas/${id}?populate=provedor&populate=user&populate=portal&populate=archivo_entrada&populate=reubicacione`;
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

export async function uploadFile(auth, data) {
  try {
    const url = `${API_URL}/api/upload`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ files: { ...data } }),
    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOneFormatEntry(auth, object) {
  try {
    const url = `${API_URL}/api/formato-entradas/${object.id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ data: { ...object.arguments } }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteOneFormatEntry(auth, id) {
  try {
    const url = `${API_URL}/api/formato-entradas/${id}`;
    const params = {
      method: "DELETE",
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
