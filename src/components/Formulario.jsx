import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";


function Formulario({ cliente }) {
  //Con este hook podemos lograr que una vez completado el formulario nos redirecciona a la pagina principal
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre del cliente es obligatorio")
      .min(3, "El nombre es muy corto")
      .max(25, "El nombre es muy largo"),
    empresa: Yup.string()
      .required("El nombre de la empresa es obligatorio")
      .min(3, "El nombre es muy corto"),
    email: Yup.string()
      .required("El email es obligatorio")
      .email("El email no es valido"),
    telefono: Yup.number()
      .typeError("El numero no es valido")
      .integer("El numero no es valido")
      .positive("El numero no es valido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        //Editando un registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Creando un nuevo cliente
        //La url donde funciona nuestro backend en este caso json server, en metodo GET no hace falta enviar methodo, body, etc
        const url = "http://localhost:4000/clientes";
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      const resultado = await respuesta.json();

      navigate("/clientes");
    } catch (error) {}
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        //Podemos utilizar un ternario o de esta forma mas moderna, Si este codigo no exite agrega este otro
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        //Con esta linea hacemos que tome valores iniciales que provienen desde una api
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          //Ponemos async y await para que el resetForm espere a que se complete el post a la api asi no se pierden los datos
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="Email" className="text-gray-800">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="bg-blue-800 p-3 mt-5 w-full text-white uppercase font-bold text-lg hover:bg-blue-600 cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  )
}

//Con estas lineas si la props llega vacia, es decir estamos creando un nuevo cliente, el initial values toma el valor por default
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
