import React from "react";
// import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../supabase/storage";
import { useBuild } from "../../context/BuildContext";
import "./item.css";

export const Item = ({
  id,
  tipo,
  marca,
  serie,
  memoria,
  socket,
  imagen,
  precio,
  stock,
  usdArsRate,
  build,
  isCompatible,
}) => {
  const { addPart, build: currentBuild } = useBuild();
  const isItemCompatible = isCompatible ? isCompatible({ tipo, socket, memoria }, currentBuild) : true;
  const navigate = useNavigate();
  // Normalize socket display and storage
  const primarySocket = Array.isArray(socket) ? socket[0] : socket;
  const socketRef = tipo === "RAM" ? memoria || "—" : primarySocket;
  const imgSrc = getImageUrl(imagen);

  return (
    <>
      <div 
        className={`card ${!isItemCompatible ? 'incompatible' : ''}`} 
        key={id}
        title={!isItemCompatible ? 'este componente no es compatible con tu armado actual' : ''}
      >
        <img className="img" src={imgSrc} alt={marca + serie} />
        <h2>{marca + " " + serie}</h2>
        {tipo === "RAM" ? (
          <p>memoria {socketRef}</p>
        ) : (
          <p>socket {socketRef}</p>
        )}
        <div style={{ marginTop: 8 }}>
          <h3 style={{ margin: 0 }}>precio</h3>
          <p style={{ margin: "4px 0" }}>USD ${precio}</p>
          {typeof usdArsRate === "number" && Number.isFinite(usdArsRate) && (
            <p style={{ margin: 0, color: "#444" }}>
              AR${" "}
              {(Number(precio) * usdArsRate).toLocaleString("es-AR", {
                maximumFractionDigits: 0,
              })}
            </p>
          )}
        </div>

        <button
          className={`ver-mas ${!isItemCompatible ? 'disabled' : ''}`}
          onClick={() => {
            if (!isItemCompatible) return;
            
            // add part to build
            const added = {
              id,
              tipo,
              marca,
              serie,
              socket: primarySocket,
              socketFull: socket,
              memoria,
              imagen,
              precio,
              stock,
            };
            addPart(added);

            // Determine next missing in required chain
            const required = ["CPU", "Motherboard", "RAM"];
            const hypothetical = { ...build, [tipo]: added };
            const nextMissing = required.find((t) => !hypothetical[t]);

            if (!nextMissing) {
              navigate("/armado");
              return;
            }

            // Navigate with compatibility filters when applicable
            if (nextMissing === "Motherboard") {
              const cpu = hypothetical.CPU;
              if (cpu?.socket) {
                const s = encodeURIComponent(cpu.socket);
                navigate(`/productos/Motherboard?socket=${s}`);
              } else {
                navigate("/productos/Motherboard");
              }
              return;
            }

            if (nextMissing === "RAM") {
              const mobo = hypothetical.Motherboard;
              if (mobo?.memoria) {
                const m = encodeURIComponent(mobo.memoria);
                navigate(`/productos/RAM?mem=${m}`);
              } else {
                navigate("/productos/RAM");
              }
              return;
            }

            // If next missing is CPU or anything else
            navigate("/productos/CPU");
          }}
        >
          {isItemCompatible ? 'agregar' : 'incompatible'}
        </button>
      </div>
    </>
  );
};
