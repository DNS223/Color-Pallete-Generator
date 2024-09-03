"use client"
import { useEffect, useState } from 'react';
import ColorsContainer from "@/components/ColorsContainer/ColorsContainer";
import ColorThief from 'colorthief';
import styles from "./page.module.css"
import Header from '@/components/Header/Header';
import ModalImg from '@/components/ModalImgUpload/ModalImg';
import LinkModal from '@/components/LinkModal/LinkModal';
export default function Home() {
  const [paleta, setPaleta] = useState()
  const [colors, setColors] = useState()
  const [imageSrc, setImageSrc] = useState("");

  const [modalImgVisible, setModalImgVisible] = useState(false)
  const [modalLinkVisible, setModalLinkVisible] = useState(false)
  const [imgError, setImgError] =  useState()
  const [cantidadColores, setCantidadColores] =  useState(5)
  const [newColor, setNewColor] =  useState()
// Cuando se cambie la imagen se genera una nueva paleta
  useEffect(() => {
  
    if(imageSrc){
      const getPalette = async () => {
        try {
          const image = new Image();
          image.crossOrigin = 'Anonymous'; 
          image.src = imageSrc;
            
            image.onload = () => {
              const colorThief = new ColorThief();
              const palette = colorThief.getPalette(image, parseInt(cantidadColores) );
              setPaleta(palette);
            };
           
     
            image.onerror = (err) => {
              console.error('Image loading error:', err);
              setImgError("El link no soporta la petición. Por favor seleccione otro o seleccione el archivo.")
            };
         
        } catch (err) {
          console.error('Error:', err);
        }
      };
      getPalette();
    }
    
  }, [imageSrc, cantidadColores]);
console.log(cantidadColores)
  // Obtiene el archivo y genera una url
  const handleFileChange = (e, input) => {
    
    let file
    if(input){
      file=e.target.files[0]
    }else{
      e.preventDefault()
      console.log(e.dataTransfer.items)
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length) {
        file = droppedFiles[0];
      }
    }
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      
    }
    setModalImgVisible(false)
  };

  

  // Cuando se genere la paleta, se crea un arreglo con los colores en formato hexadecimal, este se enviará para generar las columnas de colores
  useEffect(()=>{
    if(paleta){
      const colores=[]
      paleta.map((color)=>{
        colores.push(`${'#' + color.map(x => x.toString(16).padStart(2, '0')).join('')}`)
      })
      setColors(colores)
    }
  },[paleta])

  console.log(newColor)

  return (
    <div >
      <Header handleFileChange={handleFileChange} setImageSrc={setImageSrc} setModalImgVisible={setModalImgVisible} setModalLinkVisible={setModalLinkVisible} setNewColor={setNewColor}/>
      {/* <input type="file" onChange={handleFileChange}/> */}
      <ColorsContainer imgColors={colors} newColor={newColor}/>
      {modalImgVisible && <ModalImg setModalImgVisible={setModalImgVisible} handleFileChange={handleFileChange}/>}
      {modalLinkVisible && <LinkModal setModalLinkVisible={setModalLinkVisible} setImageSrc={setImageSrc} mjsError={imgError} setImgError={setImgError} setCantidadColores={setCantidadColores}/>}
    </div>
  );
}
