const url = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const configured = Boolean(url && key);
export async function api(path, { token, method = "GET", body, headers = {} } = {}) {
  if (!configured) throw new Error("Supabase is not configured.");
  const response = await fetch(url + path, {
    method,
    headers: { apikey: key, ...(token ? { Authorization: "Bearer " + token } : {}), ...(body && !(body instanceof Blob) ? { "Content-Type": "application/json" } : {}), ...headers },
    body: body instanceof Blob ? body : body ? JSON.stringify(body) : undefined,
  });
  const raw = await response.text();
  let data;
  try { data = JSON.parse(raw); } catch { data = raw; }
  if (!response.ok) throw new Error(data?.message || data?.error_description || data?.msg || "Request failed (" + response.status + ")");
  return data;
}
export const listCertificates = token => api("/rest/v1/portfolio_certificates?select=*&order=position.asc,created_at.asc", { token });
