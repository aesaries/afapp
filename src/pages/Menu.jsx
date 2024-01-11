import { Link } from "react-router-dom"
import "./Menu.css"

export const Menu = () => {
     
    return (
        
        <div className="btnContenedor">
            <Link to ="personal">
                <button className="boton">Consulta de Personal</button>
            </Link>
            
            <br />
            <Link to ="memo">
                <button className="boton">Confeccion de Memo</button>
            </Link>
            

        </div>
        
    

    )

}