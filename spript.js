const data = {
  "Ciclo 1": [
    { codigo: "GPEG101", nombre: "OBJETIVOS DE DESARROLLO SOSTENIBLE" },
    { codigo: "GPEG102", nombre: "INGLÉS I" },
    { codigo: "HEEE101", nombre: "PENSAMIENTO LÓGICO" },
    { codigo: "HEEE102", nombre: "HABILIDADES COMUNICATIVAS" },
    { codigo: "HEEE103", nombre: "PERSPECTIVA DE LA INGENIERÍA Y ARQUITECTURA" }
  ],
  "Ciclo 2": [
    { codigo: "GPEG203", nombre: "CONSTITUCIÓN Y DERECHOS HUMANOS" },
    { codigo: "GPEG204", nombre: "CÁTEDRA VALLEJO" },
    { codigo: "GPEG205", nombre: "INGLÉS II", prerequisitos: ["GPEG102"] },
    { codigo: "HEEE204", nombre: "CAMBIO CLIMÁTICO Y GESTIÓN DE RIESGOS" },
    { codigo: "HEEE205", nombre: "EXPRESIÓN GRÁFICA" } 
  ],
  "Ciclo 3": [
    { codigo: "GPEG306", nombre: "FILOSOFÍA Y ÉTICA" },
    { codigo: "GPEG307", nombre: "INGLÉS III", prerequisitos: ["GPEG205"] },
    { codigo: "HEEE306", nombre: "CREATIVIDAD E INNOVACIÓN" },
    { codigo: "HEEE307", nombre: "ACCESIBILIDAD Y DISEÑO UNIVERSAL" },
    { codigo: "IPEE301", nombre: "ESTADÍSTICA Y ANÁLISIS DE DATOS" }
  ],
  "Ciclo 4": [
    { codigo: "GPEG408", nombre: "INGLÉS IV", prerequisitos: ["GPEG307"] },
    { codigo: "HEEE408", nombre: "MATEMÁTICA PARA LA INGENIERÍA", prerequisitos: ["HEEE101"] },
    { codigo: "HEEE409", nombre: "FÍSICA GENERAL" },
    { codigo: "HEEL401", nombre: "ALGORITMOS Y PROGRAMACIÓN" }, // BCISPA02 omitido
    { codigo: "IPEE402", nombre: "METODOLOGÍA DE LA INVESTIGACIÓN CIENTÍFICA", prerequisitos: ["IPEE301"] }
  ],
  "Ciclo 5": [
    { codigo: "GPEG509", nombre: "INGLÉS V", prerequisitos: ["GPEG408"] },
    { codigo: "HEEE510", nombre: "CÁLCULO INTEGRAL Y ECUACIONES DIFERENCIALES", prerequisitos: ["HEEE408"] },
    { codigo: "HEEL502", nombre: "PROGRAMACIÓN ORIENTADA A OBJETOS", prerequisitos: ["HEEL401"] },
    { codigo: "HEEL503", nombre: "GESTIÓN DE DATOS E INFORMACIÓN" },
    { codigo: "HEEL504", nombre: "REDES INALÁMBRICAS Y TELEFONÍA IP", prerequisitos: ["HEEE409"] }
  ],
  "Ciclo 6": [
    { codigo: "GPEG610", nombre: "INGLÉS VI", prerequisitos: ["GPEG509"] },
    { codigo: "HEEL605", nombre: "INGENIERÍA DE SOFTWARE", prerequisitos: ["HEEL502"] },
    { codigo: "HEEL606", nombre: "ADMINISTRACIÓN DE SERVIDORES MULTIPLATAFORMA", prerequisitos: ["HEEL504"] },
    { codigo: "HEEL607", nombre: "INTELIGENCIA DE NEGOCIOS", prerequisitos: ["HEEL503"] }
  ],
  "Ciclo 7": [
    { codigo: "GPEG711", nombre: "INGLÉS VII", prerequisitos: ["GPEG610"] },
    { codigo: "HEEL708", nombre: "TECNOLOGÍA WEB Y CLOUD COMPUTING", prerequisitos: ["HEEL605"] },
    { codigo: "HEEL709", nombre: "MACHINE LEARNING", prerequisitos: ["HEEL607"] },
    { codigo: "HEEL710", nombre: "CIBERSEGURIDAD", prerequisitos: ["HEEL606"] },
    { codigo: "HEEL711", nombre: "FUNDAMENTOS DE MODELADO Y ANIMACIÓN" }
  ],
  "Ciclo 8": [
    { codigo: "GPEG812", nombre: "INGLÉS VIII", prerequisitos: ["GPEG711"] },
    { codigo: "HEEE812", nombre: "GESTIÓN DE PROYECTOS" },
    { codigo: "HEEL812", nombre: "PATRONES DE DISEÑO DE REALIDAD VIRTUAL", prerequisitos: ["HEEL711"] },
    { codigo: "HEEL813", nombre: "PROGRAMACIÓN DE APLICACIONES MÓVILES", prerequisitos: ["HEEL708"] }
  ],
  "Ciclo 9": [
    { codigo: "GPEG913", nombre: "INGLÉS IX", prerequisitos: ["GPEG812"] },
    { codigo: "HEEL914", nombre: "PRÁCTICA PREPROFESIONAL I", prerequisitos: [
        "GPEG101","GPEG102","GPEG203","GPEG204","GPEG205","GPEG306","GPEG307","GPEG408","GPEG509",
        "GPEG610","GPEG711","GPEG812","HEEE101","HEEE102","HEEE103","HEEE204","HEEE205","HEEE306",
        "HEEE307","HEEE408","HEEE409","HEEE510","HEEE812","HEEL401","HEEL502","HEEL503","HEEL504",
        "HEEL605","HEEL606","HEEL607","HEEL708","HEEL709","HEEL710","HEEL711","HEEL812","HEEL813",
        "IPEE301","IPEE402"
      ]
    },
    { codigo: "IPEE903", nombre: "TRABAJO DE INVESTIGACIÓN I", prerequisitos: [
        "GPEG101","GPEG102","GPEG203","GPEG204","GPEG205","GPEG306","GPEG307","GPEG408","GPEG509",
        "GPEG610","GPEG711","GPEG812","HEEE101","HEEE102","HEEE103","HEEE204","HEEE205","HEEE306",
        "HEEE307","HEEE408","HEEE409","HEEE510","HEEE812","HEEL401","HEEL502","HEEL503","HEEL504",
        "HEEL605","HEEL606","HEEL607","HEEL708","HEEL709","HEEL710","HEEL711","HEEL812","HEEL813",
        "IPEE301","IPEE402"
      ]
    }
  ],
  "Ciclo 10": [
    { codigo: "GPEGA14", nombre: "INGLÉS X", prerequisitos: ["GPEG913"] },
    { codigo: "HEELA15", nombre: "PRÁCTICA PREPROFESIONAL II", prerequisitos: ["HEEL914"] },
    { codigo: "IPEEA04", nombre: "TRABAJO DE INVESTIGACIÓN II", prerequisitos: ["IPEE903"] }
  ]
};
const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  for (const [ciclo, ramos] of Object.entries(data)) {
    const divCiclo = document.createElement("div");
    divCiclo.className = "ciclo";
    const h2 = document.createElement("h2");
    h2.textContent = ciclo;
    divCiclo.appendChild(h2);

    for (const ramo of ramos) {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      divRamo.id = ramo.codigo;
      divRamo.textContent = `${ramo.codigo}: ${ramo.nombre}`;

      if (ramo.prerequisitos) {
        divRamo.classList.add("bloqueado");
      }

      divRamo.addEventListener("click", () => {
        if (divRamo.classList.contains("bloqueado")) return;
        divRamo.classList.toggle("aprobado");
        const aprobado = divRamo.classList.contains("aprobado");
        if (aprobado) {
          aprobados.add(ramo.codigo);
        } else {
          aprobados.delete(ramo.codigo);
        }
        actualizarBloqueos();
      });

      divCiclo.appendChild(divRamo);
    }

    contenedor.appendChild(divCiclo);
  }

  actualizarBloqueos();
}

function actualizarBloqueos() {
  for (const [ciclo, ramos] of Object.entries(data)) {
    for (const ramo of ramos) {
      const divRamo = document.getElementById(ramo.codigo);
      if (!ramo.prerequisitos || ramo.prerequisitos.every(pr => aprobados.has(pr))) {
        divRamo.classList.remove("bloqueado");
      } else {
        if (!divRamo.classList.contains("aprobado")) {
          divRamo.classList.add("bloqueado");
        }
      }
    }
  }
}

crearMalla();
