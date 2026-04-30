import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type SceneProps = {
  title: string;
  highlight: string;
  subtitle: string;
  bullets: string[];
  startFrame?: number;
};

const Scene: React.FC<SceneProps> = ({
  title,
  highlight,
  subtitle,
  bullets,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 16,
      stiffness: 120,
    },
  });

  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const y = interpolate(entrance, [0, 1], [60, 0]);
  const scale = interpolate(entrance, [0, 1], [0.94, 1]);

  const backgroundScale = interpolate(frame, [0, 300], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame * 0.12) * 0.025;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 75% 45%, rgba(0,255,136,0.22), transparent 32%), linear-gradient(120deg, #020617 0%, #07111f 48%, #020617 100%)",
          transform: `scale(${backgroundScale})`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.82) 42%, rgba(2,6,23,0.35) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 130,
          top: 155,
          width: 950,
          color: "white",
          opacity,
          transform: `translateY(${y}px) scale(${scale})`,
        }}
      >
        <div
          style={{
            color: "#00FF88",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 34,
            transform: `scale(${pulse})`,
            transformOrigin: "left center",
          }}
        >
          Inteligência Artificial
        </div>

        <h1
          style={{
            fontSize: 92,
            lineHeight: 0.95,
            fontWeight: 800,
            margin: 0,
            letterSpacing: -4,
          }}
        >
          {title}{" "}
          <span style={{ color: "#00FF88" }}>{highlight}</span>
        </h1>

        <p
          style={{
            fontSize: 31,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.78)",
            marginTop: 42,
            maxWidth: 790,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            marginTop: 74,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {bullets.map((bullet, index) => {
            const delay = 50 + index * 12;

            const bulletProgress = spring({
              frame: frame - delay,
              fps,
              config: {
                damping: 18,
                stiffness: 130,
              },
            });

            const bulletOpacity = interpolate(bulletProgress, [0, 1], [0, 1]);
            const bulletY = interpolate(bulletProgress, [0, 1], [28, 0]);

            return (
              <div
                key={bullet}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: bulletOpacity,
                  transform: `translateY(${bulletY}px)`,
                  fontSize: 30,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: "#00FF88",
                    boxShadow: "0 0 24px rgba(0,255,136,0.9)",
                  }}
                />
                {bullet}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      <Sequence from={0} durationInFrames={300}>
        <Scene
          title="NVIDIA acelera a IA"
          highlight="aberta"
          subtitle="Uma nova fase da inteligência artificial começa quando infraestrutura, modelos e desenvolvedores trabalham em um ecossistema aberto."
          bullets={[
            "Ecossistema aberto",
            "Foco em plataforma",
            "Escala global",
          ]}
        />
      </Sequence>

      <Sequence from={300} durationInFrames={300}>
        <Scene
          title="Mais poder para"
          highlight="desenvolvedores"
          subtitle="Ferramentas, bibliotecas e aceleração por GPU ajudam equipes a criar soluções de IA com mais velocidade e controle."
          bullets={[
            "Deploy mais rápido",
            "Ferramentas escaláveis",
            "Integração com modelos modernos",
          ]}
        />
      </Sequence>

      <Sequence from={600} durationInFrames={300}>
        <Scene
          title="IA pronta para"
          highlight="escala"
          subtitle="A combinação de hardware, software e ecossistema permite levar aplicações inteligentes para empresas, produtos e automações."
          bullets={[
            "Performance corporativa",
            "Arquitetura robusta",
            "Visão de futuro",
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
