import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Contexto from "../context/Contexto";

const Home = () => {
  const navigate = useNavigate();
  const { usuario, cerrar_sesion } = useContext(Contexto);

  const nombreUsuario =
    typeof usuario === "string"
      ? usuario
      : usuario?.usuario || usuario?.nombre || usuario?.correo || "";

  const logout = () => {
    cerrar_sesion();
    Swal.fire({
      icon: "success",
      title: "Cerrando sesión!",
      text: "Estás siendo redirigido",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="hero p-4 p-md-5 mb-4">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
          <div className="d-flex align-items-center gap-3 text-center text-md-start flex-column flex-md-row">
            {nombreUsuario && (
              <span
                className="icono-circulo flex-shrink-0"
                style={{
                  width: 80,
                  height: 80,
                  fontSize: "2rem",
                  fontWeight: 700,
                  background: "rgba(255,255,255,.2)",
                  color: "#fff",
                  borderColor: "transparent",
                }}
              >
                {nombreUsuario.charAt(0).toUpperCase()}
              </span>
            )}
            <div>
              <h1 className="display-6 fw-bold text-white mb-1">Bienvenido</h1>
              {nombreUsuario && (
                <p className="mb-0" style={{ opacity: 0.9 }}>
                  <i className="fa-solid fa-circle-user me-2"></i>
                  {nombreUsuario}
                </p>
              )}
            </div>
          </div>

          {usuario && (
            <button onClick={logout} className="btn btn-danger px-4">
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Cerrar sesión
            </button>
          )}
        </div>
      </section>

      {/* Búsqueda por ID */}
      <section className="row justify-content-center">
        <div className="col-lg-8">
          <div className="tarjeta p-4">
            <div className="d-flex flex-column flex-md-row align-items-center gap-4 text-center text-md-start">
              <span className="icono-circulo flex-shrink-0">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>

              <div className="flex-grow-1">
                <h2 className="h5 mb-1">Busca por ID</h2>
              </div>

              <Link to="/personaje/1" className="btn btn-outline-morado flex-shrink-0">
                Ejemplo: Rick Sanchez
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;