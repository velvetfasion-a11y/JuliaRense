const RECIPIENT = process.env.INQUIRY_RECIPIENT_PHONE || '46700231790';

async function notifyViaCallMeBot(text) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return { ok: false, reason: 'CALLMEBOT_API_KEY not set' };

  const url = `https://api.callmebot.com/whatsapp.php?phone=${RECIPIENT}&text=${encodeURIComponent(text)}&apikey=${apiKey}`;
  const response = await fetch(url);
  const body = await response.text();

  if (!response.ok || /error/i.test(body)) {
    return { ok: false, reason: body || 'CallMeBot request failed' };
  }

  return { ok: true };
}

async function notifyViaTwilio(text) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !from) {
    return { ok: false, reason: 'Twilio not configured' };
  }

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

  if (!response.ok) {
    const detail = await response.text();
    return { ok: false, reason: detail || 'Twilio request failed' };
  }

  return { ok: true };
}

async function deliverInquiry(payload) {
  const text = [
    'Website inquiry',
    payload.product ? `Product: ${payload.product}` : null,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Idea: ${payload.idea}`,
  ]
    .filter(Boolean)
    .join('\n');

  const callMeBot = await notifyViaCallMeBot(text);
  if (callMeBot.ok) return { ok: true, channel: 'whatsapp' };

  const twilio = await notifyViaTwilio(text);
  if (twilio.ok) return { ok: true, channel: 'sms' };

  return {
    ok: false,
    reason:
      callMeBot.reason ||
      twilio.reason ||
      'Set CALLMEBOT_API_KEY or Twilio credentials in apps/web/.env',
  };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

export default function websiteInquiryApiPlugin() {
  return {
    name: 'vite:website-inquiry-api',
    configureServer(server) {
      server.middlewares.use('/api/website-inquiry', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          next();
          return;
        }

        try {
          const payload = await readJsonBody(req);

          if (!payload.name?.trim() || !payload.email?.trim() || !payload.phone?.trim() || !payload.idea?.trim()) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Name, email, phone, and idea are required.' }));
            return;
          }

          const result = await deliverInquiry({
            name: payload.name.trim(),
            email: payload.email.trim(),
            phone: payload.phone.trim(),
            idea: payload.idea.trim(),
            product: payload.product?.trim(),
          });

          if (!result.ok) {
            res.statusCode = 503;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: result.reason }));
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, channel: result.channel }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error.message || 'Server error' }));
        }
      });
    },
  };
}
