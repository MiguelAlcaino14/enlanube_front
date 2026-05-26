const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface CotizacionPayload {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  servicio: string;
  detalle?: string;
}

export async function enviarCotizacion(data: CotizacionPayload): Promise<void> {
  const res = await fetch(`${API_URL}/api/cotizaciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Error al enviar cotización");
  }
}
