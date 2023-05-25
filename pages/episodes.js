import { useState, useEffect } from "react";

const defaultEndpoint = `https://rickandmortyapi.com/api/episode/`;

export async function getServerSideProps() {
  try {
    const response = await fetch(defaultEndpoint)
    const data = await response.json()
    return {
      props: {
        data
      },
    }
  } catch (error) {
    console.log(error)
  }
}

export default function episodes({ data }) {

  const { info, results: defaultResults = [] } = data;

  const [results, setResults] = useState(defaultResults);

  const [page, setPage] = useState({
    ...info,
    current: defaultEndpoint,
  });

  const { current } = page;

  // estados para el contador de paginas. 
  const [numberPage, setNumberPage] = useState(1);

  useEffect(() => {

    if (current === defaultEndpoint) return;
    
    async function request() {
      const res = await fetch(current)
      const nextData = await res.json();

      setPage({
        current,
        ...nextData.info
      });

      console.log(nextData)

      if (!nextData.info?.prev) {
        setResults(nextData.results);
        return;
      }
      setResults(nextData.results);
    }
    request();
  }, [current]);

// botonera de paginas - setea lo que esta en la ruta (current)
  function nextPage() {
    setPage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    });
    setNumberPage(numberPage + 1);
  }

  function backPage() {
    setPage(prev => {
      return {
        ...prev,
        current: page?.prev
      }
    });
    setNumberPage(numberPage - 1);
  }

  return (
    <div className="row">
      {results.map(result => {
        const { id, name, episode, air_date } = result;
        return (
          <div key={id} className="col-6 col-md-4 col-lg-3">
            <div className="card m-2">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{episode}</h6>
                <p className="card-text">{air_date}</p>
              </div>
            </div>
          </div>
        )
      })
      }
      <div className="d-flex justify-content-md-center mb-4">
        <button className="btn btn-secondary m-1" disabled={page.prev === null} onClick={backPage}>Previus</button>
        {/* aca vemos si el array esta vacio, consultamos con la propiedad length del array resultados que habiamos definido antes */}
        <button className="btn btn-secondary m-1"  disabled={page.next === null} onClick={nextPage}>Next</button>
      </div>
      <span className="mb-3 text-center ">Pagina {numberPage} de {page.pages}</span>
    </div>
  )
}

