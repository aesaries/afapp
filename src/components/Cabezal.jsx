import './Cabezal.css';

const savedUser = localStorage.getItem("user");
const userName = savedUser.userName;
const pass = savedUser.password;

export const Cabezal = () => {

  return (
    <nav>
      <img src="/logoaf.png" alt='LogoAf' className="logo"></img>
      <div className="barnav">
        <h1>Agrotecnica Fueguina</h1>
      </div>
      <div>
        <h5>{userName}</h5>
      </div>
    </nav>
  );


}