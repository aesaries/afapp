import './Cabezal.css';
import { logoPng } from "../../public/logoaf.png";

export const Cabezal = () => {
    
    return (
      <nav>
        <img src= {logoPng} alt='LogoAf' className="logo"></img>
        <div className="barnav">
          <div>Agrotecnica Fueguina</div>
          
        </div>
      </nav>
    );


}