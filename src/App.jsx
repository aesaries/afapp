
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { FormProvider } from "./components/FormContext"
import { Cabezal } from './components/Cabezal'
import { Menu } from './pages/Menu'
import { Pie } from './components/Pie'
import { Memo } from "./pages/Memos"
import { Personal } from "./pages/Personal"
import { Memorator } from "./components/Memorator"
import './App.css'
import { Resultado } from "./components/Resultado"
import { Equipos } from "./components/Equipos"

function App() {
 

  return (
    <>
     
      <BrowserRouter>
        <Link to="/">
            <Cabezal />
        </Link>
        <FormProvider>
          <Routes>

            <Route path="/" element={<Menu />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/memo" element={<Memo />} />
            <Route path="/resultado" element={<Resultado />} />
            <Route path="/memorator" element={<Memorator />} />
            <Route path="/equipos" element={<Equipos />} />

          </Routes>
        </FormProvider>


        <Pie />
      </BrowserRouter>
      
      
    

      

    </>
  )
}

export default App
