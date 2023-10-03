import { useState, useEffect } from 'react';
import Card from './Card';

const Contenedor = () => {

    let pagina = 1; //pagina inicial
    const [peliculas, setPeliculas] = useState([]);

    useEffect(()=> {
        //estructura encargada de hacer asincronismo: funcion anónima
        const cargarPeliculas = async () => {
            try {
                const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=1`);
                console.log(respuesta);

                if (!respuesta.status === 200) { 
                    throw new Error('Error en la solicitud');
                }
                const datos = await respuesta.json();
                console.log(datos);
                setPeliculas(datos.results);
            }
            catch (error) {
        console.log(error.message);
    }
};

//llamada de funcion para asincronismo
cargarPeliculas()
    }, [])

    console.log({peliculas})

    return (
        <div style = {{width:'100%'}}>
            <h1>Api de peliculas con React</h1>
            <ul style = {{width:'100%', display:'flex', flexWrap:'wrap', listStyleType:'none'}}>
                {/* como el array viene vacio no toma el metodo map - solucion renderizado condicional con un operador ternario */}
                {peliculas.length > 0 ? (
                    peliculas.map(pelicula => (
                        <li style={{flex:'1'}} className='m-3' key={pelicula.id}>
                            <Card pelicula = {pelicula}/>
                        </li>
                    ))
                ) : (
                    <p> Cargando peliculas</p>
                )
                }
            </ul>
        </div>
    )
}

export default Contenedor
