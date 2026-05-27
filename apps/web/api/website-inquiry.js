const RECIPIENT = process.env.INQUIRY_RECIPIENT_PHONE || '46700231790';

async function notifyViaCallMeBot(text) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return { ok: false };

  const url = `https://api.callmebot.com/whatsapp.php?phone=${RECIPIENT}&text=${encodeURIComponent(text)}&apikey=${apiKey}`;
  const response = await fetch(url);
  const body = await response.text();

  return { ok: response.ok && !/error/i.test(body), body };
}

async function notifyViaTwilio(text) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !from) return { ok: false };

  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const body = new URLSearchParams({
    To: `+${RECIPIENT.replace(/^\+/, '')}`,
    From: from,
    Body: text,
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }
  );

  return { ok: response.ok };
}

function formatMessage(payload) {
  return [
    'Website inquiry',
    payload.product ? `Product: ${payload.product}` : null,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Idea: ${payload.idea}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, idea, product } = req.body || {};

  if (!name?.trim() || !phone?.trim() || !idea?.trim()) {
    return res.status(400).json({ error: 'Name, phone, and idea are required.' });
  }

  const payload = {
    name: name.trim(),
    phone: phone.trim(),
    idea: idea.trim(),
    product: product?.trim(),
  };

  const text = formatMessage(payload);

  const callMeBot = await notifyViaCallMeBot(text);
  if (callMeBot.ok) {
    return res.status(200).json({ ok: true, channel: 'whatsapp' });
  }

  const twilio = await notifyViaTwilio(text);
  if (twilio.ok) {
    return res.status(200).json({ ok: true, channel: 'sms' });
  }

  return res.status(503).json({
    error:
      'Message service is not configured. Add CALLMEBOT_API_KEY or Twilio credentials.',
  });
}
