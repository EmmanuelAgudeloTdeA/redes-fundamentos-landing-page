import { postJson } from './httpClient';
import type { ContactFormData, ContactSubmitResponse } from '../types/contact';

export function submitContactMessage(data: ContactFormData): Promise<ContactSubmitResponse> {
  return postJson<ContactSubmitResponse>('/api/contact', data);
}
