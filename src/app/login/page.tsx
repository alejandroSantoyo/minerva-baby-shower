export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Inicia sesión</h2>
      <form className="flex flex-col gap-3 w-64">
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Entrar</button>
      </form>
    </main>
  );
}
