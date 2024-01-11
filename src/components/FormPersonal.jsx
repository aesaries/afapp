import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import "./FormStyle.css"
import { Formik, Form, Field, ErrorMessage } from "formik"

import { useFormContext } from "./FormContext"



export const FormPersonal = () => {
    
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();
  
    const SignupSchema = Yup.object().shape({

        campo: Yup.string()
     
            .min(1, 'demasiado corto!')
     
            .max(20, 'te pasaste!')
            
           
            .required('Debe ingresar un dato'),
     
      
     
      });
    const [enviado, setEnviado]= useState(false)
    
    return (
      <>
        <Formik
          initialValues={{
                    campo: "",
              parametro: "Legajo"
              
          }}
          /*validacion sin yup al linea 100, se reemplaza con validacion con yup*/

             validationSchema={SignupSchema}  //validacion sencilla con Yup
                
        //// accion del form 
        onSubmit={(valores, {resetForm}) => {
                        
          console.log(valores);
          setEnviado(true);
          setTimeout(() => {setEnviado(false);}, 5000);
          resetForm();
          updateFormData(valores);
          navigate('/resultado');
            
          }}
        >
          
         {/* Formulario empieza aqui  */}
          {({ errors }) => (
            <Form className="formulario">
              <div>
                <label htmlFor="nombre">Dato a buscar</label>
                <Field
                  type="text"
                  id="campo"
                  name="campo"
                  placeholder="Ingrese Legajo o Apellido"
                />
                <ErrorMessage
                  name="campo"
                  component={() => <div className="error">{errors.campo}</div>}
                />
              </div>
              <label id="my-radio-group">Buscar por:</label>
              <div role="group" aria-labelledby="my-radio-group" className="radioBusca">
                <label>
                  <Field type="radio" name="parametro" value="Legajo" />
                  Legajo
                </label>
                <label>
                  <Field type="radio" name="parametro" value="Apellido" />
                  Apellido
                </label>
              
              </div>
              
                <button type="submit">Enviar</button>
                
             
              {enviado && <p className="exito">Formulario enviado con exito</p>}
            </Form>
          )}
        </Formik>
      </>
    );




}

