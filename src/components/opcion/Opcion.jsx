import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Alert from '../alert/Alert';
import { useState } from 'react';
export default function Opcion({textColor, color, setAlert, eliminar,key}){
    const [mostrarAlert, setMostrarAlert] =  useState(false)
    const Copiar = ()=>{
        navigator.clipboard.writeText(color)
        setAlert(true)
    }
    return(
        <div>
        {eliminar ?  
        <button style={{background:"transparent", border:"none"}} onClick={eliminar}>
            <CloseOutlinedIcon style={{color:textColor, cursor:"pointer"}}/>
        </button> 
        :
        <button style={{background:"transparent", border:"none"}} onClick={Copiar}>
        <ContentCopyOutlinedIcon style={{color:textColor, cursor:"pointer"}}/>
        </button>
        }
        </div>
    )
}