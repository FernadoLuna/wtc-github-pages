import React, { useState } from "react";
import { API_URL } from "../../../utils/constants";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../../api/formats_entry";
import axios from "axios";

export default function Files() {
  const { auth } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3MjMwNzA0LCJleHAiOjE2Njk4MjI3MDR9.m175lJn1VjuUy81Wd61HZ5GHTdyWMJooJeqO2XHhiiU`,
      },
    });

    console.log(upload.data[0].id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        name="files"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
