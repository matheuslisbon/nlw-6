import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    return history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="" />
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button>Entar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
