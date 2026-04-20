import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/modalWithForm';

function LoginModal({ isOpen, closeActiveModal, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onLogin({ email, password });
    // Clear the form
    setEmail('');
    setPassword('');
    setErrors({});

    closeActiveModal();
  };

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
    >
      <form onSubmit={handleSubmit} className="loginModal__form">
        <label className="loginModal__label">
          Email
          <input
            type="text"
            className="loginModal__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="loginModal__error">{errors.email}</p>}
        </label>

        <label className="loginModal__label">
          Password
          <input
            type="password"
            className="loginModal__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="loginModal__error">{errors.password}</p>
          )}
        </label>

        <button type="submit" className="loginModal__submit">
          Login
        </button>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
