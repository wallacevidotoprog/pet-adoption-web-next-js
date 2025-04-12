'use client';
import styles from "./page.module.css";

type Pet = {
  id: number;
  nome: string;
  tipo: string;
  raca?: string;
  imagens?: string[];
};

export default function PetCard({ pet }: { pet: Pet }) {
  return (
    <div className={styles.card}>
      <img
        src={pet.imagens?.[0] || "https://placehold.co/300x200"}
        alt={pet.nome}
        className={styles.image}
      />
      <div className={styles.info}>
        <h2>{pet.nome}</h2>
        <p>
          {pet.tipo} • {pet.raca}
        </p>
        <button onClick={() => alert(`Detalhes de ${pet.nome}`)}>
          Ver mais
        </button>
      </div>
    </div>
  );
}
