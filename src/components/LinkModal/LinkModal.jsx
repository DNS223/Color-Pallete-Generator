import styles from "./LinkModal.module.css"
import InsertLinkIcon from '@mui/icons-material/InsertLink';
export default function LinkModal({setModalLinkVisible, setImageSrc, mjsError,setImgError, setCantidadColores}){
    const closeModal = ()=>{
        setImgError("")
        setModalLinkVisible(false)
    }
    const changeImageUrl= (e)=>{
        setImageSrc(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        setImageSrc(e.target[0].value)
        if(parseInt(e.target[1].value)<=10){
            setCantidadColores(e.target[1].value)
        }else if(parseInt(e.target[1].value)>10){
            setCantidadColores(10)
        }
        
        closeModal()
    }
    return(
        <div className={styles.LinkModalContainer} onClick={closeModal}>
            <div className={styles.LinkModal} onClick={(e)=> e.stopPropagation()}>
                <p style={{position:"absolute", top:"25px"}}> {mjsError ? mjsError : "Ingrese el link de un imagen"}</p>
                <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}><InsertLinkIcon/> <input type="text" required/></div>
                <div className={styles.inputContainer} style={{marginTop:"10px"}}><input type="text" placeholder="Cantidad de colores (max 10)" required/></div>
                <div className={styles.btnContainer}> <button type="submit" className={styles.btnOk}>Ok</button></div>
                </form>
            </div>
        </div>
    )
}