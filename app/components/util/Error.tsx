import { FaExclamationCircle } from "react-icons/fa";

export function Error({ title, children }) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
