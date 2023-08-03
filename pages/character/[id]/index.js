import Link from "next/link";
import Header from "../../../components/header";
const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}${id}`);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}


export default function Character({ data }) {

  const { name, image, gender, location, origin, species, status } = data;

  return (
    <div className=" d-flex flex-column align-items-center mt-3">
      <h1>{name}</h1>
      <div className="profile">
        <div className="profile-image">
          <img src={image} alt={name} />
        </div>
        <div className="profile-details">
          <h2>Character Details</h2>
          <ul>
            <li>
              <strong>Name:</strong> {name}
            </li>
            <li>
              <strong>Status:</strong> {status}
            </li>
            <li>
              <strong>Gender:</strong> {gender}
            </li>
            <li>
              <strong>Species:</strong> {species}
            </li>
            <li>
              <strong>Location:</strong> {location?.name}
            </li>
            <li>
              <strong>Originally From:</strong> {origin?.name}
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center">
        <Link href="/">
          <button className="btn btn-secondary m-2">Volver</button>
        </Link>
      </p>
    </div>
  )
}