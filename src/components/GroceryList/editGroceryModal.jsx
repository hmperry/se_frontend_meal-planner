import './editGroceryModal.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useState } from 'react';

import ModalWithForm from '../ModalWithForm/modalWithForm';

function editGroceryModal({ isOpen, closeActiveModal }) {
  return (
    <ModalWithForm
      title={`Edit Grocery Item`}
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
    >
      <p>edit grocery item form goes here</p>
    </ModalWithForm>
  );
}

export default editGroceryModal;
