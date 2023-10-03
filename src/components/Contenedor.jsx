import { useState, useEffect } from 'react';
import Card from './Card';
import Paginacion from './Paginacion';

const Contenedor = () => {

    const [pagina, setPagina] = useState(1) //pagina inicial
    const [peliculas, setPeliculas] = useState([]);

    useEffect(()=> {
        //estructura encargada de hacer asincronismo: funcion anónima
        const cargarPeliculas = async () => {
            try {
                const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
                //console.log(respuesta);

                if (!respuesta.ok) { 
                    throw new Error('Error en la solicitud');
                }
                const datos = await respuesta.json();
                //console.log(datos);
                //console.log(datos.page)
                //console.log(datos.total_pages)
                setPeliculas(datos.results);
                setPagina(datos.page);
            }
            catch (error) {
        console.log(error.message);
    }
};

//llamada de funcion para asincronismo
cargarPeliculas()
    }, [pagina])

    const cambiarPagina = (direccion) => {
        if (direccion === 'anterior' && pagina > 1) {
            setPagina(pagina - 1);

        } else if (direccion === 'siguiente' && pagina < 1000) {
            setPagina(pagina + 1);
        }
    }

    //console.log({peliculas})

    return (
        <div style = {{width:'100%'}}>
            <h1>Api de peliculas con React</h1>
            <ul style = {{width:'100%', display:'flex', flexWrap:'wrap', listStyleType:'none'}}>
                {/* como el array viene vacio no toma el metodo map - solucion renderizado condicional con un operador ternario */}
                {peliculas.length > 0 ? (
                    peliculas.map(pelicula => (
                        <li style={{flex:'1'}} className='m-1' key={pelicula.id}>
                            <Card pelicula = {pelicula}/>
                        </li>
                    ))
                ) : (
                    <p> Cargando peliculas</p>
                )
                }
            </ul>
            <Paginacion cambiarPagina={cambiarPagina}/>
        </div>
    )
}

export default Contenedor
