import { useHistory } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";

import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { database } from "../services/firebase";

export function Home() {
  const { signInWithGoogle, user } = useContext(AuthContext);
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");

  async function handleCrreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room Closed");
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="" />
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="" />
          <button onClick={handleCrreateRoom} className="create-room">
            <img src={googleIconImg} alt="" />
            crie sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={(event) => handleJoinRoom(event)}>
            <input
              type="text"
              placeholder="digite o codigo da sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button>Entar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
