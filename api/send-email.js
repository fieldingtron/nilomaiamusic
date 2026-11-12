import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, function (s) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[s];
  });
}

export default async function handler(req, res) {
  // Support both standard Node.js serverless and web Request/Response
  if (req.method && req.method !== "POST") {
    if (res && res.status) {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // keep as is
      }
    } else if (!body && typeof req.json === "function") {
      body = await req.json();
    }
    body = body || {};

    const name = body.name || body["your-name"];
    const email = body.email || body["your-email"];
    const message = body.message || body["your-message"];
    const honeypot = body.honeypot;
    const startTime = body.startTime;

    // 1. Honeypot check - return 200 to trick bots
    if (honeypot && String(honeypot).trim() !== "") {
      const responseData = { message: "Message sent successfully" };
      if (res && res.status) return res.status(200).json(responseData);
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Time-based Bot Check (Fast submit: under 2 seconds)
    if (startTime) {
      const elapsed = Date.now() - parseInt(startTime, 10);
      if (elapsed < 2000) {
        const responseData = { message: "Form submitted too quickly. Please try again." };
        if (res && res.status) return res.status(400).json(responseData);
        return new Response(JSON.stringify(responseData), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // 3. URL Pattern check in name
    const urlRegex = /(http:\/\/|https:\/\/|www\.)/i;
    if (name && urlRegex.test(name)) {
      const responseData = { message: "Invalid characters in name field." };
      if (res && res.status) return res.status(400).json(responseData);
      return new Response(JSON.stringify(responseData), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!name || !email || !message) {
      const responseData = { message: "Missing required fields." };
      if (res && res.status) return res.status(400).json(responseData);
      return new Response(JSON.stringify(responseData), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222; margin: 0; padding: 20px; background-color: #f7f7f7; }
    .card { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
    .header { background: #009739; color: #fff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
    .content { padding: 24px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; margin-bottom: 4px; display: block; }
    .value { font-size: 16px; color: #111; line-height: 1.5; }
    .message-box { background: #f9f9f9; padding: 16px; border-radius: 8px; border-left: 4px solid #009739; }
    .footer { font-size: 12px; color: #888; text-align: center; padding: 16px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Message from Nilo Maia Music</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">From:</span>
        <div class="value"><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)})</div>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="value message-box">${escapeHtml(message).replace(/\n/g, "<br/>")}</div>
      </div>
    </div>
    <div class="footer">
      Sent from nilomaia.com contact form
    </div>
  </div>
</body>
</html>`;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "Nilo Maia Website <onboarding@resend.dev>",
        to: process.env.TO_EMAIL || "hello@nilomaia.com",
        replyTo: email,
        subject: `New contact message from ${name}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } else {
      console.warn("RESEND_API_KEY is not configured. Email logged:", { name, email, message });
    }

    const responseData = { message: "Email sent successfully" };
    if (res && res.status) return res.status(200).json(responseData);
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    const errorData = { message: error.message || "Internal Server Error" };
    if (res && res.status) return res.status(500).json(errorData);
    return new Response(JSON.stringify(errorData), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
