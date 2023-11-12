import React from "react";

const Form = ({ handleSubmit, onChange }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center">
      <label htmlFor="searchCountry" />
      <input
        name="searchCountry"
        id="searchCountry"
        type="text"
        placeholder="Province or District e.g. Hat Yai"
        className="p-2 outline-none rounded-md w-[300px] text-center"
        onChange={onChange}
      />
      <button type="submit" className="text-white border p-2 rounded-md">
        search
      </button>
    </form>
  );
};

export default Form;
