import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

/** Vite: only import.meta.env.VITE_* is available in client code (never process.env). */
function getEmailJsConfig() {
  const config = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    customerTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    notifyTemplateId: import.meta.env.VITE_EMAILJS_NOTIFY_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    inquiryToEmail: import.meta.env.VITE_INQUIRY_TO_EMAIL,
  };

  if (import.meta.env.DEV) {
    console.log('[EmailJS] import.meta.env loaded:', {
      VITE_EMAILJS_SERVICE_ID: config.serviceId ?? '(missing)',
      VITE_EMAILJS_TEMPLATE_ID: config.customerTemplateId ?? '(missing)',
      VITE_EMAILJS_PUBLIC_KEY: config.publicKey ? '(set)' : '(missing)',
      VITE_EMAILJS_NOTIFY_TEMPLATE_ID: config.notifyTemplateId || '(not set)',
      VITE_INQUIRY_TO_EMAIL: config.inquiryToEmail ?? '(missing)',
    });
  }

  return config;
}

function assertEmailJsConfig(config) {
  const missing = [];

  if (!config.publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
  if (!config.serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!config.customerTemplateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');

  if (missing.length > 0) {
    const message = `EmailJS env missing in apps/web/.env: ${missing.join(', ')}. Restart the dev server after saving.`;
    console.error('[EmailJS]', message);
    throw new Error(message);
  }
}

function logEmailJsError(context, error, extra = {}) {
  const details = { context, ...extra };

  if (error instanceof EmailJSResponseStatus) {
    details.status = error.status;
    details.text = error.text;
  } else if (error) {
    details.message = error.message;
    details.stack = error.stack;
  }

  console.error('[EmailJS] Request failed:', details);
}

function getEmailJSErrorMessage(error) {
  if (error instanceof EmailJSResponseStatus) {
    const text = error.text || '';

    if (/template id not found/i.test(text)) {
      return 'Email template not found. Check VITE_EMAILJS_TEMPLATE_ID in apps/web/.env.';
    }

    if (/service id not found/i.test(text)) {
      return 'Email service not found. Check VITE_EMAILJS_SERVICE_ID in apps/web/.env.';
    }

    return text || 'Email could not be sent. Please try again.';
  }

  return error?.message || 'Could not send your message. Please try again.';
}

function readFormFields(formElement) {
  const data = new FormData(formElement);
  return {
    name: String(data.get('name') || '').trim(),
    email: String(data.get('email') || '').trim(),
    phone: String(data.get('phone') || '').trim(),
    message: String(data.get('message') || '').trim(),
  };
}

/**
 * Sends only name, email, phone, message from the form.
 * From address comes from your connected service in the EmailJS dashboard.
 * Template To Email should use {{email}} for customer auto-reply.
 */
async function sendCustomerEmail(formElement, config) {
  const { serviceId, customerTemplateId, publicKey } = config;
  const fields = readFormFields(formElement);

  console.log('[EmailJS] emailjs.sendForm →', {
    serviceId,
    templateId: customerTemplateId,
    fields,
    publicKeySet: Boolean(publicKey),
  });

  try {
    const result = await emailjs.sendForm(
      serviceId,
      customerTemplateId,
      formElement,
      { publicKey }
    );

    console.log('[EmailJS] sendForm success:', {
      status: result?.status,
      text: result?.text,
      sentTo: fields.email,
    });

    return result;
  } catch (error) {
    logEmailJsError('emailjs.sendForm', error, {
      serviceId,
      templateId: customerTemplateId,
      fields,
    });
    throw error;
  }
}

/** Optional owner copy — only name, email, phone, message (+ to_email for routing) */
async function sendOwnerNotification(fields, config) {
  const { serviceId, notifyTemplateId, publicKey, inquiryToEmail } = config;

  if (!notifyTemplateId) {
    return null;
  }

  const templateParams = {
    to_email: inquiryToEmail,
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    message: fields.message,
  };

  console.log('[EmailJS] emailjs.send (owner notify) →', {
    serviceId,
    templateId: notifyTemplateId,
    to_email: templateParams.to_email,
  });

  try {
    const result = await emailjs.send(
      serviceId,
      notifyTemplateId,
      templateParams,
      { publicKey }
    );

    console.log('[EmailJS] Owner notification success:', {
      status: result?.status,
      text: result?.text,
    });

    return result;
  } catch (error) {
    logEmailJsError('emailjs.send (owner)', error, {
      serviceId,
      templateId: notifyTemplateId,
    });
    throw error;
  }
}

export async function sendWebsiteInquiryForm(formElement) {
  if (!formElement) {
    console.error('[EmailJS] sendWebsiteInquiryForm: form element is null');
    throw new Error('Form not found.');
  }

  const config = getEmailJsConfig();
  assertEmailJsConfig(config);

  emailjs.init({ publicKey: config.publicKey });

  const fields = readFormFields(formElement);

  if (!fields.email) {
    throw new Error('Please enter your email address.');
  }

  try {
    await sendCustomerEmail(formElement, config);
    await sendOwnerNotification(fields, config);
  } catch (error) {
    throw new Error(getEmailJSErrorMessage(error));
  }

  return { ok: true, sentTo: fields.email };
}

export { getEmailJsConfig };
