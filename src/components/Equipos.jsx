import "./Resultado.css"
import equiposData from "../data/Equipos.json"

export const Equipos = () => {
    
    const ordenarPorInterno = () => {
        equiposData.sort((a, b) => {
          const intA = parseInt(a.INTERNO);
          const intB = parseInt(b.INTERNO);
      
          // Manejar el caso de "INTERNO" no es un número
          if (isNaN(intA) && isNaN(intB)) {
            // Si ambos son NaN, no se cambia el orden
            return 0;
          } else if (isNaN(intA)) {
            // Si solo a es NaN, colocar "a" al final
            return 1;
          } else if (isNaN(intB)) {
            // Si solo b es NaN, colocar "b" al final
            return -1;
          }
      
          // Ordenar normalmente si ambos son números
          return intA - intB;
        });
      
        //console.log(datos);
      };

    ordenarPorInterno();
    

    return (
        
        <div className='resultadoContainer'>
        {equiposData.length > 0 ? (
          equiposData.map((item) => (
            <div key={item.INTERNO} className="card">
              <h4>Interno :
                {item.INTERNO}
              </h4>
              <p>Legajo: {item.TIPO}</p>
              <p>Tipo Camion: {item.MODELO}</p>
              <p>Dominio: {item.DOMINIO}</p>
              
                  
                  
              {/* Agrega más campos según sea necesario */}
            </div>
          ))
        ) : (
          <p className='nada'>No se encontraron resultados</p>
        )}
      </div>

    )


}