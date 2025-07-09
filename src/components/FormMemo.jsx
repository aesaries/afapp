import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import "./FormStyle.css"
import { Formik, Form, Field, ErrorMessage } from "formik"
import SignatureCanvas from 'react-signature-canvas'

import { useFormContext } from "./FormContext"

export const FormMemo = () => {
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();
  const sigCanvas = useRef();

  const SignupSchema = Yup.object().shape({
    autor: Yup.string().min(4, 'Muy corto!').max(20, 'demasiado extenso!')
      .required('Debe ingresar un dato'),
    destino: Yup.string().min(3, 'Muy corto!').max(20, 'demasiado extenso!')
      .required('Debe ingresar un dato'),
    asunto: Yup.string().min(4, 'Muy corto!').max(40, 'demasiado extenso!')
      .required('Debe ingresar un dato'),
    memo: Yup.string().min(10, 'Muy corto!')
      .required('Debe ingresar un dato'),
    aclaracionFirma: Yup.string().when("incluirFirma", {
      is: true,
      then: Yup.string().required("Debe aclarar la firma")
    })
  });

  const [enviado, setEnviado] = useState(false)

  return (
    <>
      <Formik
        initialValues={{
          autor: "",
          destino: "",
          asunto: "",
          memo: "",
          incluirFirma: false,
          aclaracionFirma: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(valores, { resetForm }) => {
          const firma = valores.incluirFirma
            ? sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
            : null;

          console.log(valores);
          setEnviado(true);
          setTimeout(() => {
            setEnviado(false);
          }, 5000);
          resetForm();
          updateFormData({ ...valores, firma });
          navigate("/memorator");
        }}
      >
        {({ errors, values }) => (
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

            <div>
              <label>
                <Field type="checkbox" name="incluirFirma" />
                ¿Desea firmar este documento?
              </label>
            </div>

            {values.incluirFirma && (
              <>
                <div>
                  <label>Firma</label>
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{ width: 300, height: 100, className: 'firma-canvas' }}
                    ref={sigCanvas}
                  />
                  <button type="button" onClick={() => sigCanvas.current.clear()}>
                    Limpiar Firma
                  </button>
                </div>

                <div>
                  <label htmlFor="aclaracionFirma">Aclaración de firma</label>
                  <Field
                    type="text"
                    id="aclaracionFirma"
                    name="aclaracionFirma"
                    placeholder="Aclaración"
                  />
                  <ErrorMessage name="aclaracionFirma" component="div" className="error" />
                </div>
              </>
            )}

            <button type="submit">Generar Memo</button>

            {enviado && <p className="exito">Formulario enviado con exito</p>}
          </Form>
        )}
      </Formik>
    </>
  );
}