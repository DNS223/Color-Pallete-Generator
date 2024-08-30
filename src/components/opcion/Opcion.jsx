import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
export default function Opcion({textColor, color}){
    return(
        <button style={{background:"transparent", border:"none"}} onClick={()=>navigator.clipboard.writeText(color)}>
                <ContentCopyOutlinedIcon style={{color:textColor, cursor:"pointer"}}/>
        </button>
    )
}