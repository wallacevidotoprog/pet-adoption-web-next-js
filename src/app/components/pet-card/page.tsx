"use client";
import { Pets } from "@/@types/basedb.types";
import noFavorite from "@public/image/no-favorite.png";
import Image from "next/image";
import "./page.css";

export default function PetCard({ pet }: { pet: Pets }) {
  return (
    <>
      <div className="card">
        <img
          src={pet.images?.[0] || "https://placehold.co/300x200"}
          alt={pet.name}
          className="image"
        />
        <div className="info">
          <div className="tag">
            {pet.type} • {pet.breed}
          </div>
          <div className="name">
            <h2>{pet.name}</h2>
            <Image src={noFavorite} alt="favorite" className="favorite" />
          </div>
          <p className="description"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquid, voluptatibus hic neque explicabo nobis. Totam nisi esse veniam repellendus, dignissimos sint quas exercitationem commodi debitis vel earum eos enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic libero aperiam similique fugiat quo commodi obcaecati suscipit atque itaque inventore dolorem laudantium pariatur in molestiae quasi, iure cumque neque voluptatibus.
          {/* // {pet.description} */}
          </p>
          <div>
            <button onClick={() => alert(`Detalhes de ${pet.breed}`)}>
              Ver mais
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
