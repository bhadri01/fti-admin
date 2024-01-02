export const SubmitButton = ({ name, color }) => {
  return (
    <button
      className={`btn btn-${color} text-capitalize fs-6 w-100`}
      type="submit"
    >
      {name}
    </button>
  );
};
