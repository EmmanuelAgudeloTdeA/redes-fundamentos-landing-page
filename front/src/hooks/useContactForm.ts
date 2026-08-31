import { useState } from 'react';
import { z } from 'zod';
import { submitContactMessage } from '../services';
import type { ContactFormData } from '../types/contact';

const contactSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
});

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof ContactFormData, boolean>>;

const EMPTY_FORM: ContactFormData = { fullName: '', email: '', message: '' };

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function updateField(field: keyof ContactFormData, value: string) {
    setFormData((previous) => ({ ...previous, [field]: value }));
  }

  async function submit() {
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        errors[issue.path[0] as keyof ContactFormData] = true;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus('submitting');

    try {
      await submitContactMessage(result.data);
      setStatus('success');
      setFormData(EMPTY_FORM);
    } catch {
      setStatus('error');
    }
  }

  return { formData, fieldErrors, status, updateField, submit };
}
