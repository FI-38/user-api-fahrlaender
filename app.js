import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    const name = e.target.elements.name.value.trim();
    const email = e.target.elements.email.value.trim().toLowerCase();
    const password = e.target.elements.password.value;
    const confirm = e.target.elements.confirm.value;

    // Mini-Checks (clientseitig)
    if (!name) return setErr("Bitte einen Namen eingeben.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Bitte eine gültige E-Mail eingeben.");
    if (password.length < 8) return setErr("Passwort muss mind. 8 Zeichen haben.");
    if (password !== confirm) return setErr("Passwörter stimmen nicht überein.");

    // Schnell-Variante: nur UI – „erfolgreich registriert“
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMsg("Registrierung erfolgreich! Du wirst zum Login weitergeleitet …");
      setTimeout(() => navigate("/login"), 900);
    }, 400);
  };

  return (
    <div className="mt-4">
      <h3>Registrieren</h3>

      {err && <Alert variant="danger">{err}</Alert>}
      {msg && <Alert variant="success">{msg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Dein Name" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control name="email" type="email" placeholder="name@example.com" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Passwort</Form.Label>
          <Form.Control name="password" type="password" placeholder="mind. 8 Zeichen" minLength={8} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Passwort bestätigen</Form.Label>
          <Form.Control name="confirm" type="password" placeholder="nochmal eingeben" minLength={8} required />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Sende …" : "Registrieren"}
        </Button>
      </Form>

      <p className="mt-3">
        Schon ein Konto? <Link to="/login">Zum Login</Link>
      </p>
    </div>
  );
}

export default Register;
