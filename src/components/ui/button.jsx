export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
