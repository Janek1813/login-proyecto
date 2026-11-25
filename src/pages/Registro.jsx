import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';
import FormInput from '../components/FormInput.jsx';
import { alertaError, alertaExito } from '../utils/alerts.js';
import { buscarPorCorreo, guardarUsuario } from '../utils/usuarios.js';

const inicial = {
  nombre: '', ap_paterno: '', ap_materno: '', correo: '', password: '', fecha_nacimiento: '',
};

const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

const validar = (v) => {
  const e = {};
  if (!soloLetras.test(v.nombre.trim())) e.nombre = 'El nombre solo permite letras y espacios';
  if (!soloLetras.test(v.ap_paterno.trim())) e.ap_paterno = 'El apellido paterno solo permite letras y espacios';
  if (!soloLetras.test(v.ap_materno.trim())) e.ap_materno = 'El apellido materno solo permite letras y espacios';
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v.correo)) e.correo = 'Ingresa un email válido, por ejemplo xx@gmail.com';
  if (!/^(?=.*[A-Z]).{8,30}$/.test(v.password)) e.password = 'Mínimo 8 caracteres y una mayúscula';
  if (!v.fecha_nacimiento) e.fecha_nacimiento = 'La fecha de nacimiento es obligatoria';
  return e;
};

const Registro = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(inicial, validar);

  const registrar = (datos) => {
    if (buscarPorCorreo(datos.correo)) {
      alertaError('Correo ya registrado', 'Intenta iniciar sesión con ese correo.');
      return;
    }
    guardarUsuario({ ...datos, nombre: datos.nombre.trim() });
    alertaExito('Cuenta creada', 'Ahora inicia sesión').then(() => navigate('/login'));
  };

  return (
    <div className="row justify-content-center py-3">
      <div className="col-lg-10 col-xl-9">
        <div className="tarjeta overflow-hidden">
          <div className="row g-0">
            {/* Panel izquierdo: formulario */}
            <div className="col-md-7 p-4 p-lg-5">
              <div className="mb-4">
                <h1 className="h3 mb-1">Crear cuenta</h1>
                <p className="text-muted small mb-0">Completa tus datos para registrarte</p>
              </div>

              <form onSubmit={handleSubmit(registrar)} noValidate>
                <FormInput label="Nombre" name="nombre" icono="fa-user" placeholder="Nombre"
                  value={values.nombre} onChange={handleChange} error={errors.nombre} />

                <div className="row">
                  <div className="col-sm-6">
                    <FormInput label="Apellido paterno" name="ap_paterno" icono="fa-id-card" placeholder="Apellido paterno"
                      value={values.ap_paterno} onChange={handleChange} error={errors.ap_paterno} />
                  </div>
                  <div className="col-sm-6">
                    <FormInput label="Apellido materno" name="ap_materno" icono="fa-id-card" placeholder="Apellido materno"
                      value={values.ap_materno} onChange={handleChange} error={errors.ap_materno} />
                  </div>
                </div>

                <FormInput label="Correo" name="correo" type="email" icono="fa-envelope" placeholder="xx@gmail.com"
                  value={values.correo} onChange={handleChange} error={errors.correo} />

                <div className="row">
                  <div className="col-sm-6">
                    <FormInput label="Contraseña" name="password" type="password" icono="fa-lock" placeholder="Mínimo 8 caracteres"
                      value={values.password} onChange={handleChange} error={errors.password} />
                  </div>
                  <div className="col-sm-6">
                    <FormInput label="Fecha de nacimiento" name="fecha_nacimiento" type="date" icono="fa-calendar-days"
                      value={values.fecha_nacimiento} onChange={handleChange} error={errors.fecha_nacimiento} />
                  </div>
                </div>

                <button type="submit" className="btn btn-morado btn-lg w-100 mt-2">
                  Crear cuenta
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </form>

              {/* Visible solo en móvil, donde se oculta el panel derecho */}
              <div className="d-md-none text-center mt-3">
                <span className="text-muted small">¿Ya tienes cuenta? </span>
                <Link to="/login" className="small fw-semibold">Inicia sesión</Link>
              </div>

              <div className="text-center mt-4">
                <Link to="/" className="small">
                  <i className="fa-solid fa-arrow-left me-1"></i>Volver al inicio
                </Link>
              </div>
            </div>

            {/* Panel derecho: bienvenida */}
            <div className="col-md-5 d-none d-md-flex hero rounded-0 flex-column justify-content-center align-items-center text-center p-4">
              <span
                className="icono-circulo mb-3"
                style={{ background: 'rgba(255,255,255,.2)', color: '#fff', borderColor: 'transparent' }}
              >
                <i className="fa-solid fa-user-plus"></i>
              </span>
              <h2 className="h3 text-white mb-2">¡Bienvenido!</h2>
              <p className="mb-4 small" style={{ opacity: 0.9 }}>
                Crea tu cuenta en menos de un minuto y empieza a explorar.
              </p>
              <Link to="/login" className="btn btn-outline-light px-4">
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;