import { useState } from "react";
import styles from "./ColorBar.module.css"
import Opcion from "../opcion/Opcion";
export default function ColorBar({bgColor, textColor, name}){
    const [visibleOpciones, setVisibleOpciones] = useState(false)
    console.log(name)
    return(
        <div className={styles.ColorBar} style={{backgroundColor:bgColor}} onMouseOver={()=>setVisibleOpciones(true)} onMouseLeave={()=>setVisibleOpciones(false)}>
            {visibleOpciones && <div className={styles.opcionesBar}>
            <Opcion textColor={textColor} color={bgColor}/>   
            </div>}
            
            <h1 style={{marginBottom:"20px", color:textColor}}>{bgColor}</h1>
            <p style={{marginBottom:"105px", color:textColor}}>{name}</p>
        </div>
    )
}