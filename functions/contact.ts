/**
 * Cloudflare Pages Function – POST /api/contact
 * Receives JSON from the web form and relays it via MailChannels
 * Docs: https://developers.cloudflare.com/pages/functions/
 * MailChannels docs: https://developers.cloudflare.com/email-routing/email-workers/mailchannels/
 */

interface ContactPayload {
    name:    string;
    email:   string;
    message: string;
  }
  
  export const onRequestPost: PagesFunction = async ({ request }) => {
    // ─── Parse JSON body ───────────────────────────────────────────────────────
    let data: ContactPayload;
    try {
      data = await request.json<ContactPayload>();
    } catch {
      return new Response('Bad JSON', { status: 400 });
    }
  
    const { name, email, message } = data;
    if (!name || !email || !message) {
      return new Response('Missing fields', { status: 422 });
    }
  
    // ─── Build MailChannels payload ────────────────────────────────────────────
    const mail = {
      personalizations: [
        { to: [{ email: 'info@assetflows.app' }] }
      ],
      from: { email: 'info@assetflows.app', name: 'AssetFlow Site' },
      subject: `Kontakt forma – ${name}`,
      content: [
        {
          type:  'text/plain',
          value:
  `Ime: ${name}
  E-mail: ${email}
  
  Poruka:
  ${message}`
        }
      ]
    };
  
    // ─── Send via MailChannels ─────────────────────────────────────────────────
    const mcResp = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(mail)
    });
  
    // ─── Return response to browser ────────────────────────────────────────────
    const ok = mcResp.ok;
    return new Response(JSON.stringify({ ok }), {
      status: ok ? 200 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  };
  