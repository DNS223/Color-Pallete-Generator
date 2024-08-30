import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Alert from '../alert/Alert';
import { useState } from 'react';
export default function Opcion({textColor, color, setAlert}){
    const [mostrarAlert, setMostrarAlert] =  useState(false)
    const Copiar = ()=>{
        navigator.clipboard.writeText(color)
        setAlert(true)
    }
    return(
        <>
        <button style={{background:"transparent", border:"none"}} onClick={Copiar}>
                <ContentCopyOutlinedIcon style={{color:textColor, cursor:"pointer"}}/>
        </button>
        </>
    )
}