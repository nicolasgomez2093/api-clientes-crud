import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Formulario from "../components/Formulario"
import Spinner from "../components/Spinner";

function EditarClientes() {
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
    <>
        <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
        <p className="mt-3">Utiliza este formulario apra editar los datos de un cliente</p>
        {cargando ? <Spinner /> : cliente?.nombre ? <Formulario cliente={cliente}/> : <p className="mt-10 text-4xl text-center text-red-700 uppercase font-bold">Este cliente no existe</p>}
    </>
  )
}
export default EditarClientes