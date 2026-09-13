import { env } from "@/config/env";

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export interface ApiClientOptions extends RequestInit {
  token?: string | null;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...fetchOptions } = options;

  const url = `${env.apiUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(customHeaders);

  if (!headers.has("Content-Type") && !(fetchOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Erreur (${response.status})`;
    let errorData: unknown = null;

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        const json = await response.json();
        errorData = json;

        if (typeof json.detail === "string") {
          errorMessage = json.detail;
        } else if (Array.isArray(json.detail)) {
          // Erreurs de validation FastAPI / Pydantic
          errorMessage = json.detail
            .map((err: { msg?: string }) => err.msg || "Erreur de validation")
            .join(", ");
        } else if (typeof json.message === "string") {
          errorMessage = json.message;
        }
      } catch {
        // En cas d'erreur de parsing JSON, conserve le message par défaut
      }
    } else {
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch {
        // Conserve le message par défaut
      }
    }

    throw new ApiError(response.status, errorMessage, errorData);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

