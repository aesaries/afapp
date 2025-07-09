import { useFormContext } from './FormContext';
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "./Memorator.css"

const fecha = new Date()

function asignaFecha(){
    const diaHoy = fecha.getDate();
    const mesHoy = fecha.getMonth()+1;
    const anioHoy = fecha.getFullYear()-2000;
    return  diaHoy + "/" + mesHoy + "/" + anioHoy;
}

function generaCodigo(){
    return fecha.getFullYear()-2000 + "-" 
    + fecha.getMonth()+1 + fecha.getDate().toString().padStart(2, '0')
    +"-" +  fecha.getHours() + fecha.getMinutes().toString().padStart(2, '0')
    +fecha.getSeconds().toString().padStart(2, '0')
}

function generatePDF(autor, destino, asunto, memo, fechaHoy, codigo, firma, aclaracionFirma) {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a5',
    });

    const margin = 6;

    // Marco
    doc.rect(margin, margin, doc.internal.pageSize.width - 2 * margin, doc.internal.pageSize.height - 2 * margin);

    // Imagen/logo
    const img = new Image();
    img.src = "/logoaf.png";
    doc.addImage(img, 'JPEG', margin + 2, margin, 15, 15);

    doc.setFontSize(11)
    doc.text('AGROTECNICA FUEGUINA Memo :', margin + 50, margin + 10);
    doc.text(codigo, margin + 118 , margin + 10 );

    doc.setFontSize(10)
    doc.text("Para: ", 12, 30 )
    doc.text(destino, 23, 30 )

    doc.text("Fecha: ", 150 , 30 )
    doc.text(fechaHoy, 163 , 30 )

    doc.text("Asunto: ", 12, 37 )
    doc.text(asunto, 29, 37 )

    doc.text("De:", 150, 37 )
    doc.text(autor, 159, 37 )

    const siguienteRenglonY2 = margin + 41;
    doc.text(memo, margin + 2, siguienteRenglonY2, { maxWidth: doc.internal.pageSize.width - 3 * margin });

    // Líneas decorativas
    doc.line(margin + 50 ,margin + 11, margin + 150, margin + 11)
    doc.line(30,24, 170,24)
    doc.line(21,31, 70,31)
    doc.line(161,31, 191,31)
    doc.line(26,38, 70,38)
    doc.line(156,38, 191,38)

    // Pie de página
    const pieDePaginaY = doc.internal.pageSize.height - margin - 5;

    doc.setFontSize(6)
    doc.line(margin + 160 ,pieDePaginaY + 1, margin + 190 ,pieDePaginaY + 1)
    doc.text('Realizado por', margin + 165 , pieDePaginaY + 3);
    doc.setFontSize(10)
    doc.text(autor, margin + 160, pieDePaginaY);

    // ✅ Firma (si está activada)
    if (firma) {
        doc.addImage(firma, 'PNG', 20, doc.internal.pageSize.height - 40, 60, 20);
        doc.setFontSize(6);
        doc.text(`Firma: ${aclaracionFirma}`, 25, doc.internal.pageSize.height - 18);
    }

    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDay();
    doc.save(autor + mes+ dia + ".pdf");
}

export const Memorator = () => {
    const { formData } = useFormContext();
    const { autor, destino, asunto, memo, firma, aclaracionFirma } = formData;

    const fechaHoy = asignaFecha();
    const codigo = generaCodigo();

    return (
        <div>  
            <Link to="/">
                <div className="mensaje" onClick={() => { 
                    generatePDF(autor, destino, asunto, memo, fechaHoy, codigo, firma, aclaracionFirma) 
                }}>
                    <p>Datos Procesados con éxito</p>
                    <p>Presiona aquí para descargar el archivo y volver al menú</p>
                </div>
            </Link>
        </div>
    );
}
