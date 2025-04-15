"use client";
import { useEffect, useState } from "react";
import PetCard from "../components/pet-card/page";
import  './page.css'
import { useRouter } from "next/navigation";

export default function Pets() {
  const [pets, setPets] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await fetch("http://localhost:3000/pet/public", {
          credentials: "include",
        });
        if (res.status === 401) {
          router.push('/');
          return;
        }
        const data = await res.json();
        console.log(data);
        
        setPets(data);
        
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }

    fetchPets();
  }, []); 

  return (
    <div className="pet-grid">
      {pets?.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}