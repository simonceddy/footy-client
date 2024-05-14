function Modal({ children, onClose }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full col justify-center items-center">
      <div
        role="presentation"
        onClick={onClose}
        className="absolute top-0 left-0 w-full h-full bg-slate-400/50 z-20"
      />
      <div className="col justify-center items-center z-30 max-h-[80%] min-h-[10%] min-w-[60%] max-w-[90%]">
        {children}
      </div>
    </div>
  );
}

export default Modal;
