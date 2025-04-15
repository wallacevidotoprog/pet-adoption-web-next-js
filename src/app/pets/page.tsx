"use client";
import { Pets as yPet } from "@/@types/basedb.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PetCard from "../../components/pet-card/PetCard";
import "./page.css";

export default function Pets() {
  const [pets, setPets] = useState<yPet[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await fetch("http://localhost:3000/pet/public", {
          credentials: "include",
        });
        if (res.status === 401) {
          router.push("/");
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
    <div className="container-pet">
      <div className="form-container">
        <form
          action="/quero-adotar#pets"
          className="adoption-form"
          method="get"
        >
          <div className="form-row">
            <div className="form-field">
              <select id="specie" name="specie">
                <option value="">Todas as espécies</option>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
              </select>
            </div>

            <div className="form-field">
              <select id="sex" name="sex">
                <option value="">Todos os sexos</option>
                <option value="male">Macho</option>
                <option value="female">Fêmea</option>
              </select>
            </div>

            <div className="form-field">
              <select id="size" name="size">
                <option value="">Todos os portes</option>
                <option value="small">Porte pequeno</option>
                <option value="medium">Porte médio</option>
                <option value="big">Porte grande</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <select id="state_id" name="state_id">
                <option  value="">
                  Todos os Estados
                </option>
                {/* Rest of the state options */}
              </select>
            </div>

            <div className="form-field">
              <select id="city_id" name="city_id">
                <option  value="">
                  Todas as Cidades
                </option>
              </select>
            </div>

            <div className="form-field">
              <select id="available" name="available">
                <option value="">Todos os status</option>
                <option value="false">Somente adotados</option>
                <option value="true">Somente disponíveis</option>
              </select>
            </div>

            <div className="form-field">
              <input
                id="name"
                name="name"
                placeholder="Nome do bicho"
                type="text"
              />
            </div>

            <div className="form-field">
              <button type="submit" className="primary-button">
                Buscar
              </button>
            </div>

            <input id="sort_by" name="sort_by" type="hidden" value="random" />
          </div>
        </form>
      </div>
      <div className="pet-grid">
        {pets?.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
