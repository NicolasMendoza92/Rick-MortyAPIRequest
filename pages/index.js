

import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/'


export async function getServerSideProps() {
  try {
    // sintaxis para traer info de una API - debo fijarme cual es el array en este caso "results"- aca puedo acceder a todas las prop y vbales que me tiene la API
    const response = await fetch(defaultEndpoint);
    const data = await response.json();
    return {
      props: {
        data
      }
    }

  } catch (error) {
    console.log(error)
  }
}

export default function Home({ data }) {
  // destructuramos toda la info que viene de data, y descoponemos los objetos.
  const { info, results: defaultResults = [] } = data;

  const [results, setResults] = useState(defaultResults);

  const [page, setPage] = useState({
    ...info,
    current: defaultEndpoint,
  });

  const { current } = page;

  useEffect(() => {

    if (current === defaultEndpoint) return;

    // como a useEffect no se puede hacer asincronica, tenemos que crear una nueva dentro 
    async function request() {
      const res = await fetch(current)
      const nextData = await res.json();

      setPage({
        current,
        ...nextData.info
      });

      // si no hay "prev" es que estamos en la primera, entonces reemplazamos los resultados 
      if (!nextData.info?.prev) {
        setResults(nextData.results);
        return;
      }
      setResults(prev => {
        return [
          ...prev,
          ...nextData.results
        ]
      });
    }

    request();
  }, [current]);

  // cargar mas personajes, hace la consulta nuevamente. 
  function handleLoadMore() {
    setPage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    });
  }

  // buscador de personajes 
  function handleOnChangeSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldCharacter = fields.find(field => field.name === 'characters');

    const value = fieldCharacter.value || '';
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    setPage({
      current: endpoint
    });
  }



  return (
    <div className='container'>
      <h1 className='text-center'>Personajes</h1>
      <form className="d-flex" onChange={handleOnChangeSearch}>
        <input className="form-control me-2" name="characters" type="search" placeholder="Buscar" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit"><FaSearch /></button>
      </form>
      <div className="row justify-content-center p-2">
        {results.map(result => {
          const { id, name, image } = result;
          return (
            <div className="col-12 col-md-6 col-xl-4">
                <Link href="/character/[id]" as={`/character/${id}`}>
                    <div className="card p-2 m-2">
                        <img src={image} className="card-img-top" alt={name} />
                        <div className="card-body">
                            <p className="card-text">{name}</p>
                        </div>
                    </div>
                </Link>
            </div>
          )
        })}

      </div>
      <div className='text-center'>
          <button className='btn btn-primary' onClick={handleLoadMore}>Cargar Mas</button>
      </div>
    </div>
  );
}




