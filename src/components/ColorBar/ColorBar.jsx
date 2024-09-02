import { useState } from "react";
import styles from "./ColorBar.module.css"
import Opcion from "../opcion/Opcion";
export default function ColorBar({bgColor, textColor, name, setAlert, eliminar, cantidad, index, color1, color2, arrayColores, setArrayColores, setNombre}){
    const [visibleOpciones, setVisibleOpciones] = useState(false)
    const [btnNewColorVisible, setBtnNewColorVisible] = useState(false)
    // Generar color intermedio
    function blendColors(color1, color2, factor = 0.5) {
      // Convertir colores hexadecimales a RGB
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      
      // Asegurarse de que el factor esté entre 0 y 1
      factor = Math.max(Math.min(factor, 1), 0);
      
      // Calcular el color mezclado para cada componente
      const blendedRgb = {
        r: Math.round(rgb1.r * (1 - factor) + rgb2.r * factor),
        g: Math.round(rgb1.g * (1 - factor) + rgb2.g * factor),
        b: Math.round(rgb1.b * (1 - factor) + rgb2.b * factor)
      };
    
      // Convertir el color RGB resultante de nuevo a hexadecimal
      return rgbToHex(blendedRgb);
    }
      
      // Función para convertir color hexadecimal a RGB
      function hexToRgb(hex) {
        // Remover el signo de almohadilla (#) si está presente
        hex = hex.replace('#', '');
        
        // Convertir los valores de los componentes a números enteros
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
      
        return { r, g, b };
      }
      
      // Función para convertir color RGB a hexadecimal
      function rgbToHex({ r, g, b }) {
        // Convertir cada componente RGB a un string hexadecimal de dos dígitos
        const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        
        return hex;
      }

    

      const createNewColor = (index)=>{
        const updatedBgColor = [...arrayColores]; // Crea una copia del array
        updatedBgColor.splice(index+1, 0, blendColors(color1, color2)); // Modifica la copia
        setArrayColores(updatedBgColor);
        setNombre(updatedBgColor)
    }
    return(
      <div style={{ display: "flex" }}>
      <div className={styles.ColorBar}
          style={{
              backgroundColor: bgColor,
              width: `calc(100vw / ${cantidad})`,
          }}
          onMouseOver={() => setVisibleOpciones(true)}
          onMouseLeave={() => setVisibleOpciones(false)}
      >
          {visibleOpciones && (
              <div className={styles.opcionesBar}>
                  {cantidad > 2 && (
                      <Opcion
                          textColor={textColor}
                          color={bgColor}
                          setAlert={setAlert}
                          eliminar={eliminar}
                      />
                  )}
                  <Opcion
                      textColor={textColor}
                      color={bgColor}
                      setAlert={setAlert}
                  />
              </div>
          )}
  
          <h1 style={{ marginBottom: "20px", color: textColor }}>{bgColor}</h1>
          <p style={{ marginBottom: "105px", color: textColor }}>{name}</p>
      </div>
  
      {(index< cantidad-1 && cantidad<10) && (
          <div
              className={styles.btnContainer}
              onMouseOver={() => setBtnNewColorVisible(true)}
              onMouseLeave={() => setBtnNewColorVisible(false)}
          >
              <button
                  className={styles.btnAñadirColor}
                  style={
                      btnNewColorVisible
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                  }
                  onClick={() => createNewColor(index)}
              >
                  +
              </button>
          </div>
      )}
  </div>
  
    )
}