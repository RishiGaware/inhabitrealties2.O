import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import loginImg from '../../assets/images/loginImage1.jpg';
import logo from '../../assets/images/logown.png';
import { FaTimes } from 'react-icons/fa';
import { getIpAndLocation } from '../../utils/locationUtils';
import { showToast } from '../../utils/toastConfig';
import { authService } from '../../services/auth/authService';
import FloatingInput from '../../components/common/FloatingInput';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const [locationData, setLocationData] = useState({
    ip: "127.0.0.1",
    lat: "0",
    long: "0"
  });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotLoginId, setForgotLoginId] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const data = await getIpAndLocation();
        setLocationData({
          ip: data.ip || "127.0.0.1",
          lat: data.lat?.toString() || "0",
          long: data.long?.toString() || "0"
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocationData();
  }, []);

  const handleSignIn = async () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const response = await authService.login({
        username: email,
        password: password,
        ipAddress: locationData.ip,
        latitude: locationData.lat,
        longitude: locationData.long
      });

      sessionStorage.setItem('userData', JSON.stringify(response.userMaster));
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('userId', response.userMaster.userID);

      showToast.success('Login successful!');

      if (response.userMaster.isReset === true) {
        setTimeout(() => navigate('/profile/password-change'), 2000);
      } else {
        setTimeout(() => navigate('/select-plant'), 2000);
      }
    } catch (error) {
      navigate('/dashboard')

      const errorMessage = error.header?.messages?.[0]?.messageText || 'Login failed';
      const currentFailedAttempts = error.failedAttempts;
      
      setFailedAttempts(currentFailedAttempts);
      setErrors(prev => ({ ...prev, general: errorMessage }));

      if (currentFailedAttempts < 0) {
        showToast.error(errorMessage);
      } else {
        showToast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

 



  return (
    <div className={styles.container} onKeyDown={(e) => e.key === 'Enter' && handleSignIn()} tabIndex={0}>
      <div className={styles.left}>
        <img src={loginImg} alt="Login Visual" className={styles.leftImage} />
      </div>

      <div className={styles.right}>
        <div className={styles.formContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h2>Welcome Back</h2>

          <FloatingInput
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Username"
            error={errors.email}
            required
            autoFocus
          />

          <FloatingInput
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            error={errors.password}
            required
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <div className={styles.forgotPassword}>
            <button
              type="button"
              className={styles.forgotPasswordBtn}
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </button>
          </div>

          {failedAttempts > 0 && (
            <div className={styles.attemptsWarning}>
              <span>⚠️ {failedAttempts} {failedAttempts === 1 ? 'attempt' : 'attempts'} remaining</span>
            </div>
          )}

          <button
            className={styles.signInButton}
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>

          <div className={styles.registerText}>
            Don't have an account?{' '}
            <button
              className={styles.registerLink}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>

          {failedAttempts < 0 && (
            <button
              className={styles.resetPasswordBtn}
              onClick={() => setShowResetModal(true)}
              style={{ marginTop: 16 }}
            >
              Request Password Reset
            </button>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default Login;
