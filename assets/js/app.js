const fallbackData = {
  alumnos: [
    { id: 1, nombre: "Ana Torres", edad: 11, grupo: "Futbol Sub-12", estado: "Activo", asistencia: 94, pago: "Al corriente" },
    { id: 2, nombre: "Mateo Ruiz", edad: 9, grupo: "Basquet Inicial", estado: "Activo", asistencia: 88, pago: "Pendiente" },
    { id: 3, nombre: "Sofia Diaz", edad: 13, grupo: "Voleibol Intermedio", estado: "Activo", asistencia: 97, pago: "Al corriente" },
    { id: 4, nombre: "Leo Vargas", edad: 10, grupo: "Futbol Sub-12", estado: "Pausa", asistencia: 71, pago: "Vencido" },
    { id: 5, nombre: "Camila Leon", edad: 8, grupo: "Atletismo Kids", estado: "Activo", asistencia: 91, pago: "Al corriente" }
  ],
  grupos: [
    { id: 1, nombre: "Futbol Sub-12", entrenador: "Marco Luna", alumnos: 18, cupo: 22, dias: "Lun, Mie", hora: "17:00", sede: "Cancha Norte" },
    { id: 2, nombre: "Basquet Inicial", entrenador: "Julia Marin", alumnos: 14, cupo: 18, dias: "Mar, Jue", hora: "16:30", sede: "Gimnasio" },
    { id: 3, nombre: "Voleibol Intermedio", entrenador: "Rene Solis", alumnos: 16, cupo: 20, dias: "Lun, Vie", hora: "18:30", sede: "Cancha Techada" },
    { id: 4, nombre: "Atletismo Kids", entrenador: "Nadia Cruz", alumnos: 12, cupo: 16, dias: "Sab", hora: "09:00", sede: "Pista" }
  ],
  horarios: [
    { dia: "Hoy", hora: "16:30", grupo: "Basquet Inicial", entrenador: "Julia Marin", sede: "Gimnasio" },
    { dia: "Hoy", hora: "17:00", grupo: "Futbol Sub-12", entrenador: "Marco Luna", sede: "Cancha Norte" },
    { dia: "Manana", hora: "18:30", grupo: "Voleibol Intermedio", entrenador: "Rene Solis", sede: "Cancha Techada" },
    { dia: "Sabado", hora: "09:00", grupo: "Atletismo Kids", entrenador: "Nadia Cruz", sede: "Pista" }
  ],
  pagos: [
    { alumno: "Ana Torres", concepto: "Mensualidad mayo", monto: 850, estado: "Pagado" },
    { alumno: "Mateo Ruiz", concepto: "Mensualidad mayo", monto: 850, estado: "Pendiente" },
    { alumno: "Sofia Diaz", concepto: "Uniforme", monto: 620, estado: "Pagado" },
    { alumno: "Leo Vargas", concepto: "Mensualidad abril", monto: 850, estado: "Vencido" }
  ],
  mensajes: [
    { titulo: "Recordatorio de pago", destino: "12 tutores", canal: "WhatsApp", estado: "Programado" },
    { titulo: "Cambio de sede sabado", destino: "Atletismo Kids", canal: "Email", estado: "Borrador" },
    { titulo: "Resumen semanal", destino: "Todos los grupos", canal: "WhatsApp", estado: "Enviado" }
  ]
};

const routes = {
  dashboard: "Dashboard",
  alumnos: "Alumnos",
  grupos: "Grupos",
  calendario: "Horarios y calendario",
  asistencia: "Asistencia",
  pagos: "Pagos",
  comunicacion: "Comunicacion",
  reportes: "Reportes"
};

let appData = structuredClone(fallbackData);
let currentRoute = "dashboard";

const view = document.querySelector("#app-view");
const title = document.querySelector("#view-title");
const apiStatus = document.querySelector("#api-status");
const apiDot = document.querySelector("#api-dot");
const quickAction = document.querySelector("#quick-action");
const refreshButton = document.querySelector("#refresh-button");
const nextClassSidebar = document.querySelector("#next-class-sidebar");

function money(value) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function apiData(payload) {
  if (!payload || typeof payload !== "object") return null;
  return payload.success && Object.hasOwn(payload, "data") ? payload.data : payload;
}

function normalizeStatus(value) {
  const normalized = String(value || "").toLowerCase();
  if (["activo", "active"].includes(normalized)) return "Activo";
  if (["pausa", "pausado", "waiting_list", "inactive"].includes(normalized)) return "Pausa";
  if (["pagado", "paid"].includes(normalized)) return "Pagado";
  if (["vencido", "overdue"].includes(normalized)) return "Vencido";
  if (["pendiente", "pending", "queued"].includes(normalized)) return "Pendiente";
  if (["enviado", "sent"].includes(normalized)) return "Enviado";
  if (["borrador", "draft"].includes(normalized)) return "Borrador";
  return value || "Activo";
}

function normalizeData(payload) {
  const data = apiData(payload);
  if (!data || typeof data !== "object") return structuredClone(fallbackData);

  const alumnos = (data.alumnos || data.students || fallbackData.alumnos).map((student) => ({
    ...student,
    nombre: student.nombre || `${student.first_name || ""} ${student.last_name || ""}`.trim() || "Alumno SportIk",
    edad: Number(student.edad || student.age || 0),
    grupo: student.grupo || student.group_name || "Sin grupo",
    estado: normalizeStatus(student.estado || student.status),
    asistencia: Number(student.asistencia || student.attendance || 90),
    pago: normalizeStatus(student.pago || student.payment_status || "Al corriente")
  }));

  const grupos = (data.grupos || data.groups || fallbackData.grupos).map((group) => ({
    ...group,
    nombre: group.nombre || group.name || "Grupo",
    entrenador: group.entrenador || group.coach_name || "Sin entrenador",
    alumnos: Number(group.alumnos || group.activos || group.active_students || 0),
    cupo: Number(group.cupo || group.capacidad || group.capacity || 20),
    dias: group.dias || group.day || "Semana",
    hora: group.hora || group.hora_inicio || group.start_time || "16:00",
    sede: group.sede || group.lugar || group.location || "Cancha"
  }));

  const horarios = (data.horarios || data.schedule || fallbackData.horarios).map((item) => ({
    ...item,
    dia: item.dia || item.day || "Hoy",
    hora: item.hora || item.hora_inicio || item.start_time || "16:00",
    grupo: item.grupo || item.group_name || "Grupo",
    entrenador: item.entrenador || item.coach_name || "Sin entrenador",
    sede: item.sede || item.lugar || item.location || "Cancha"
  }));

  const pagos = (data.pagos || data.payments || fallbackData.pagos).map((payment) => ({
    ...payment,
    alumno: payment.alumno || payment.student_name || "Alumno",
    concepto: payment.concepto || payment.concept || "Mensualidad",
    monto: Number(payment.monto || payment.amount || 0),
    estado: normalizeStatus(payment.estado || payment.status)
  }));

  const mensajes = (data.mensajes || data.comunicacion || data.messages || fallbackData.mensajes).map((message) => ({
    ...message,
    titulo: message.titulo || message.subject || "Aviso",
    destino: message.destino || message.enviado_a || message.recipient || "Tutores",
    canal: message.canal || message.channel || "WhatsApp",
    estado: normalizeStatus(message.estado || message.status)
  }));

  return {
    alumnos,
    grupos,
    horarios,
    pagos,
    mensajes
  };
}

async function fetchResource(resource) {
  const response = await fetch(`api/${resource}.php`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`${resource}: HTTP ${response.status}`);
  return apiData(await response.json());
}

async function loadData() {
  apiStatus.textContent = "Conectando con API...";
  apiDot.className = "status-dot";

  try {
    const [alumnos, grupos, horarios, pagos, mensajes] = await Promise.all([
      fetchResource("alumnos"),
      fetchResource("grupos"),
      fetchResource("horarios"),
      fetchResource("pagos"),
      fetchResource("comunicacion")
    ]);
    appData = normalizeData({ alumnos, grupos, horarios, pagos, comunicacion: mensajes });
    apiStatus.textContent = "Datos cargados desde API PHP";
    apiDot.className = "status-dot is-live";
  } catch (error) {
    appData = structuredClone(fallbackData);
    apiStatus.textContent = "API no disponible; mostrando datos de ejemplo para revisar el MVP";
    apiDot.className = "status-dot is-fallback";
  }

  render();
}

function setRoute(route) {
  currentRoute = routes[route] ? route : "dashboard";
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === currentRoute);
  });
  title.textContent = routes[currentRoute];
  quickAction.textContent = quickActions[currentRoute] || "Nueva accion";
  render();
  view.focus({ preventScroll: true });
}

function getStats() {
  const activeStudents = appData.alumnos.filter((student) => student.estado === "Activo").length;
  const pendingPayments = appData.pagos.filter((payment) => payment.estado !== "Pagado");
  const revenue = appData.pagos.filter((payment) => payment.estado === "Pagado").reduce((sum, payment) => sum + payment.monto, 0);
  const avgAttendance = Math.round(appData.alumnos.reduce((sum, student) => sum + student.asistencia, 0) / appData.alumnos.length);

  return { activeStudents, pendingPayments: pendingPayments.length, revenue, avgAttendance };
}

function renderKpis() {
  const stats = getStats();
  return `
    <div class="kpi-grid">
      <article class="kpi"><span>Alumnos activos</span><strong>${stats.activeStudents}</strong><em>${appData.alumnos.length} registrados</em></article>
      <article class="kpi"><span>Grupos abiertos</span><strong>${appData.grupos.length}</strong><em>Cupos disponibles</em></article>
      <article class="kpi"><span>Asistencia promedio</span><strong>${stats.avgAttendance}%</strong><em>Ultimas sesiones</em></article>
      <article class="kpi"><span>Ingresos cobrados</span><strong>${money(stats.revenue)}</strong><em>${stats.pendingPayments} pagos pendientes</em></article>
    </div>
  `;
}

function renderDashboard() {
  return `
    ${renderKpis()}
    <div class="two-column">
      <section class="panel">
        <div class="panel-header">
          <h2>Agenda inmediata</h2>
          <button class="secondary-action" type="button" data-route-button="calendario">Ver horarios</button>
        </div>
        ${renderScheduleList(appData.horarios.slice(0, 4))}
      </section>
      <section class="panel">
        <div class="panel-header">
          <h2>Alertas MVP</h2>
        </div>
        <div class="list">
          <div class="message-item"><div class="row"><strong>Pagos por revisar</strong><span class="badge is-warning">${getStats().pendingPayments}</span></div><p class="meta">Seguimiento sugerido a tutores con saldo pendiente.</p></div>
          <div class="message-item"><div class="row"><strong>Cupo alto</strong><span class="badge">${mostFullGroup().nombre}</span></div><p class="meta">${mostFullGroup().alumnos} de ${mostFullGroup().cupo} lugares ocupados.</p></div>
        </div>
      </section>
    </div>
  `;
}

function renderStudents() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Directorio de alumnos</h2>
        <span class="badge">${appData.alumnos.length} registros</span>
      </div>
      <div class="toolbar">
        <input class="input" id="student-search" type="search" placeholder="Buscar alumno o grupo">
        <select class="select" id="student-filter">
          <option value="todos">Todos</option>
          <option value="Activo">Activos</option>
          <option value="Pausa">En pausa</option>
        </select>
      </div>
    </section>
    <section class="module-grid" id="student-list">${studentCards(appData.alumnos)}</section>
  `;
}

function studentCards(students) {
  if (!students.length) return `<div class="empty-state">Sin alumnos con ese filtro.</div>`;
  return students.map((student) => `
    <article class="student-card">
      <div class="row">
        <div class="row-start truncate">
          <span class="avatar">${initials(student.nombre)}</span>
          <div class="truncate">
            <strong>${student.nombre}</strong>
            <span class="meta">${student.edad} anos - ${student.grupo}</span>
          </div>
        </div>
        <span class="badge ${student.estado === "Pausa" ? "is-warning" : ""}">${student.estado}</span>
      </div>
      <p class="meta">Asistencia ${student.asistencia}% - Pago ${student.pago}</p>
      <div class="progress"><span style="width:${student.asistencia}%"></span></div>
    </article>
  `).join("");
}

function renderGroups() {
  return `
    <section class="module-grid">
      ${appData.grupos.map((group) => `
        <article class="group-card">
          <div class="row">
            <strong>${group.nombre}</strong>
            <span class="badge">${group.alumnos}/${group.cupo}</span>
          </div>
          <p class="meta">${group.entrenador} - ${group.sede}</p>
          <p class="meta">${group.dias} - ${group.hora}</p>
          <div class="progress"><span style="width:${Math.round((group.alumnos / group.cupo) * 100)}%"></span></div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderSchedule() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Calendario semanal</h2>
        <button class="secondary-action" type="button">Agregar clase</button>
      </div>
      ${renderScheduleList(appData.horarios)}
    </section>
  `;
}

function renderScheduleList(items) {
  nextClassSidebar.textContent = `${appData.horarios[0]?.grupo || "Sin clases"} - ${appData.horarios[0]?.hora || ""}`;
  return `
    <div class="schedule-list">
      ${items.map((item) => `
        <article class="schedule-item">
          <span class="timebox">${item.hora}</span>
          <div>
            <strong>${item.grupo}</strong>
            <p class="meta">${item.dia} - ${item.entrenador} - ${item.sede}</p>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderAttendance() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Lista de hoy</h2>
        <span class="badge">Futbol Sub-12</span>
      </div>
      <div class="attendance-grid">
        ${appData.alumnos.map((student) => `
          <article class="attendance-row">
            <div class="row-start truncate">
              <span class="avatar">${initials(student.nombre)}</span>
              <div class="truncate">
                <strong>${student.nombre}</strong>
                <span class="meta">${student.grupo}</span>
              </div>
            </div>
            <div class="toggle-group" role="group" aria-label="Asistencia de ${student.nombre}">
              <button class="toggle is-selected" type="button">Presente</button>
              <button class="toggle" type="button">Falta</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPayments() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Control de pagos</h2>
        <span class="badge">${money(appData.pagos.reduce((sum, payment) => sum + payment.monto, 0))}</span>
      </div>
      <div class="list">
        ${appData.pagos.map((payment) => `
          <article class="payment-row">
            <div>
              <strong>${payment.alumno}</strong>
              <p class="meta">${payment.concepto}</p>
            </div>
            <div class="row-start">
              <strong>${money(payment.monto)}</strong>
              <span class="badge ${payment.estado === "Vencido" ? "is-danger" : payment.estado === "Pendiente" ? "is-warning" : ""}">${payment.estado}</span>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCommunication() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Mensajes a tutores</h2>
        <button class="secondary-action" type="button">Nuevo mensaje</button>
      </div>
      <div class="list">
        ${appData.mensajes.map((message) => `
          <article class="message-item">
            <div class="row">
              <strong>${message.titulo}</strong>
              <span class="badge">${message.estado}</span>
            </div>
            <p class="meta">${message.destino} - ${message.canal}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderReports() {
  const groups = appData.grupos.map((group) => ({
    label: group.nombre.replace(" Intermedio", "").replace(" Inicial", ""),
    value: Math.round((group.alumnos / group.cupo) * 100)
  }));

  return `
    ${renderKpis()}
    <section class="panel">
      <div class="panel-header">
        <h2>Ocupacion por grupo</h2>
        <span class="badge">Reporte basico</span>
      </div>
      <div class="chart-bars">
        ${groups.map((group) => `
          <div class="bar-row">
            <span class="meta">${group.label}</span>
            <span class="bar-track"><span style="width:${group.value}%"></span></span>
            <strong>${group.value}%</strong>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function mostFullGroup() {
  return [...appData.grupos].sort((a, b) => (b.alumnos / b.cupo) - (a.alumnos / a.cupo))[0];
}

function bindViewEvents() {
  document.querySelectorAll("[data-route-button]").forEach((button) => {
    button.addEventListener("click", () => {
      location.hash = button.dataset.routeButton;
    });
  });

  const search = document.querySelector("#student-search");
  const filter = document.querySelector("#student-filter");
  const list = document.querySelector("#student-list");

  if (search && filter && list) {
    const applyFilters = () => {
      const term = search.value.trim().toLowerCase();
      const status = filter.value;
      const students = appData.alumnos.filter((student) => {
        const matchesText = `${student.nombre} ${student.grupo}`.toLowerCase().includes(term);
        const matchesStatus = status === "todos" || student.estado === status;
        return matchesText && matchesStatus;
      });
      list.innerHTML = studentCards(students);
    };
    search.addEventListener("input", applyFilters);
    filter.addEventListener("change", applyFilters);
  }

  document.querySelectorAll(".toggle-group").forEach((group) => {
    group.addEventListener("click", (event) => {
      if (!event.target.classList.contains("toggle")) return;
      group.querySelectorAll(".toggle").forEach((button) => button.classList.remove("is-selected"));
      event.target.classList.add("is-selected");
    });
  });
}

const renderers = {
  dashboard: renderDashboard,
  alumnos: renderStudents,
  grupos: renderGroups,
  calendario: renderSchedule,
  asistencia: renderAttendance,
  pagos: renderPayments,
  comunicacion: renderCommunication,
  reportes: renderReports
};

const quickActions = {
  dashboard: "Nueva inscripcion",
  alumnos: "Nuevo alumno",
  grupos: "Nuevo grupo",
  calendario: "Nueva clase",
  asistencia: "Guardar lista",
  pagos: "Registrar pago",
  comunicacion: "Enviar mensaje",
  reportes: "Exportar"
};

function render() {
  view.innerHTML = renderers[currentRoute]();
  bindViewEvents();
}

window.addEventListener("hashchange", () => setRoute(location.hash.replace("#", "")));

document.querySelectorAll("[data-route]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    location.hash = link.dataset.route;
  });
});

refreshButton.addEventListener("click", loadData);

setRoute(location.hash.replace("#", "") || "dashboard");
loadData();
