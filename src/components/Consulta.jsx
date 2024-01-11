import { useState } from "react"
import * as Yup from 'yup'
import "./FormStyle.css"
import { Formik, Form, Field, ErrorMessage } from "formik"

export const Consulta = () => {

    const NOMBREREGEX = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$" ///para validar solo letras espacios sin numeros
    const SignupSchema = Yup.object().shape({

        nombre: Yup.string()
     
            .min(2, 'Too Short!')
     
            .max(50, 'Too Long!')
           
        
            .matches(NOMBREREGEX, 'Solo letras')
     
            .required('Debe ingresar un Nombre'),
     
       correo: Yup.string().email('Email Invalido').required('RDebe ingresar un correo'),
     
      });
    const {enviado, setEnviado}= useState(false)
    
    return (

        <>
            <Formik
                initialValues={{
                    nombre: "",
                    correo: ""
                }}
                /*validacion sin yup al linea 100, se reemplaza con validacion con yup*/

                validationSchema={SignupSchema}

                onSubmit={(valores) => {
                   
                    console.log(valores)
                    console.log("Formulario enviado")
                    setEnviado(true)
                    setTimeout(() => {
                        setEnviado(false)
                    }, 5000);

                }}


            >
                {({ errors }) => (
                    <Form className="formulario">
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder = "Ingrese nombre"
                            
                            />
                            <ErrorMessage name="nombre" component={() => (
                                <div className="error">{errors.nombre}</div>
                            )} />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo</label>
                            <Field
                                type="mail"
                                id="correo"
                                name="correo"
                                placeholder = "Ingrese correo"
                            
                            />
                            <ErrorMessage name="correo" component={() => (
                                <div className="error">{errors.correo}</div>
                            )} />
                        </div>
                        <button type="submit">Enviar</button>
                        {enviado && <p className="exito">Formulario enviado con exito</p>}
                                              

                    </Form>

                    
                    
                )}    

            </Formik>
        
        
        </>



    )




}

// Validacion sin YUP
/* validate={(valores) => {
    let errores = {}
    console.log(errores.nombre)

    ////// validacion Nombre 
    if (!valores.nombre) {
        errores.nombre = "por favor ingrese un nombre"
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
        errores.nombre = "debe tener letras y espacios"
    }
    ////// validacion Correo
    if (!valores.correo) {
        errores.correo = "por favor ingrese un correo"
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)) {
        errores.correo = "debe tener formato de correo"
    }    

    return errores;
 }} */