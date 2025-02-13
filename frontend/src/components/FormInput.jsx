const FormInput = ({ name, type, onChange, placeholder, value }) => {
  return (
    <input
      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      name={name}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default FormInput;
