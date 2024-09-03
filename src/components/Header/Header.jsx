import { useRef, useState } from "react";
import styles from "./Header.module.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModalImg from "../ModalImgUpload/ModalImg";

export default function Header({ handleFileChange,setImageSrc, setModalImgVisible }) {
  const inputRef = useRef(null);
 
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.header}>

      <button onClick={()=>setModalImgVisible(true)} className={styles.btnCamera}><CameraAltIcon /></button>
      



    </div>
  );
}
