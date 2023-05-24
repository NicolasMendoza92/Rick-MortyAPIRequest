const defaultEndpoint = `https://rickandmortyapi.com/api/episode/`;

export async function getStaticProps() {
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

  const { results =[] } = data;

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
    </div>
  )
}

