import React, { useState, useEffect } from "react";

const useEditableText = ({ name, defaultValue }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (localStorage.getItem(name)) {
      setValue(localStorage.getItem(name))
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleBlur = () => {
    setEdit(false);
    if (!value) {
      setValue("QUAY SỐ TRÚNG THƯỞNG");
    }
  };

  useEffect(() => {
    localStorage.setItem(name, value)
  }, [value])

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    edit,
    handleKeyDown,
    handleBlur,
    handleChange,
    setEdit,
  };
};

export const Title = () => {
  const { edit, value, handleKeyDown, handleBlur, handleChange, setEdit } =
    useEditableText({ name: "title", defaultValue: "QUAY SỐ TRÚNG THƯỞNG" });

  if (edit) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          name="title"
          onKeyDown={handleKeyDown}
          style={{
            padding: 8,
            border: "none",
            borderRadius: 6,
            width: 500,
            fontSize: 22,
          }}
        />
      </div>
    );
  }

  return (
    <h1
      onClick={() => setEdit(true)}
      className="title"
      style={{ color: "yellow", textTransform: "uppercase" }}
    >
      {value}
    </h1>
  );
};

export const Description = () => {
  const { edit, value, handleKeyDown, handleBlur, handleChange, setEdit } =
  useEditableText({ name: "description", defaultValue: "Dành cho người may mắn" });

  if (edit) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          name="description"
          onKeyDown={handleKeyDown}
          style={{
            marginTop: 16,
            padding: 6,
            border: "none",
            borderRadius: 6,
            width: 500,
            fontSize: 18,
          }}
        />
      </div>
    );
  }

  return (
    <p onClick={() => setEdit(true)} className="desc">
      {value}
    </p>
  );
};
