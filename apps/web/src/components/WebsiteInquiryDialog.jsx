import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { sendWebsiteInquiryForm } from '@/lib/sendWebsiteInquiry.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const emptyErrors = { name: false, email: false, phone: false, message: false };

const InquiryField = ({ id, label, error, children }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="tracking-wide text-[hsl(var(--luxury-black))]">
      {label}
    </Label>
    {error && (
      <p className="text-[10px] text-red-600/90 leading-none" role="alert">
        Required
      </p>
    )}
    {children}
  </div>
);

const fieldErrorClass =
  'border-red-400/80 focus-visible:ring-red-400/60';

const WebsiteInquiryDialog = ({ open, onOpenChange }) => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState(emptyErrors);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        setForm({ name: '', email: '', phone: '', message: '' });
        setErrors(emptyErrors);
        formRef.current?.reset();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {
      name: !form.name.trim(),
      email: !form.email.trim(),
      phone: !form.phone.trim(),
      message: !form.message.trim(),
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.phone || nextErrors.message) {
      return;
    }

    setIsSubmitting(true);

    try {
      await sendWebsiteInquiryForm(formRef.current);
      setSubmitted(true);
    } catch (error) {
      console.error('[WebsiteInquiryDialog] submit failed:', error);
      toast.error(error.message || 'Could not send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError) =>
    cn(
      'h-11 border bg-white text-[hsl(var(--luxury-black))] placeholder:text-[hsl(var(--luxury-taupe))]',
      hasError
        ? fieldErrorClass
        : 'border-[hsl(var(--border))] focus-visible:ring-[hsl(var(--luxury-gold))]'
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-[hsl(var(--border))] bg-[hsl(var(--luxury-cream))] p-8 sm:rounded-2xl">
        {submitted ? (
          <div className="flex flex-col items-center text-center py-6 px-2">
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg"
              aria-hidden="true"
            >
              <Check className="h-10 w-10 text-white stroke-[2.5]" />
            </div>
            <p className="font-serif text-xl md:text-2xl text-[hsl(var(--luxury-black))] leading-snug max-w-sm">
              We will contact you as soon as we get your message!
            </p>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center sm:text-center space-y-3 mb-2">
              <DialogTitle className="font-serif text-3xl md:text-4xl font-bold text-[hsl(var(--luxury-black))] leading-tight tracking-tight text-balance">
                Tell us your website idea
              </DialogTitle>
              <p className="text-xs md:text-sm text-[hsl(var(--luxury-gold))] tracking-wide font-medium">
                We will contact you after you hit send!
              </p>
            </DialogHeader>

            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              className="space-y-5 mt-2"
            >
              <InquiryField id="inquiry-name" label="Your name" error={errors.name}>
                <Input
                  id="inquiry-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={errors.name}
                  className={inputClass(errors.name)}
                />
              </InquiryField>

              <InquiryField id="inquiry-email" label="Your email address" error={errors.email}>
                <Input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  aria-invalid={errors.email}
                  className={inputClass(errors.email)}
                />
              </InquiryField>

              <InquiryField id="inquiry-phone" label="Your phone number" error={errors.phone}>
                <Input
                  id="inquiry-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  aria-invalid={errors.phone}
                  className={inputClass(errors.phone)}
                />
              </InquiryField>

              <InquiryField id="inquiry-message" label="Your website idea" error={errors.message}>
                <Textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="A few words about the website you have in mind..."
                  aria-invalid={errors.message}
                  className={cn(
                    'min-h-[100px] resize-none border bg-white text-[hsl(var(--luxury-black))] placeholder:text-[hsl(var(--luxury-taupe))]',
                    errors.message
                      ? fieldErrorClass
                      : 'border-[hsl(var(--border))] focus-visible:ring-[hsl(var(--luxury-gold))]'
                  )}
                />
              </InquiryField>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 font-medium tracking-widest uppercase transition-all duration-300 bg-[hsl(var(--luxury-black))] text-white hover:bg-[hsl(var(--luxury-gold))] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteInquiryDialog;
