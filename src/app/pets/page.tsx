"use client";
import { useEffect, useState } from "react";
import PetCard from "../components/pet-card/page";
import  './page.css'

export default function Pets() {
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await fetch("http://localhost:3000/pet", {
          credentials: "include",
        });
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }

    fetchPets();
  }, []); // Array vazio = executa apenas uma vez

  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}