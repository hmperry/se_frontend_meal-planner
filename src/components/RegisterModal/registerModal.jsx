import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/modalWithForm';

function RegisterModal({ isOpen, closeActiveModal, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onRegister({ name, email, password });

    // Clear the form
    setEmail('');
    setPassword('');
    setErrors({});
    closeActiveModal();
  };

  return (
    <ModalWithForm
      title="Register"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
    >
      <form onSubmit={handleSubmit} className="registerModal__form">
        <label className="registerModal__label">
          Name
          <input
            type="text"
            className="registerModal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="registerModal__error">{errors.name}</p>}
        </label>

        <label className="registerModal__label">
          Email
          <input
            type="text"
            className="registerModal__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="registerModal__error">{errors.email}</p>
          )}
        </label>

        <label className="registerModal__label">
          Password
          <input
            type="password"
            className="registerModal__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="registerModal__error">{errors.password}</p>
          )}
        </label>

        <label className="registerModal__label">
          Confirm Password
          <input
            type="password"
            className="registerModal__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="registerModal__error">{errors.confirmPassword}</p>
          )}
        </label>

        <button type="submit" className="registerModal__submit">
          Register
        </button>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
