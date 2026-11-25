import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';
import FormInput from '../components/FormInput.jsx';
import { alertaExito } from '../utils/alerts.js';
import Contexto from '../context/Contexto';

const inicial = { correo: '', password: '' };

const validar = (v) => {
  const e = {};
  if (!/^\S+@\S+\.\S+$/.test(v.correo)) e.correo = 'El campo correo es requerido y debe ser válido';
  if (!v.password) e.password = 'El campo contraseña es requerido!';
  return e;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(Contexto);
  const { values, errors, handleChange, handleSubmit } = useForm(inicial, validar);
  const API = import.meta.env.VITE_API_URL;

  const onSubmit = ({ correo }) => {
    login({ usuario: correo });
    alertaExito('Acceso correcto!', 'Estas siendo redirigido ...').then(() => {
      navigate('/');
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          <div className="tarjeta overflow-hidden">
            <div className="row g-0">
              {/* Panel izquierdo: bienvenida */}
              <div className="col-md-5 d-none d-md-flex hero rounded-0 flex-column justify-content-center align-items-center text-center p-4">
                <span
                  className="icono-circulo mb-3"
                  style={{ background: 'rgba(255,255,255,.2)', color: '#fff', borderColor: 'transparent' }}
                >
                  <i className="fa-solid fa-lock"></i>
                </span>
                <h2 className="h3 text-white mb-2">¡Hola de nuevo!</h2>
                <p className="mb-4 small" style={{ opacity: 0.9 }}>
                  Ingresa tus datos para continuar donde lo dejaste.
                </p>
                <Link to="/registro" className="btn btn-outline-light px-4">
                  Crear cuenta
                </Link>
              </div>

              {/* Panel derecho: formulario */}
              <div className="col-md-7 p-4 p-lg-5">
                <div className="mb-4">
                  <h1 className="h3 mb-1">Iniciar sesión</h1>
                  <p className="text-muted small mb-0">Accede con tu correo y contraseña</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <FormInput
                    label="Correo"
                    name="correo"
                    type="email"
                    icono="fa-envelope"
                    placeholder="correo@ejemplo.com"
                    value={values.correo}
                    onChange={handleChange}
                    error={errors.correo}
                  />
                  <FormInput
                    label="Contraseña"
                    name="password"
                    type="password"
                    icono="fa-key"
                    placeholder="Tu contraseña"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                  />

                  <button type="submit" className="btn btn-morado btn-lg w-100 mt-2">
                    Iniciar Sesión
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </button>
                </form>

                {/* Visible solo en móvil, donde se oculta el panel izquierdo */}
                <div className="d-md-none text-center mt-3">
                  <span className="text-muted small">¿No tienes cuenta? </span>
                  <Link to="/registro" className="small fw-semibold">
                    Regístrate
                  </Link>
                </div>

                <div className="text-center mt-4">
                  <Link to="/" className="small">
                    <i className="fa-solid fa-arrow-left me-1"></i>Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;