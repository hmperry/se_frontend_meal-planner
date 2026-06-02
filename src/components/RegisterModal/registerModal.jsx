import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './registerModal.css';

function RegisterModal({
  isOpen,
  closeActiveModal,
  onRegister,
  onSwitchToSignIn,
}) {
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

  const isFormValid = name.trim() && email.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onRegister({ name, email, password })
      .then(() => {
        setEmail('');
        setPassword('');
        setErrors({});
        closeActiveModal(); // ✅ only closes on success
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        // modal stays open, user can retry
      });
  };

  return (
    <ModalWithForm
      title="Register"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="registerModal__label">
        <input
          type="text"
          className="registerModal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        {errors.name && <p className="registerModal__error">{errors.name}</p>}
      </label>

      <label className="registerModal__label">
        <input
          type="text"
          className="registerModal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="registerModal__error">{errors.email}</p>}
      </label>

      <label className="registerModal__label">
        <input
          type="password"
          className="registerModal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && (
          <p className="registerModal__error">{errors.password}</p>
        )}
      </label>

      <label className="registerModal__label">
        <input
          type="password"
          className="registerModal__input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="registerModal__error">{errors.confirmPassword}</p>
        )}
      </label>

      <div className="registerModal__bottom-btns">
        <button
          type="submit"
          className={`registerModal__submit ${isFormValid ? 'registerModal__submit_active' : ''}`}
          disabled={!isFormValid}
        >
          Register
        </button>

        <button
          type="button"
          className="registerModal__signin"
          onClick={onSwitchToSignIn}
        >
          or <span className="registerModal__signin-text">Sign In</span>
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
