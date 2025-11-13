"use client";
import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [newInvitation, setNewInvitation] = useState({
    guest: "",
    slug: "",
    totalPasses: 2,
  });

  async function fetchGuests() {
    const res = await fetch(`/api/admin/guests?key=${key}`);
    if (res.ok) {
      const data = await res.json();
      setInvitations(data);
      setAuthorized(true);
    }
  }

  async function createGuest() {
    await fetch(`/api/admin/guests?key=${key}`, {
      method: "POST",
      body: JSON.stringify(newInvitation),
    });
    setNewInvitation({ guest: "", slug: "", totalPasses: 2 });
    fetchGuests();
  }

  if (!authorized) {
    return (
      <div className="p-4">
        <input
          placeholder="Clave de admin"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={fetchGuests}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invitados</h1>

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Nombre"
          value={newInvitation.guest}
          onChange={(e) =>
            setNewInvitation({ ...newInvitation, guest: e.target.value })
          }
          className="border p-2"
        />
        <input
          placeholder="Slug (ej: juan-perez)"
          value={newInvitation.slug}
          onChange={(e) =>
            setNewInvitation({ ...newInvitation, slug: e.target.value })
          }
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Pases"
          value={newInvitation.totalPasses}
          onChange={(e) =>
            setNewInvitation({
              ...newInvitation,
              totalPasses: Number(e.target.value),
            })
          }
          className="border p-2 w-20"
        />
        <button
          onClick={createGuest}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      <ul>
        {invitations.map((invitation: any) => (
          <li key={invitation.id}>
            <b>{invitation.guest}</b> —{" "}
            <b>Pases totales {invitation.totalPasses}</b> —{" "}
            {invitation.confirmed ? "✅ Confirmado" : "❌ No confirmado"}
          </li>
        ))}
      </ul>
    </div>
  );
}
