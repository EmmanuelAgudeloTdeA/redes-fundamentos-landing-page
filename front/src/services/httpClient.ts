const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export class HttpError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export async function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new HttpError(errorBody?.message ?? 'Request failed', response.status);
  }

  return response.json() as Promise<TResponse>;
}

export function getImageUrl(topic: string): string {
  return `${API_BASE_URL}/api/images/${topic}`;
}
