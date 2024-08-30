import { useState } from "react";
import styles from "./ColorBar.module.css"
import Opcion from "../opcion/Opcion";
export default function ColorBar({bgColor, textColor, name, setAlert, eliminar, cantidad}){
    const [visibleOpciones, setVisibleOpciones] = useState(false)
    console.log(cantidad)
    return(
        <div className={styles.ColorBar} style={{backgroundColor:bgColor, width:`calc(100vw / ${cantidad})`}} onMouseOver={()=>setVisibleOpciones(true)} onMouseLeave={()=>setVisibleOpciones(false)}>
            {visibleOpciones && <div className={styles.opcionesBar}>
            {cantidad>2 && <Opcion textColor={textColor} color={bgColor} setAlert={setAlert} eliminar={eliminar} /> }
            <Opcion textColor={textColor} color={bgColor} setAlert={setAlert} />  
            </div>}
            
            <h1 style={{marginBottom:"20px", color:textColor}}>{bgColor}</h1>
            <p style={{marginBottom:"105px", color:textColor}}>{name}</p>
        </div>
    )
}