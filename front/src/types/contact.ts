export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactSubmitResponse {
  id: number;
  createdAt: string;
}
