import '../ModalWithForm/modalWithForm.css';

import { X } from 'lucide-react';

function ModalWithForm({
  closeActiveModal,
  children,
  isOpen,
  title,
  onSubmit,
}) {
  return (
    <div
      onClick={closeActiveModal}
      className={`modal ${isOpen ? 'modal__open' : ''}`}
    >
      <div className="modal__preview" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={closeActiveModal}
          className="modal__close"
        ></button>

        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
}

export default ModalWithForm;
