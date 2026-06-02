import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './loginModal.css';

function LoginModal({ isOpen, closeActiveModal, onLogin, onSwitchToSignUp }) {
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

  const isFormValid = email.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onLogin({ email, password })
      .then(() => {
        setEmail('');
        setPassword('');
        setErrors({});
        closeActiveModal();
      })
      .catch((err) => {
        console.error('Login failed:', err);
      });
  };

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="loginModal__label">
        <input
          type="text"
          className="loginModal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="loginModal__error">{errors.email}</p>}
      </label>

      <label className="loginModal__label">
        <input
          type="password"
          className="loginModal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && (
          <p className="loginModal__error">{errors.password}</p>
        )}
      </label>
      <div className="LoginModal__bottom-btns">
        <button
          type="submit"
          className={`loginModal__submit ${isFormValid ? 'loginModal__submit_active' : ''}`}
          disabled={!isFormValid}
        >
          Login
        </button>

        <button
          type="button"
          className="loginModal__signin"
          onClick={onSwitchToSignUp}
        >
          or no account yet?
          <span className="loginModal__signup-text"> Sign Up</span>
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
