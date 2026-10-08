const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim();

// Production builds use the public Railway API unless a deployment overrides it.
export const API_BASE_URL = (configuredApiBase || "https://api.nbengineerings.com/api/v1").replace(/\/$/, "");

async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: options.signal || controller.signal,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}.`);
    }
    if (response.status === 204) return null;
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The backend request timed out.", { cause: error });
    }
    if (error instanceof TypeError) {
      throw new Error("The backend is unavailable from this preview.", {
        cause: error,
      });
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export default apiRequest;
