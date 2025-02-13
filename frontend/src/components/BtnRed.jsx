const BtnRed = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mr-2 ring-2 ring-red-500 rounded-md px-2 py-1 hover:bg-red-500 hover:text-white transition-all duration-300 font-medium"
    >
      {children}
    </button>
  );
};

export default BtnRed;
