import { useRef } from "react";
import styles from "./Header.module.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function Header({ handleFileChange,setImageSrc }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.header}>
      <button className={styles.btnCamera} style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}} onClick={handleClick}><CameraAltIcon /></button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
