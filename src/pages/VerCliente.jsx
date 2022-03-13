//Con este hook podemos leer el id de la pagina donde nos encontramos y de esta forma utilizar ese id para acceder a los datos del cliente
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

function VerCliente() {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {}
      
      setTimeout(() => {
        setCargando(false);
      }, 300)
      
    };
    obtenerClienteAPI();
  }, []);

  return (
    cargando ? <Spinner /> : 
    Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
    
    <div>
          <h1 className="font-black text-4xl text-blue-900">
            Ver Cliente: {cliente.nombre}
          </h1>
          <p className="mt-3">Informacion del cliente</p>
          <p className="text-4xl mt-10 text-gray-600">
            <span className="uppercase font-bold text-gray-800">Cliente: </span>{" "}
            {cliente.nombre}
          </p>
          <p className="text-3xl mt-4 text-gray-600">
            <span className="uppercase font-bold text-gray-800">Email: </span>{" "}
            {cliente.email}
          </p>
          {cliente.telefono && (
            <p className="text-3xl mt-4 text-gray-600">
              <span className="uppercase font-bold text-gray-800">
                Telefono:{" "}
              </span>{" "}
              {cliente.telefono}
            </p>
          )}
          <p className="text-3xl mt-4 text-gray-600">
            <span className="uppercase font-bold text-gray-800">Empresa: </span>{" "}
            {cliente.empresa}
          </p>
          {cliente.notas && (
            <p className="text-3xl mt-4 text-gray-600">
              <span className="uppercase font-bold text-gray-800">Notas: </span>{" "}
              {cliente.notas}
            </p>
          )}
    </div>
    )
  );
}
export default VerCliente;
