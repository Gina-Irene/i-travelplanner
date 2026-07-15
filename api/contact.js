import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Méthode non autorisée"
    });
  }

  try {

    const {
      name,
      email,
      phone,
      destination,
      travelers,
      period,
      message
    } = req.body;

    const response = await resend.emails.send({

      from: "I-Travel Planner <onboarding@resend.dev>",

      to: "itravelplanner.mg@gmail.com",

      replyTo: email,

      subject: `🌍 Nouvelle demande de devis - ${name}`,

      html: `
        <h2>Nouvelle demande de devis</h2>

        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Destination :</strong> ${destination}</p>
        <p><strong>Voyageurs :</strong> ${travelers}</p>
        <p><strong>Période :</strong> ${period}</p>

        <hr>

        <p>${message}</p>
      `

    });

    return res.status(200).json({
      success: true,
      response
    });

  catch (error) {

  console.error("ERREUR RESEND :", error);

  return res.status(500).json({
    success: false,
    error
  });

}

}