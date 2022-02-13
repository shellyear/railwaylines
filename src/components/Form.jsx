import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const StyledForm = styled.form``;

const Button = styled.button`
    padding: 0.8rem 1rem 0.7rem;
    border: 0.2rem solid #4d4d4d;
    cursor: pointer;
    text-transform: capitalize;

    color: #fff;
    background-color: #000;
`;

function Form(props) {
  const [name, setName] = useState(props.name);

  useEffect(() => {
    setName(props.name);
  }, [props.name, props.popupId]);

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    props.changeName(name);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-input"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn">
        Save
      </button>
    </StyledForm>
  );
}

export default Form;