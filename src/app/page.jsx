"use client"
import { useEffect, useState } from 'react';
import ColorsContainer from "@/components/ColorsContainer/ColorsContainer";
import ColorThief from 'colorthief';
import styles from "./page.module.css"
import Header from '@/components/Header/Header';
export default function Home() {
  const [paleta, setPaleta] = useState()
  const [colors, setColors] = useState()
  const [imageSrc, setImageSrc] = useState("");

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
              const palette = colorThief.getPalette(image, 5);
              setPaleta(palette);
            };
           
     
            image.onerror = (err) => {
              console.error('Image loading error:', err);
            };
         
        } catch (err) {
          console.error('Error:', err);
        }
      };
      getPalette();
    }
    
  }, [imageSrc]);

  // Obtiene el archivo y genera una url
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  
  
console.log(colors)
  return (
    <div>
      <Header handleFileChange={handleFileChange} setImageSrc={setImageSrc}/>
      {/* <input type="file" onChange={handleFileChange}/> */}
      <ColorsContainer imgColors={colors}/>
    </div>
  );
}
