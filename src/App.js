import React,{ Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';

function App() {

  // definir la categoria y noticias 
  const [categoria, guardarCategoria] = useState('');
  const [noticias, guardarNoticias] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      
      const keyID = process.env.REACT_APP_KEY;
      const baseUrl = process.env.REACT_APP_URL;
      const url = `${baseUrl}${categoria}&apiKey=${keyID}`;

      const respuesta = await fetch(url);
      const noticias = await respuesta.json();
      console.log(noticias)

      guardarNoticias(noticias.articles);
    }
    consultarAPI();
  }, [categoria])


  return (
    <Fragment>
      <Header 
        titulo="Buscador de Noticias"
      />

      <div className="container white">
        <Formulario 
          guardarCategoria={ guardarCategoria}
        />
        <ListadoNoticias 
          noticias={noticias}
        />
      </div>
    </Fragment>
  );
}

export default App;
