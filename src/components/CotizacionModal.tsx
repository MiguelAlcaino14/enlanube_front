import { useState } from "react";
import Modal from "@cloudscape-design/components/modal";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Textarea from "@cloudscape-design/components/textarea";
import Select from "@cloudscape-design/components/select";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from "@cloudscape-design/components/box";
import Alert from "@cloudscape-design/components/alert";
import { enviarCotizacion, CotizacionPayload } from "../api/cotizaciones";

const SERVICIOS = [
  { label: "IaaS", value: "IaaS" },
  { label: "VPS", value: "VPS" },
  { label: "Hosting Web", value: "Hosting Web" },
  { label: "Backup & DR", value: "Backup & DR" },
  { label: "Cerberus WAF", value: "Cerberus WAF" },
  { label: "Otro", value: "Otro" },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

const EMPTY: CotizacionPayload = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  servicio: "",
  detalle: "",
};

export default function CotizacionModal({ visible, onClose }: Props) {
  const [form, setForm] = useState<CotizacionPayload>(EMPTY);
  const [servicio, setServicio] = useState<{ label: string; value: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function set(field: keyof CotizacionPayload, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleClose() {
    setForm(EMPTY);
    setServicio(null);
    setError(null);
    setSuccess(false);
    onClose();
  }

  async function handleSubmit() {
    setError(null);

    if (!form.nombre || !form.email || !servicio) {
      setError("Nombre, email y servicio son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      await enviarCotizacion({ ...form, servicio: servicio.value });
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al enviar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      header="Solicitar Cotización"
      size="medium"
      footer={
        !success && (
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={handleClose} disabled={loading}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSubmit} loading={loading}>
                Enviar
              </Button>
            </SpaceBetween>
          </Box>
        )
      }
    >
      {success ? (
        <SpaceBetween size="m" direction="vertical">
          <Alert type="success" header="¡Cotización enviada!">
            Nos contactaremos contigo a la brevedad. Gracias por tu interés en enlanube.
          </Alert>
          <Box float="right">
            <Button variant="primary" onClick={handleClose}>Cerrar</Button>
          </Box>
        </SpaceBetween>
      ) : (
        <Form>
          <SpaceBetween size="m" direction="vertical">
            {error && <Alert type="error">{error}</Alert>}

            <SpaceBetween size="s" direction="horizontal">
              <FormField label="Nombre *" stretch>
                <Input
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.detail.value)}
                  placeholder="Tu nombre"
                  disabled={loading}
                />
              </FormField>
              <FormField label="Email *" stretch>
                <Input
                  value={form.email}
                  onChange={(e) => set("email", e.detail.value)}
                  placeholder="correo@empresa.cl"
                  type="email"
                  disabled={loading}
                />
              </FormField>
            </SpaceBetween>

            <SpaceBetween size="s" direction="horizontal">
              <FormField label="Teléfono" stretch>
                <Input
                  value={form.telefono ?? ""}
                  onChange={(e) => set("telefono", e.detail.value)}
                  placeholder="+56 9 1234 5678"
                  disabled={loading}
                />
              </FormField>
              <FormField label="Empresa" stretch>
                <Input
                  value={form.empresa ?? ""}
                  onChange={(e) => set("empresa", e.detail.value)}
                  placeholder="Nombre de tu empresa"
                  disabled={loading}
                />
              </FormField>
            </SpaceBetween>

            <FormField label="Servicio de interés *">
              <Select
                selectedOption={servicio}
                onChange={(e) => setServicio(e.detail.selectedOption as { label: string; value: string })}
                options={SERVICIOS}
                placeholder="Selecciona un servicio"
                disabled={loading}
              />
            </FormField>

            <FormField label="Detalle adicional">
              <Textarea
                value={form.detalle ?? ""}
                onChange={(e) => set("detalle", e.detail.value)}
                placeholder="Cuéntanos más sobre tus necesidades..."
                rows={3}
                disabled={loading}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      )}
    </Modal>
  );
}
