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


function generatePDF(autor, destino, asunto, memo, fechaHoy, codigo) {
    
    
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a5',
      });
      
      const margin = 6;
         
      // Dibujar un cuadro que marque el margen de la hoja
      doc.rect(margin, margin, doc.internal.pageSize.width - 2 * margin, doc.internal.pageSize.height - 2 * margin)
  
    // Agregar una imagen en la parte izquierda
    const img = new Image();
    img.src = "/logoaf.png"; // Reemplaza con la ruta real de tu imagen
    doc.addImage(img, 'JPEG', margin + 2, margin, 15, 15);
  
    // Agregar texto "Agrotecnica" en la misma línea que la imagen
    
    doc.setFontSize(11)
    doc.text('AGROTECNICA FUEGUINA Memo :', margin + 50, margin + 10);
    doc.text(codigo, margin + 118 , margin + 10 )
    
  
  
    doc.setFontSize(10)
    doc.text("Para: ", 12, 30 )
    doc.text(destino, 23, 30 )

    doc.text("Fecha: ", 150 , 30 )
    doc.text(fechaHoy, 163 , 30 )
    
    doc.text("Asunto: ", 12, 37 )
    doc.text(asunto, 29, 37 )

    doc.text("De:", 150, 37 )
    doc.text(autor, 159, 37 )
  
    const siguienteRenglonY = margin + 40;
    const siguienteRenglonY2 = siguienteRenglonY + 1;
  
    const memoVariable = memo
    doc.text(memoVariable, margin + 2, siguienteRenglonY2, { maxWidth: doc.internal.pageSize.width - 3 * margin });
      
  
    doc.line(margin + 50 ,margin + 11, margin + 150, margin + 11) //subrallado de titulo
    doc.line(30,24, 170,24) ///separador de titulo
    doc.line(21,31, 70,31) // subrrallado de PARA
    doc.line(161,31, 191,31) // subrrallado de FECHA
    doc.line(26,38, 70,38) // subrrallado de ASUNTO
    doc.line(156,38, 191,38) // subrrallado de DE
    
    
  
  
    // Pie de página
    const pieDePaginaY = doc.internal.pageSize.height - margin - 5;
      
    // Variable del autor subrayada
    const autorSubrayado = autor;
    doc.text(autorSubrayado, margin + 160, pieDePaginaY);
    
    // Texto "Autor" debajo del subrayado
    doc.setFontSize(6)
    doc.line(margin + 160 ,pieDePaginaY + 1, margin + 190 ,pieDePaginaY + 1) // subrrallado de Realizadopor
    doc.text('Realizado por', margin + 165 , pieDePaginaY + 3);
  


    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDay();



    doc.save(autor + mes+ dia + ".pdf");
    
    /* var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close(); */


    return;
}

export const Memorator = () => {
    const { formData } = useFormContext();
    const autor = formData.autor
    const destino = formData.destino
    const asunto = formData.asunto
    const memo = formData.memo

    const fechaHoy = asignaFecha()
    const codigo = generaCodigo()
    

    
   


    return(
        <div>  
            <Link to="/">
                <div className="mensaje" onClick={() => { generatePDF(autor, destino, asunto, memo, fechaHoy, codigo) }} >

                <p>Datos Procesados con exito!!!</p>
                <p>Presiona aqui para Descargar el archivo y volver a Menu</p>

                </div>
            </Link>

        </div>

    )

}