import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";
import Spinner from "../components/Spinner";

function Inicio() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {}
      setTimeout(() => {
        setCargando(false);
      }, 300);
    };
    obtenerClientes();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("Deseas eliminar este cliente?");
    if (confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        await respuesta.json();

        //recargo la aplicacion mediante el state sin recargar la pagina y hacer un nuevo llamado a la API
        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {}
    }
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      {cargando ? (
        <Spinner className="mx-auto" />
      ) : (
        <table className="w-full mt-5 table-auto shadow bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Empresa</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default Inicio;
