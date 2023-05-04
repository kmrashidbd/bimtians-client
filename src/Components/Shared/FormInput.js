import React from 'react';

const FormInput = ({ type, name, id, placeholder, register }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="form-control"
            id={id}
            {...register(`${name}`, { required: true })}
        />
    );
};

export default FormInput;