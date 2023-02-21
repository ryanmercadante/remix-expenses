type ModalProps = {
  children: JSX.Element;
  onClose: React.MouseEventHandler<HTMLDivElement>;
};

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog
        className="modal"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
