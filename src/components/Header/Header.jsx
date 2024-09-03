import { useRef, useState } from "react";
import styles from "./Header.module.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ColorLensIcon from '@mui/icons-material/ColorLens';
export default function Header({ setModalImgVisible, setModalLinkVisible, setNewColor }) {
  const inputRef = useRef(null);
 

  return (
    <div className={styles.header}>
      <div className={styles.Title}>Color Pallete Generator</div>
      <div >
        <p className={styles.txtHeader} >Presiona Espacio para generar una paleta</p>
      </div>
      <div className={styles.btnsContainer}>
      <button onClick={()=> inputRef.current && inputRef.current.click()} className={styles.btnHeader}><ColorLensIcon /></button>
      <button onClick={()=>setModalImgVisible(true)} className={styles.btnHeader}><CameraAltIcon /></button>
      <button onClick={()=>setModalLinkVisible(true)} className={styles.btnHeader}><InsertLinkIcon /></button>
      </div>
      <input type="color" name="" id="" ref={inputRef} style={{visibility:"hidden", position:"absolute", right:"200px"}} onChange={(e)=>setNewColor(e.target.value)}/>
    </div>
  );
}
