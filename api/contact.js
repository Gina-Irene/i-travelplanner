import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Empêche l'injection de HTML dans le mail
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Méthode non autorisée" });
  }

  try {
    const { name, email, phone, destination, travelers, period, message } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ success: false, error: "Nom et email obligatoires" });
    }

    const { data, error } = await resend.emails.send({
      from: "I-Travel Planner <onboarding@resend.dev>",
      to: "ginaandriamiharisoa@gmail.com",
      replyTo: email,
      subject: `🌍 Nouvelle demande de devis - ${name}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Nom :</strong> ${esc(name)}</p>
        <p><strong>Email :</strong> ${esc(email)}</p>
        <p><strong>Téléphone :</strong> ${esc(phone)}</p>
        <p><strong>Destination :</strong> ${esc(destination)}</p>
        <p><strong>Voyageurs :</strong> ${esc(travelers)}</p>
        <p><strong>Période :</strong> ${esc(period)}</p>
        <hr>
        <p>${esc(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    // Resend renvoie les erreurs dans "error" au lieu de les lancer
    if (error) {
      console.error("ERREUR RESEND :", error);
      return res.status(500).json({ success: false, error: error.message || "Envoi refusé par Resend" });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error("ERREUR SERVEUR :", err);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
}
