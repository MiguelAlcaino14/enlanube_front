import { useEffect, useState } from "react";
import "./responsive.css";
import CotizacionModal from "./components/CotizacionModal";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Grid from "@cloudscape-design/components/grid";
import Icon from "@cloudscape-design/components/icon";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Badge from "@cloudscape-design/components/badge";
import Link from "@cloudscape-design/components/link";

const WA_URL: string | null = null; // pendiente: asignar número WhatsApp

function openWhatsApp() {
  if (!WA_URL) {
    alert("Número de contacto aún no disponible. Por favor intenta más tarde.");
    return;
  }
  window.open(WA_URL, "_blank", "noopener");
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

let _openModal: (() => void) | null = null;
function openModal() { _openModal?.(); }

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="nav-root"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        background: "rgba(13,18,30,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <img
          src="/logo.png"
          alt="enlanube"
          style={{ height: 110, width: "auto", display: "block" }}
        />
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span className="nav-btn-secondary">
          <Button variant="normal" href="https://portal.enlanube.cl" target="_blank">Portal Cliente</Button>
        </span>
        <Button variant="primary" onClick={openModal}>Cotizar</Button>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        background: "linear-gradient(160deg, #0d1220 0%, #0f1e38 50%, #071628 100%)",
        padding: "100px 40px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(0,140,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
        <SpaceBetween size="l" direction="vertical">
          <Box variant="h1" color="inherit">
            <span className="hero-title" style={{ color: "#fff", fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}>
              Hosting &amp;{" "}
              <span style={{ color: "#17c9ff" }}>Cloud</span>
            </span>
          </Box>
          <Box color="text-body-secondary" fontSize="body-m" textAlign="center">
            Infraestructura segura y escalable en datacenters certificados. VPS, IaaS, Hosting Web,
            Dedicados y Disaster Recovery con soporte local.
          </Box>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" onClick={openModal}>Hablar con un Especialista</Button>
            <Button variant="normal" onClick={() => scrollTo("servicios")}>Conocer enlanube</Button>
          </div>
        </SpaceBetween>
      </div>
    </section>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  extra?: string;
}

function ServiceCard({ icon, title, description, extra }: ServiceCardProps) {
  return (
    <Container
      fitHeight
      disableHeaderPaddings
      style={{
        root: {
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.08)",
          borderRadius: "12px",
        },
      }}
    >
      <div style={{ padding: "24px" }}>
        <SpaceBetween size="s" direction="vertical">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "rgba(0,140,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#17c9ff",
            }}
          >
            <Icon name={icon as any} size="medium" />
          </div>
          <Box variant="h3" color="inherit">
            <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{title}</span>
          </Box>
          <Box color="text-body-secondary" fontSize="body-s">
            {description}
          </Box>
          {extra && (
            <Link variant="primary" fontSize="body-s" onFollow={openWhatsApp}>
              {extra} →
            </Link>
          )}
        </SpaceBetween>
      </div>
    </Container>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function ServicesSection() {
  const services: ServiceCardProps[] = [
    {
      icon: "server",
      title: "IaaS",
      description:
        "Infraestructura como servicio. Servidores virtuales, redes y almacenamiento on-demand con recursos garantizados 1:1.",
    },
    {
      icon: "settings",
      title: "VPS",
      description:
        "Servidores virtuales privados con SSD NVMe, recursos dedicados y panel de control. Desde 2 vCPU.",
    },
    {
      icon: "globe",
      title: "Hosting Web",
      description:
        "Hosting compartido y dedicado para sitios WordPress, e-commerce y aplicaciones web con SSL incluido.",
    },
    {
      icon: "copy",
      title: "Backup & DR",
      description:
        "Respaldos diarios con estrategia 3-2-1, inmutabilidad y planes de recuperación ante desastres.",
    },
    {
      icon: "security",
      title: "Cerberus WAF",
      description:
        "Web Application Firewall propio. Protección OWASP Top 10, mitigación de bots y reglas managed — incluido por defecto en clientes con presencia web crítica.",
      extra: "Ver detalles",
    },
  ];

  return (
    <section
      id="servicios"
      className="services-section reveal"
      style={{
        background: "#0d1220",
        padding: "80px 40px",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <SpaceBetween size="xxl" direction="vertical">
          <div style={{ textAlign: "center" }}>
            <SpaceBetween size="s" direction="vertical">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Badge color="blue">✦ SERVICIOS CLOUD</Badge>
              </div>
              <Box variant="h2" color="inherit">
                <span style={{ color: "#fff", fontSize: 36, fontWeight: 800 }}>
                  Soluciones para cada necesidad
                </span>
              </Box>
            </SpaceBetween>
          </div>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {services.slice(0, 4).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="services-last" style={{ width: "calc(25% - 8px)", minWidth: 220 }}>
              <ServiceCard {...services[4]} />
            </div>
          </div>
        </SpaceBetween>
      </div>
    </section>
  );
}

// ─── DATACENTER CARD ─────────────────────────────────────────────────────────
interface DatacenterCardProps {
  flag: string;
  city: string;
  state: string;
  tier: string;
  description: string;
  tags: string[];
}

function DatacenterCard({ flag, city, tier, description, tags }: DatacenterCardProps) {
  return (
    <Container
      fitHeight
      style={{
        root: {
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.08)",
          borderRadius: "12px",
        },
      }}
    >
      <div style={{ padding: "24px" }}>
        <SpaceBetween size="m" direction="vertical">
          <div
            style={{
              width: 48,
              height: 32,
              background: "rgba(0,140,255,0.2)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#17c9ff",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {flag}
          </div>
          <div>
            <Box variant="h3" color="inherit">
              <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{city}</span>
            </Box>
            <Box color="text-status-warning" fontSize="body-s">
              <span style={{ color: "#ff6b1a", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                DATACENTER {tier}
              </span>
            </Box>
          </div>
          <Box color="text-body-secondary" fontSize="body-s">
            {description}
          </Box>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(23,201,255,0.1)",
                  color: "#17c9ff",
                  border: "1px solid rgba(23,201,255,0.2)",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </SpaceBetween>
      </div>
    </Container>
  );
}

// ─── DATACENTERS SECTION ──────────────────────────────────────────────────────
function DatacentersSection() {
  const dcs: DatacenterCardProps[] = [
    {
      flag: "US",
      city: "Miami, Florida",
      state: "US",
      tier: "TIER III",
      description:
        "Datacenter Tier III/IV con la mejor conectividad a Latinoamérica, ideal para aplicaciones que requieren baja latencia regional.",
      tags: ["ISO 1/27", "SOC 27001", "PCI-DSS", "HIPAA", "Tier III/IV"],
    },
    {
      flag: "US",
      city: "Tampa, Florida",
      state: "US",
      tier: "TIER III",
      description:
        "Infraestructura de alta performance para cargas de trabajo intensivas. Conectividad redundante y soporte 24/7.",
      tags: ["ISO 1 Type 5", "ISO 2 Type 5", "NVMe", "PCI"],
    },
    {
      flag: "CL",
      city: "Santiago, Chile",
      state: "CL",
      tier: "TIER III/IV",
      description:
        "Datacenter local con la menor latencia para Chile. Soberanía de datos y cumplimiento normativo local.",
      tags: ["Tier III/IV", "ISO 24/7", "100 Gbps Backbone"],
    },
  ];

  return (
    <section
      className="reveal"
      style={{
        background: "linear-gradient(180deg, #0d1220 0%, #091828 100%)",
        padding: "80px 40px",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <SpaceBetween size="xxl" direction="vertical">
          <div style={{ textAlign: "center" }}>
            <SpaceBetween size="s" direction="vertical">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Badge color="blue">✦ INFRAESTRUCTURA</Badge>
              </div>
              <Box variant="h2" color="inherit">
                <span style={{ color: "#fff", fontSize: 36, fontWeight: 800 }}>
                  Datacenters de Clase Mundial
                </span>
              </Box>
              <Box color="text-body-secondary" fontSize="body-m" textAlign="center">
                Más de 70 nodos distribuidos en 3 ubicaciones estratégicas con certificaciones internacionales.
              </Box>
            </SpaceBetween>
          </div>
          <Grid
            gridDefinition={[
              { colspan: { default: 12, s: 4 } },
              { colspan: { default: 12, s: 4 } },
              { colspan: { default: 12, s: 4 } },
            ]}
          >
            {dcs.map((dc) => (
              <DatacenterCard key={dc.city} {...dc} />
            ))}
          </Grid>
        </SpaceBetween>
      </div>
    </section>
  );
}

// ─── FEATURED PRODUCT SECTION ─────────────────────────────────────────────────
function FeaturedProductSection() {
  return (
    <section className="featured-section reveal" style={{ background: "#0d1220", padding: "60px 40px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div
          className="featured-inner"
          style={{
            background: "linear-gradient(135deg, #0f2240 0%, #0a1830 60%, #071220 100%)",
            borderRadius: 16,
            border: "1px solid rgba(23,201,255,0.15)",
            padding: "40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -60,
              top: "50%",
              transform: "translateY(-50%)",
              width: 400,
              height: 300,
              background: "radial-gradient(ellipse, rgba(23,201,255,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <Grid
            gridDefinition={[
              { colspan: { default: 12, s: 7 } },
              { colspan: { default: 12, s: 5 } },
            ]}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <SpaceBetween size="l" direction="vertical">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <Badge color="blue">✦ PRODUCTO ENLANUBE</Badge>
                    <span style={{ color: "#17c9ff", fontSize: 20, fontWeight: 800 }}>CloudServer</span>
                  </div>
                  <Box variant="h2" color="inherit">
                    <span style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>
                      Servidores Virtuales de Alto Rendimiento
                    </span>
                  </Box>
                </div>
                <Box color="text-body-secondary" fontSize="body-m">
                  Plataforma especializada en VPS con recursos garantizados 1:1, sin overselling.
                  Infraestructura en datacenters Tier III con SSD NVMe, backup automático y soporte
                  técnico local 24/7.
                </Box>
                <Grid
                  gridDefinition={[
                    { colspan: 6 },
                    { colspan: 6 },
                    { colspan: 6 },
                    { colspan: 6 },
                  ]}
                >
                  {[
                    { icon: "expand", label: "SSD NVMe" },
                    { icon: "lock-private", label: "Recursos 1:1" },
                    { icon: "globe", label: "Miami & Santiago" },
                    { icon: "support", label: "Soporte Local" },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#17c9ff" }}>
                        <Icon name={icon as any} size="normal" />
                      </span>
                      {label}
                    </div>
                  ))}
                </Grid>
                <div>
                  <Button variant="primary" iconName="external" iconAlign="right" onClick={openModal}>
                    Conocer CloudServer
                  </Button>
                </div>
              </SpaceBetween>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 200,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 200,
                  background: "rgba(23,201,255,0.05)",
                  borderRadius: 8,
                  border: "1px solid rgba(23,201,255,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: 20,
                  gap: 10,
                }}
              >
                {[85, 62, 90, 45, 78].map((w, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        height: 6,
                        width: `${w}%`,
                        background: "linear-gradient(90deg, #17c9ff, rgba(23,201,255,0.3))",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section
      className="cta-section reveal"
      style={{
        background: "linear-gradient(180deg, #091828 0%, #0d1220 100%)",
        padding: "80px 40px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, s: 8 } },
            { colspan: { default: 12, s: 4 } },
          ]}
        >
          <div style={{ textAlign: "left" }}>
            <SpaceBetween size="s" direction="vertical">
              <Box variant="h2" color="inherit">
                <span style={{ color: "#fff", fontSize: 32, fontWeight: 800 }}>
                  ¿Necesitas una solución personalizada?
                </span>
              </Box>
              <Box color="text-body-secondary" fontSize="body-m">
                Diseñamos arquitecturas cloud a medida para tu empresa.
              </Box>
            </SpaceBetween>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <Button variant="primary" onClick={openModal}>Solicitar Cotización</Button>
          </div>
        </Grid>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    {
      title: "// SERVICIOS",
      links: ["Soporte Técnico", "Cloud", "Redes e Infraestructura", "Respaldo de Datos", "Cerberus WAF"],
    },
    {
      title: "// EMPRESA",
      links: ["Nosotros", "Blog", "Contacto", "Tools", "Portal Cliente"],
    },
    {
      title: "// LEGAL",
      links: ["Términos de Servicio", "Política de Privacidad", "SLA"],
    },
  ];

  return (
    <footer
      className="footer-root"
      style={{
        background: "#070e1a",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "60px 40px 32px",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, s: 3 } },
            { colspan: { default: 12, s: 3 } },
            { colspan: { default: 12, s: 3 } },
            { colspan: { default: 12, s: 3 } },
          ]}
        >
          <div>
            <SpaceBetween size="m" direction="vertical">
              <img
                src="/logo.png"
                alt="enlanube"
                style={{ height: 36, width: "auto", display: "block" }}
              />
              <Box color="text-body-secondary" fontSize="body-s">
                Infraestructura TI empresarial. Soporte, hosting, cloud y redes con respaldo local en Chile.
              </Box>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#00802f",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                  All systems operational · uptime{" "}
                  <span style={{ color: "#00802f" }}>99.99%</span>
                </span>
              </div>
            </SpaceBetween>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <SpaceBetween size="s" direction="vertical">
                <Box variant="small" color="text-body-secondary">
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 1, fontWeight: 600 }}>
                    {col.title}
                  </span>
                </Box>
                {col.links.map((link) => (
                  <Box key={link} color="text-body-secondary" fontSize="body-s">
                    <span style={{ cursor: "pointer", color: "rgba(255,255,255,0.65)" }}>{link}</span>
                  </Box>
                ))}
              </SpaceBetween>
            </div>
          ))}
        </Grid>
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <Box color="text-body-secondary" fontSize="body-s">
            <span style={{ color: "rgba(255,255,255,0.35)" }}>
              © 2025 ENLANUBE SpA · R.U.T.: 78.168.223-3
            </span>
          </Box>
          <Box color="text-body-secondary" fontSize="body-s">
            <span style={{ color: "rgba(255,255,255,0.35)" }}>v2.0 · build-2026.05.19</span>
          </Box>
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP BUTTON ─────────────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      href={WA_URL ?? "#"}
      onClick={WA_URL ? undefined : (e) => { e.preventDefault(); openWhatsApp(); }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 2000,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25d366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
        transition: "transform 0.2s, box-shadow 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,211,102,0.55)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(37,211,102,0.4)";
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  const [modalVisible, setModalVisible] = useState(false);
  _openModal = () => setModalVisible(true);

  return (
    <div style={{ background: "#0d1220", minHeight: "100vh", fontFamily: "'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif" }}>
      <Navbar />
      <Hero />
      <ServicesSection />
      <DatacentersSection />
      <FeaturedProductSection />
      <CtaSection />
      <Footer />
      <WhatsAppButton />
      <CotizacionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
}
