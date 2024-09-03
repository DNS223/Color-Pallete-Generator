import styles from "./LinkModal.module.css"
import InsertLinkIcon from '@mui/icons-material/InsertLink';
export default function LinkModal({setModalLinkVisible, setImageSrc}){
    const changeImageUrl= (e)=>{
        setImageSrc(e.target.value)
    }
    return(
        <div className={styles.LinkModalContainer} onClick={()=>setModalLinkVisible(false)}>
            <div className={styles.LinkModal} onClick={(e)=> e.stopPropagation()}>
                <p> Ingrese el link de un imagen</p>
                <div className={styles.inputContainer}><InsertLinkIcon/> <input type="text" onChange={changeImageUrl}/></div>
              
            </div>
        </div>
    )
}