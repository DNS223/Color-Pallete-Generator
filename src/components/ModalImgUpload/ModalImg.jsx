import { useRef, useState } from "react";
import styles from "./ModalImg.module.css"
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
export default function ModalImg({setModalImgVisible, handleFileChange}){
    const [file, setFile] = useState()
    const [dropOver, setDropOver] = useState(false)
    const inputRef = useRef(null)
      const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDropOver(true)
      };
      const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDropOver(false)
      };
      const selectFile = (e) =>{
        e.stopPropagation()
        inputRef.current && inputRef.current.click()
      }
    return(
        <div className={styles.modalImgContainer} onClick={()=>setModalImgVisible(false)}>

            <div className={!dropOver ? styles.ModalImg : styles.ModalImgOver} onClick={selectFile} onDrop={handleFileChange} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
              <InsertPhotoOutlinedIcon/>
              <p className={styles.txtModal}>Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno.</p>
            </div>

          <input type="file" onChange={(e)=>handleFileChange(e, true)} ref={inputRef} onClick={(e) => e.stopPropagation()} style={{display:"none"}}/>
        </div>
    )
}