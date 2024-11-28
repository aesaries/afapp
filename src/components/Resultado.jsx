import { useFormContext } from './FormContext';
import "./Resultado.css"
import personalData from "../data/Personal.json"

const filtrarDatos = (campo, parametro) => {
  return personalData.filter(item => {
    if (parametro === "Legajo") {
      return item.Legajo.toString().startsWith(campo);
    } else if (parametro === "Apellido") {
      return item.Apellido.toLowerCase().includes(campo.toLowerCase());
    }
    // Agrega más casos según tus necesidades
    return false;
  });
}

export const Resultado = () => {
  const { formData } = useFormContext();
  const campo = formData.campo
  const parametro = formData.parametro

  const resultados = filtrarDatos(campo, parametro);

  return (
    <div className='resultadoContainer'>
      {resultados.length > 0 ? (
        resultados.map((item) => (
          <div key={item.Legajo} className="card">
            <h4>
              {item.Apellido}, {item.Nombres}
            </h4>
            <p>Legajo: {item.Legajo}</p>
            <p>Documento: {item.Documento}</p>
            <p>Fecha Ingreso: {item.Alta}</p>
            <p>Fecha Nac: {item.F_Nacimiento}</p>
            <p>Categoria: {item.Categoria}</p>
            <p>Sector: {item.Sector}</p>


            {/* Agrega más campos según sea necesario */}
          </div>
        ))
      ) : (
        <p className='nada'>No se encontraron resultados</p>
      )}
    </div>
  );
}