import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import "./FormStyle.css"
import { Formik, Form, Field, ErrorMessage } from "formik"

import { useFormContext } from "./FormContext"



export const FormMemo = () => {
    
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();
  
    const SignupSchema = Yup.object().shape({

        autor: Yup.string().min(4, 'Muy corto!').max(20, 'demasiado extenso!')
            .required('Debe ingresar un dato'),
        destino: Yup.string().min(3, 'Muy corto!').max(20, 'demasiado extenso!')
            .required('Debe ingresar un dato'),
        asunto: Yup.string().min(4, 'Muy corto!').max(40, 'demasiado extenso!')
            .required('Debe ingresar un dato'),
        memo: Yup.string().min(10, 'Muy corto!')
            .required('Debe ingresar un dato'),
      
     
      });
    const [enviado, setEnviado]= useState(false)
    
    return (
      <>
        <Formik
          initialValues={{
            autor: "",
            destino: "",
            asunto: "",
            memo: ""
           
                }}
                

          /*validacion sin yup al linea 100, se reemplaza con validacion con yup*/

            validationSchema={SignupSchema} //validacion sencilla con Yup
                

          //// accion del form
          onSubmit={(valores, { resetForm }) => {
            console.log(valores);
            setEnviado(true);
            setTimeout(() => {
              setEnviado(false);
            }, 5000);
            resetForm();
            updateFormData(valores);
            navigate("/memorator");
          }}
        >
          {/* Formulario empieza aqui  */}
          {({ errors }) => (
            <Form className="formulario">
              <div>
                <label htmlFor="autor">Autor del Memo</label>
                <Field
                  type="text"
                  id="autor"
                  name="autor"
                  placeholder="Quien hace el memo"
                />
                <ErrorMessage
                  name="autor"
                  component={() => <div className="error">{errors.autor}</div>}
                />
                </div>
                <div>
                <label htmlFor="destino">Dirigido a:</label>
                <Field
                  type="text"
                  id="destino"
                  name="destino"
                  placeholder="A quien va dirigido?"
                />
                <ErrorMessage
                  name="destino"
                  component={() => <div className="error">{errors.destino}</div>}
                />
                </div>
                <div>
                <label htmlFor="asunto">Asunto</label>
                <Field
                  type="text"
                  id="asunto"
                  name="asunto"
                  placeholder="Asunto"
                />
                <ErrorMessage
                  name="asunto"
                  component={() => <div className="error">{errors.asunto}</div>}
                />
                </div>
                <div>
                <label htmlFor="memo">Memo</label>
                <Field
                  as="textarea"
                  id="memo"
                  name="memo"
                  placeholder="Escriba el memo aqui"
                />
                <ErrorMessage
                  name="memo"
                  component={() => <div className="error">{errors.memo}</div>}
                />
              </div>        

              <button type="submit">Generar Memo</button>

              {enviado && <p className="exito">Formulario enviado con exito</p>}
            </Form>
          )}
        </Formik>
      </>
    );




}