'use client'
import { useEffect, useState } from "react";
import ColorBar from "../ColorBar/ColorBar";
import styles from "./ColorsContainer.module.css";
import Alert from "../alert/Alert";

export default function ColorsContainer() {
    const [bgColor, setBgColor] = useState([]);
    const [colorNames, setColorNames] = useState([]);
    const [mostrarAlert, setMostrarAlert] =  useState(false)
    useEffect(() => {
        const baseColor = generateRandomBaseColor();
        const palette = generateAnalogousPaletteHex(baseColor);
        setBgColor(palette);
        
        // Obtener los nombres de los colores para la paleta generada
        fetchColorNames(palette);
    }, []);

    function generateRandomBaseColor() {
        let color = '#';
        
        for (let i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 16).toString(16);
        }

        return color;
    }

    function generateAnalogousPaletteHex(baseColor, steps = 5) {
        const hsl = hexToHsl(baseColor);
        const colors = [];
        const hueStep = 30; // Aumento para variación de tonalidades
        const saturationStep = 20; // Variar saturación
        const lightnessStep = 10; // Variar luminosidad

        for (let i = 0; i < steps; i++) {
            let newHue = (hsl.h + hueStep * i) % 360;
            let newSaturation = Math.max(0, Math.min(100, hsl.s + (saturationStep * (i - Math.floor(steps / 2)))));
            let newLightness = Math.max(0, Math.min(100, hsl.l + (lightnessStep * (i - Math.floor(steps / 2)))));

            const newColor = hslToHex(newHue, newSaturation, newLightness);
            colors.push(newColor);


        }
        return colors;
    }
    function fetchColorNames(palette) {
        Promise.all(
            palette.map(color =>
                fetch(`https://www.thecolorapi.com/id?hex=${color.replace('#', '')}`)
                    .then(response => response.json())
                    .then(data => data.name.value)
            )
        )
        .then(names => setColorNames(names))
        .catch(error => console.error('Error fetching color names:', error));
    }

    // Convertir hexadecimal a HSL
    function hexToHsl(hex) {
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16) / 255;
        let g = parseInt(hex.substring(2, 4), 16) / 255;
        let b = parseInt(hex.substring(4, 6), 16) / 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    // Convertir HSL a hexadecimal
    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

        r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
        g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
        b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

        return `#${r}${g}${b}`;
    }
    function isDark(color) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        // Usar la fórmula para calcular la luminancia relativa
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        return luminance < 0.7;
    }
    console.log(colorNames ? colorNames[0] : "")
    const MostrarAlert=(valor)=>{
        setMostrarAlert(valor)
        setTimeout(() => {
            setMostrarAlert(false)
          }, 1000);
    }
    const eliminarColor = (index)=>{
        const nuevoBgColor = [...bgColor];
    nuevoBgColor.splice(index, 1);

    setBgColor(nuevoBgColor);
    }

    return (
        <div className={styles.ColorsContainer} id="contenedorColors">
            {bgColor.map((color, index) => {
                return(<ColorBar key={index} index={index} bgColor={color} textColor={isDark(color) ? '#FFFFFF' : '#2b2b2b   '} name={colorNames[index]} setAlert={MostrarAlert}
                eliminar={()=>eliminarColor(index)} cantidad={bgColor.length}/>)
                
            })}
            <div className={styles.alertContainer}>
            {mostrarAlert && <Alert/>}
            </div>
            
        </div>
    );
}
