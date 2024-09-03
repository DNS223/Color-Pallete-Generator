import { useRef, useState } from "react";
import styles from "./Header.module.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function Header({ setModalImgVisible, setModalLinkVisible }) {
  const inputRef = useRef(null);
 
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.Title}>Color Pallete Generator</div>
      <div >
        <p className={styles.txtHeader} >Presiona Espacio para generar una paleta</p>
      </div>
      <div className={styles.btnsContainer}>
      <button onClick={()=>setModalImgVisible(true)} className={styles.btnHeader}><CameraAltIcon /></button>
      <button onClick={()=>setModalLinkVisible(true)} className={styles.btnHeader}><InsertLinkIcon /></button>
      </div>

    </div>
  );
}
