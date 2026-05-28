const fallbackData = {
  alumnos: [
    { id: 1, nombre: "Ana Torres", edad: 11, grupo: "Futbol Sub-12", estado: "Activo", asistencia: 94, pago: "Al corriente" },
    { id: 2, nombre: "Mateo Ruiz", edad: 9, grupo: "Basquet Inicial", estado: "Activo", asistencia: 88, pago: "Pendiente" },
    { id: 3, nombre: "Sofia Diaz", edad: 13, grupo: "Voleibol Intermedio", estado: "Activo", asistencia: 97, pago: "Al corriente" },
    { id: 4, nombre: "Leo Vargas", edad: 10, grupo: "Futbol Sub-12", estado: "Pausa", asistencia: 71, pago: "Vencido" },
    { id: 5, nombre: "Camila Leon", edad: 8, grupo: "Atletismo Kids", estado: "Activo", asistencia: 91, pago: "Al corriente" }
  ],
  grupos: [
    { id: 1, nombre: "Futbol Sub-12", disciplina: "Futbol", nivel: "Inicial", entrenador: "Marco Luna", alumnos: 18, cupo: 22, dias: "Lun, Mie", hora: "17:00", sede: "Cancha Norte", costo: 850 },
    { id: 2, nombre: "Basquet Inicial", disciplina: "Basquetbol", nivel: "Inicial", entrenador: "Julia Marin", alumnos: 14, cupo: 18, dias: "Mar, Jue", hora: "16:30", sede: "Gimnasio", costo: 850 },
    { id: 3, nombre: "Voleibol Intermedio", disciplina: "Voleibol", nivel: "Intermedio", entrenador: "Rene Solis", alumnos: 16, cupo: 20, dias: "Lun, Vie", hora: "18:30", sede: "Cancha Techada", costo: 900 },
    { id: 4, nombre: "Atletismo Kids", disciplina: "Atletismo", nivel: "Kids", entrenador: "Nadia Cruz", alumnos: 12, cupo: 16, dias: "Sab", hora: "09:00", sede: "Pista", costo: 700 }
  ],
  horarios: [
    { dia: "Hoy", hora: "16:30", grupo: "Basquet Inicial", entrenador: "Julia Marin", sede: "Gimnasio" },
    { dia: "Hoy", hora: "17:00", grupo: "Futbol Sub-12", entrenador: "Marco Luna", sede: "Cancha Norte" },
    { dia: "Manana", hora: "18:30", grupo: "Voleibol Intermedio", entrenador: "Rene Solis", sede: "Cancha Techada" },
    { dia: "Sabado", hora: "09:00", grupo: "Atletismo Kids", entrenador: "Nadia Cruz", sede: "Pista" }
  ],
  pagos: [
    { alumno: "Ana Torres", concepto: "Mensualidad mayo", monto: 850, estado: "Pagado", metodo: "Tarjeta" },
    { alumno: "Mateo Ruiz", concepto: "Mensualidad mayo", monto: 850, estado: "Pendiente", metodo: "Efectivo" },
    { alumno: "Sofia Diaz", concepto: "Uniforme", monto: 620, estado: "Pagado", metodo: "Transferencia" },
    { alumno: "Leo Vargas", concepto: "Mensualidad abril", monto: 850, estado: "Vencido", metodo: "Efectivo" }
  ],
  mensajes: [
    { titulo: "Recordatorio de pago", destino: "12 tutores", canal: "WhatsApp", estado: "Programado" },
    { titulo: "Cambio de sede sabado", destino: "Atletismo Kids", canal: "Email", estado: "Borrador" },
    { titulo: "Resumen semanal", destino: "Todos los grupos", canal: "WhatsApp", estado: "Enviado" }
  ],
  deportes: [
    { nombre: "Futbol", grupos: 1, alumnos: 18, niveles: "Sub-12", estado: "Activo" },
    { nombre: "Basquetbol", grupos: 1, alumnos: 14, niveles: "Inicial", estado: "Activo" },
    { nombre: "Voleibol", grupos: 1, alumnos: 16, niveles: "Intermedio", estado: "Activo" },
    { nombre: "Atletismo", grupos: 1, alumnos: 12, niveles: "Kids", estado: "Activo" }
  ],
  caja: {
    cortes: [
      { fecha: "2026-05-28", responsable: "Admin SportIk", ingresos: 1470, egresos: 320, efectivo: 850, tarjeta: 0, transferencia: 620, estado: "Abierto" },
      { fecha: "2026-05-27", responsable: "Admin SportIk", ingresos: 2550, egresos: 500, efectivo: 900, tarjeta: 850, transferencia: 800, estado: "Cerrado" }
    ],
    movimientos: [
      { hora: "09:10", concepto: "Uniforme Sofia Diaz", tipo: "Ingreso", monto: 620, metodo: "Transferencia" },
      { hora: "10:25", concepto: "Material entrenamiento", tipo: "Egreso", monto: 320, metodo: "Efectivo" },
      { hora: "13:40", concepto: "Mensualidad Ana Torres", tipo: "Ingreso", monto: 850, metodo: "Tarjeta" }
    ]
  },
  entrenadores: [
    { nombre: "Marco Luna", deportes: "Futbol", grupos: 1, alumnos: 18, sesiones: 8, estado: "Activo" },
    { nombre: "Julia Marin", deportes: "Basquetbol", grupos: 1, alumnos: 14, sesiones: 8, estado: "Activo" },
    { nombre: "Rene Solis", deportes: "Voleibol", grupos: 1, alumnos: 16, sesiones: 8, estado: "Activo" },
    { nombre: "Nadia Cruz", deportes: "Atletismo", grupos: 1, alumnos: 12, sesiones: 4, estado: "Activo" }
  ],
  evaluaciones: [
    { alumno: "Ana Torres", grupo: "Futbol Sub-12", fecha: "2026-05-20", tecnica: 88, fisico: 92, disciplina: 96, estado: "Completada" },
    { alumno: "Mateo Ruiz", grupo: "Basquet Inicial", fecha: "2026-05-19", tecnica: 81, fisico: 85, disciplina: 90, estado: "Completada" },
    { alumno: "Sofia Diaz", grupo: "Voleibol Intermedio", fecha: "2026-05-22", tecnica: 93, fisico: 89, disciplina: 95, estado: "Completada" },
    { alumno: "Camila Leon", grupo: "Atletismo Kids", fecha: "2026-05-30", tecnica: 0, fisico: 0, disciplina: 0, estado: "Programada" }
  ],
  eventos: [
    { nombre: "Copa Primavera", tipo: "Torneo", fecha: "2026-06-08", sede: "Cancha Norte", inscritos: 42, estado: "Inscripcion" },
    { nombre: "Festival Kids", tipo: "Evento", fecha: "2026-06-15", sede: "Pista", inscritos: 28, estado: "Planeado" },
    { nombre: "Interacademias Voleibol", tipo: "Torneo", fecha: "2026-06-22", sede: "Cancha Techada", inscritos: 18, estado: "Planeado" }
  ],
  inventario: [
    { articulo: "Balones futbol", categoria: "Equipo", stock: 18, minimo: 10, ubicacion: "Bodega cancha", estado: "Disponible" },
    { articulo: "Conos", categoria: "Entrenamiento", stock: 42, minimo: 30, ubicacion: "Bodega cancha", estado: "Disponible" },
    { articulo: "Uniformes talla 10", categoria: "Venta", stock: 6, minimo: 8, ubicacion: "Recepcion", estado: "Bajo" },
    { articulo: "Botiquin", categoria: "Seguridad", stock: 2, minimo: 2, ubicacion: "Gimnasio", estado: "Disponible" }
  ],
  configuracion: {
    academia: "SportIk Academia",
    moneda: "MXN",
    asistenciaObjetivo: 90,
    pagos: "Mensualidad anticipada",
    canales: ["WhatsApp", "Email"],
    sedes: ["Cancha Norte", "Gimnasio", "Cancha Techada", "Pista"]
  }
};

const routes = {
  dashboard: "Dashboard",
  alumnos: "Alumnos",
  grupos: "Grupos",
  deportes: "Deportes y disciplinas",
  calendario: "Horarios y calendario",
  asistencia: "Asistencia",
  pagos: "Pagos",
  caja: "Caja y cortes",
  entrenadores: "Entrenadores",
  evaluaciones: "Evaluaciones deportivas",
  eventos: "Eventos y torneos",
  inventario: "Inventario",
  comunicacion: "Comunicacion",
  reportes: "Reportes",
  configuracion: "Configuracion"
};

let appData = structuredClone(fallbackData);
let currentRoute = "dashboard";
let currentUser = null;

const view = document.querySelector("#app-view");
const title = document.querySelector("#view-title");
const apiStatus = document.querySelector("#api-status");
const apiDot = document.querySelector("#api-dot");
const quickAction = document.querySelector("#quick-action");
const refreshButton = document.querySelector("#refresh-button");
const nextClassSidebar = document.querySelector("#next-class-sidebar");
const logoutButton = document.querySelector("#logout-button");
const userChip = document.querySelector("#user-chip");
const userName = document.querySelector("#user-name");
const userRole = document.querySelector("#user-role");
const modalBackdrop = document.querySelector("#modal-backdrop");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector("#modal-close");

function money(value) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function initials(name) {
  return String(name || "SI").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function percent(value, total) {
  if (!total) return 0;
  return Math.min(100, Math.round((Number(value || 0) / Number(total || 1)) * 100));
}

function apiData(payload) {
  if (!payload || typeof payload !== "object") return null;
  return payload.success && Object.hasOwn(payload, "data") ? payload.data : payload;
}

function canAccess(route) {
  if (!currentUser) return false;
  const permissions = currentUser.permissions || {};
  return Boolean(permissions["*"] || permissions[route]?.view);
}

function firstAllowedRoute() {
  return Object.keys(routes).find((route) => canAccess(route)) || "dashboard";
}

function applyPermissions() {
  document.querySelectorAll("[data-route]").forEach((link) => {
    const route = link.dataset.route;
    link.hidden = Boolean(currentUser) && !canAccess(route);
  });

  document.querySelectorAll(".nav-group").forEach((group) => {
    const visibleLinks = [...group.querySelectorAll("[data-route]")].filter((link) => !link.hidden);
    group.hidden = Boolean(currentUser) && visibleLinks.length === 0;
  });
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => null);

  if (response.status === 401 && !url.toLowerCase().includes("auth.php?action=login")) {
    currentUser = null;
    showLogin();
  }

  if (!response.ok) {
    throw new Error(payload?.message || `HTTP ${response.status}`);
  }

  return apiData(payload);
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
  if (["fallido", "failed"].includes(normalized)) return "Fallido";
  if (["abierto", "open"].includes(normalized)) return "Abierto";
  if (["cerrado", "closed"].includes(normalized)) return "Cerrado";
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
    disciplina: group.disciplina || group.sport || group.sport_name || "Disciplina",
    nivel: group.nivel || group.level || "General",
    entrenador: group.entrenador || group.coach_name || "Sin entrenador",
    alumnos: Number(group.alumnos || group.activos || group.active_students || 0),
    cupo: Number(group.cupo || group.capacidad || group.capacity || 20),
    dias: group.dias || group.day || "Semana",
    hora: group.hora || group.hora_inicio || group.start_time || "16:00",
    sede: group.sede || group.lugar || group.location || "Cancha",
    costo: Number(group.costo || group.monthly_fee || group.fee || 0),
    estado: normalizeStatus(group.estado || group.status)
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
    estado: normalizeStatus(payment.estado || payment.status),
    metodo: payment.metodo || payment.method || payment.payment_method || "No definido"
  }));

  const mensajes = (data.mensajes || data.comunicacion || data.messages || fallbackData.mensajes).map((message) => ({
    ...message,
    titulo: message.titulo || message.subject || "Aviso",
    destino: message.destino || message.enviado_a || message.recipient || "Tutores",
    canal: message.canal || message.channel || "WhatsApp",
    estado: normalizeStatus(message.estado || message.status)
  }));

  const base = { alumnos, grupos, horarios, pagos, mensajes };

  return {
    ...base,
    deportes: normalizeSports(data.deportes || data.disciplinas || data.sports, base),
    caja: normalizeCash(data.caja || data.cortes || data.cash, base),
    entrenadores: normalizeCoaches(data.entrenadores || data.coaches, base),
    evaluaciones: normalizeEvaluations(data.evaluaciones || data.evaluations, base),
    eventos: normalizeEvents(data.eventos || data.torneos || data.events),
    inventario: normalizeInventory(data.inventario || data.inventory),
    configuracion: normalizeSettings(data.configuracion || data.settings)
  };
}

function normalizeSports(items, base) {
  if (Array.isArray(items) && items.length) {
    return items.map((item) => ({
      nombre: item.nombre || item.name || "Disciplina",
      grupos: Number(item.grupos || item.groups || 0),
      alumnos: Number(item.alumnos || item.students || 0),
      niveles: item.niveles || item.levels || "General",
      estado: normalizeStatus(item.estado || item.status)
    }));
  }

  const map = new Map();
  base.grupos.forEach((group) => {
    const key = group.disciplina || "Disciplina";
    const current = map.get(key) || { nombre: key, grupos: 0, alumnos: 0, niveles: new Set(), estado: "Activo" };
    current.grupos += 1;
    current.alumnos += group.alumnos;
    current.niveles.add(group.nivel || "General");
    map.set(key, current);
  });
  return [...map.values()].map((item) => ({ ...item, niveles: [...item.niveles].join(", ") }));
}

function normalizeCash(items, base) {
  const source = Array.isArray(items) ? { cortes: items, movimientos: [] } : items || {};
  const paid = base.pagos.filter((payment) => payment.estado === "Pagado");
  const ingresos = paid.reduce((sum, payment) => sum + payment.monto, 0);
  return {
    cortes: (source.cortes || fallbackData.caja.cortes).map((cut) => ({
      fecha: cut.fecha || cut.date || "Hoy",
      responsable: cut.responsable || cut.user || "Admin SportIk",
      ingresos: Number(cut.ingresos || cut.income || ingresos),
      egresos: Number(cut.egresos || cut.expenses || 0),
      efectivo: Number(cut.efectivo || cut.cash || 0),
      tarjeta: Number(cut.tarjeta || cut.card || 0),
      transferencia: Number(cut.transferencia || cut.transfer || 0),
      estado: normalizeStatus(cut.estado || cut.status)
    })),
    movimientos: (source.movimientos || source.movements || paid.map((payment) => ({
      hora: "Hoy",
      concepto: payment.concepto,
      tipo: "Ingreso",
      monto: payment.monto,
      metodo: payment.metodo
    }))).map((move) => ({
      hora: move.hora || move.time || "Hoy",
      concepto: move.concepto || move.concept || "Movimiento",
      tipo: move.tipo || move.type || "Ingreso",
      monto: Number(move.monto || move.amount || 0),
      metodo: move.metodo || move.method || "No definido"
    }))
  };
}

function normalizeCoaches(items, base) {
  if (Array.isArray(items) && items.length) {
    return items.map((coach) => ({
      nombre: coach.nombre || coach.name || "Entrenador",
      deportes: coach.deportes || coach.sports || coach.disciplina || "Disciplina",
      grupos: Number(coach.grupos || coach.groups || 0),
      alumnos: Number(coach.alumnos || coach.students || 0),
      sesiones: Number(coach.sesiones || coach.sessions || 0),
      estado: normalizeStatus(coach.estado || coach.status)
    }));
  }

  const map = new Map();
  base.grupos.forEach((group) => {
    const key = group.entrenador;
    const current = map.get(key) || { nombre: key, deportes: new Set(), grupos: 0, alumnos: 0, sesiones: 0, estado: "Activo" };
    current.deportes.add(group.disciplina);
    current.grupos += 1;
    current.alumnos += group.alumnos;
    current.sesiones += String(group.dias || "").split(",").filter(Boolean).length || 1;
    map.set(key, current);
  });
  return [...map.values()].map((coach) => ({ ...coach, deportes: [...coach.deportes].join(", ") }));
}

function normalizeEvaluations(items, base) {
  if (Array.isArray(items) && items.length) {
    return items.map((evaluation) => ({
      alumno: evaluation.alumno || evaluation.student_name || "Alumno",
      grupo: evaluation.grupo || evaluation.group_name || "Grupo",
      fecha: evaluation.fecha || evaluation.date || "Pendiente",
      tecnica: Number(evaluation.tecnica || evaluation.technique || 0),
      fisico: Number(evaluation.fisico || evaluation.physical || 0),
      disciplina: Number(evaluation.disciplina || evaluation.discipline || 0),
      estado: normalizeStatus(evaluation.estado || evaluation.status || "Completada")
    }));
  }

  return base.alumnos.slice(0, 6).map((student, index) => ({
    alumno: student.nombre,
    grupo: student.grupo,
    fecha: index === 5 ? "Programada" : "2026-05-2" + index,
    tecnica: Math.max(0, student.asistencia - 6),
    fisico: Math.max(0, student.asistencia - 2),
    disciplina: student.asistencia,
    estado: index === 5 ? "Programada" : "Completada"
  }));
}

function normalizeEvents(items) {
  return (Array.isArray(items) && items.length ? items : fallbackData.eventos).map((event) => ({
    nombre: event.nombre || event.name || "Evento",
    tipo: event.tipo || event.type || "Evento",
    fecha: event.fecha || event.date || "Por definir",
    sede: event.sede || event.location || "Sede SportIk",
    inscritos: Number(event.inscritos || event.registered || 0),
    estado: event.estado || event.status || "Planeado"
  }));
}

function normalizeInventory(items) {
  return (Array.isArray(items) && items.length ? items : fallbackData.inventario).map((item) => ({
    articulo: item.articulo || item.name || item.item || "Articulo",
    categoria: item.categoria || item.category || "General",
    stock: Number(item.stock || item.quantity || 0),
    minimo: Number(item.minimo || item.minimum || 0),
    ubicacion: item.ubicacion || item.location || "Bodega",
    estado: item.estado || item.status || (Number(item.stock || 0) <= Number(item.minimo || 0) ? "Bajo" : "Disponible")
  }));
}

function normalizeSettings(settings) {
  return {
    ...fallbackData.configuracion,
    ...(settings && typeof settings === "object" ? settings : {})
  };
}

const formSchemas = {
  alumnos: [
    ["nombre", "Nombre completo"],
    ["edad", "Edad", "number"],
    ["grupo_id", "Grupo"],
    ["telefono", "Telefono tutor"],
    ["email", "Email tutor", "email"],
    ["medical_notes", "Observaciones medicas"]
  ],
  grupos: [["nombre", "Nombre"], ["deporte_id", "Deporte"], ["nivel", "Nivel"], ["capacidad", "Cupo", "number"], ["costo", "Mensualidad", "number"]],
  deportes: [["nombre", "Nombre"], ["descripcion", "Descripcion"], ["estado", "Estado"]],
  calendario: [["grupo_id", "Grupo"], ["dia_semana", "Dia de semana", "number"], ["hora_inicio", "Hora inicio", "time"], ["hora_fin", "Hora fin", "time"], ["lugar", "Lugar"]],
  asistencia: [["clase_id", "Clase"], ["alumno_id", "Alumno"], ["estado", "Estado"], ["observaciones", "Observaciones"]],
  pagos: [["alumno_id", "Alumno"], ["concepto", "Concepto"], ["monto", "Monto", "number"], ["fecha_vencimiento", "Vencimiento", "date"], ["estado", "Estado"]],
  caja: [["monto_inicial", "Monto inicial", "number"], ["monto_contado", "Monto contado", "number"], ["observaciones", "Observaciones"]],
  entrenadores: [["nombre", "Nombre"], ["deporte_id", "Deporte"], ["telefono", "Telefono"], ["email", "Email", "email"], ["certificacion", "Certificacion"]],
  evaluaciones: [["alumno_id", "Alumno"], ["grupo_id", "Grupo"], ["puntaje_tecnico", "Tecnica", "number"], ["puntaje_fisico", "Fisico", "number"], ["puntaje_actitud", "Disciplina", "number"], ["observaciones", "Comentarios"]],
  eventos: [["nombre", "Nombre"], ["tipo_evento", "Tipo"], ["inicio", "Inicio", "datetime-local"], ["lugar", "Lugar"], ["precio", "Costo", "number"]],
  inventario: [["nombre", "Producto"], ["categoria", "Categoria"], ["existencia", "Stock", "number"], ["stock_minimo", "Stock minimo", "number"], ["precio_venta", "Precio venta", "number"]],
  comunicacion: [["titulo", "Titulo"], ["canal", "Canal"], ["destinatario", "Destinatario"], ["mensaje", "Mensaje"]],
  configuracion: [["clave", "Clave"], ["valor", "Valor"], ["grupo", "Grupo"], ["descripcion", "Descripcion"]]
};

const resourceForRoute = {
  calendario: "horarios",
  caja: "caja",
  inventario: "productos",
  configuracion: "academia"
};

async function fetchResource(resource) {
  return apiRequest(`api/${resource}.php`);
}

async function loadData() {
  if (!currentUser) {
    showLogin();
    return;
  }

  apiStatus.textContent = "Conectando con API...";
  apiDot.className = "status-dot";

  const resources = ["alumnos", "grupos", "horarios", "pagos", "comunicacion", "deportes", "caja", "entrenadores", "evaluaciones", "eventos", "inventario", "configuracion"].filter((resource) => canAccess(resource) || ["alumnos", "grupos", "horarios", "pagos", "comunicacion"].includes(resource));
  const results = await Promise.allSettled(resources.map((resource) => fetchResource(resource)));
  const payload = {};
  let loaded = 0;

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      payload[resources[index]] = result.value;
      loaded += 1;
    }
  });

  if (loaded > 0) {
    appData = normalizeData(payload);
    apiStatus.textContent = loaded === resources.length ? "Datos cargados desde API PHP" : "API parcial disponible; completando modulos con datos derivados";
    apiDot.className = loaded === resources.length ? "status-dot is-live" : "status-dot is-fallback";
  } else {
    appData = structuredClone(fallbackData);
    apiStatus.textContent = "API no disponible; mostrando datos de ejemplo para revisar el MVP";
    apiDot.className = "status-dot is-fallback";
  }

  render();
}

function setRoute(route) {
  currentRoute = routes[route] ? route : "dashboard";
  if (currentUser && !canAccess(currentRoute)) {
    currentRoute = firstAllowedRoute();
    location.hash = currentRoute;
  }
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
  const avgAttendance = appData.alumnos.length ? Math.round(appData.alumnos.reduce((sum, student) => sum + student.asistencia, 0) / appData.alumnos.length) : 0;
  const overdue = appData.pagos.filter((payment) => payment.estado === "Vencido").length;
  const lowStock = appData.inventario.filter((item) => item.estado === "Bajo" || item.stock <= item.minimo).length;
  const occupancy = appData.grupos.length ? Math.round(appData.grupos.reduce((sum, group) => sum + percent(group.alumnos, group.cupo), 0) / appData.grupos.length) : 0;
  const retention = appData.alumnos.length ? Math.round((activeStudents / appData.alumnos.length) * 100) : 0;
  return { activeStudents, pendingPayments: pendingPayments.length, revenue, avgAttendance, overdue, lowStock, occupancy, retention };
}

function renderKpis() {
  const stats = getStats();
  return `
    <div class="kpi-grid">
      <article class="kpi"><span>Alumnos activos</span><strong>${stats.activeStudents}</strong><em>${appData.alumnos.length} registrados</em></article>
      <article class="kpi"><span>Grupos abiertos</span><strong>${appData.grupos.length}</strong><em>${appData.deportes.length} disciplinas</em></article>
      <article class="kpi"><span>Asistencia promedio</span><strong>${stats.avgAttendance}%</strong><em>Ultimas sesiones</em></article>
      <article class="kpi"><span>Ingresos cobrados</span><strong>${money(stats.revenue)}</strong><em>${stats.pendingPayments} pagos pendientes</em></article>
    </div>
  `;
}

function renderDashboard() {
  const stats = getStats();
  const nextEvents = appData.eventos.slice(0, 3);
  const birthdays = appData.alumnos.slice(0, 3);
  const recentStudents = [...appData.alumnos].slice(-3).reverse();
  return `
    ${renderKpis()}
    <div class="three-column">
      <article class="metric-card"><span class="meta">Pagos vencidos</span><strong>${stats.overdue}</strong><span class="badge ${stats.overdue ? "is-danger" : ""}">Finanzas</span></article>
      <article class="metric-card"><span class="meta">Ocupacion promedio</span><strong>${stats.occupancy}%</strong><span class="badge">Grupos</span></article>
      <article class="metric-card"><span class="meta">Retencion activa</span><strong>${stats.retention}%</strong><span class="badge">Alumnos</span></article>
    </div>
    <div class="dashboard-band two-column">
      <section class="panel">
        <div class="panel-header">
          <h2>Agenda inmediata</h2>
          <button class="secondary-action" type="button" data-route-button="calendario">Ver horarios</button>
        </div>
        ${renderScheduleList(appData.horarios.slice(0, 4))}
      </section>
      <section class="panel">
        <div class="panel-header"><h2>Alertas MVP</h2></div>
        <div class="list">
          <div class="message-item"><div class="row"><strong>Pagos por revisar</strong><span class="badge is-warning">${getStats().pendingPayments}</span></div><p class="meta">Seguimiento sugerido a tutores con saldo pendiente.</p></div>
          <div class="message-item"><div class="row"><strong>Cupo alto</strong><span class="badge">${mostFullGroup().nombre}</span></div><p class="meta">${mostFullGroup().alumnos} de ${mostFullGroup().cupo} lugares ocupados.</p></div>
          <div class="message-item"><div class="row"><strong>Inventario bajo</strong><span class="badge is-danger">${stats.lowStock}</span></div><p class="meta">Articulos por reponer antes de proximas clases.</p></div>
        </div>
      </section>
    </div>
    <div class="three-column">
      <section class="panel">
        <div class="panel-header"><h2>Proximos eventos</h2></div>
        <div class="insight-grid">${nextEvents.map((event) => `<div class="insight-item"><strong>${event.nombre}</strong><span class="meta">${event.fecha} - ${event.sede}</span></div>`).join("")}</div>
      </section>
      <section class="panel">
        <div class="panel-header"><h2>Cumpleanos proximos</h2></div>
        <div class="insight-grid">${birthdays.map((student) => `<div class="insight-item"><strong>${student.nombre}</strong><span class="meta">${student.grupo} - ${student.edad} anos</span></div>`).join("")}</div>
      </section>
      <section class="panel">
        <div class="panel-header"><h2>Nuevos inscritos</h2></div>
        <div class="insight-grid">${recentStudents.map((student) => `<div class="insight-item"><strong>${student.nombre}</strong><span class="meta">${student.estado} - ${student.pago}</span></div>`).join("")}</div>
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
    <button class="student-card" type="button" data-preview-student="${student.id || student.nombre}">
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
    </button>
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
          <p class="meta">${group.disciplina} - ${group.nivel}</p>
          <p class="meta">${group.entrenador} - ${group.sede}</p>
          <p class="meta">${group.dias} - ${group.hora} - ${money(group.costo)}</p>
          <div class="progress"><span style="width:${percent(group.alumnos, group.cupo)}%"></span></div>
          <div class="actions-row"><button class="mini-action" type="button" data-edit-route="grupos" data-edit-id="${group.id || group.nombre}">Editar</button></div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderSports() {
  return `
    <section class="module-grid">
      ${appData.deportes.map((sport) => `
        <article class="group-card">
          <div class="row">
            <strong>${sport.nombre}</strong>
            <span class="badge">${sport.estado}</span>
          </div>
          <p class="meta">${sport.grupos} grupos - ${sport.alumnos} alumnos</p>
          <p class="meta">Niveles: ${sport.niveles}</p>
          <div class="actions-row">
            <button class="mini-action" type="button" data-edit-route="deportes" data-edit-id="${sport.id || sport.nombre}">Editar</button>
            <button class="mini-action" type="button">Ver grupos</button>
          </div>
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
        <button class="secondary-action" type="button" data-open-form="calendario">Agregar clase</button>
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
  const selectedClass = sessionStorage.getItem("sportik_attendance_class") || appData.horarios[0]?.grupo || "todos";
  const visibleStudents = selectedClass === "todos" ? appData.alumnos : appData.alumnos.filter((student) => student.grupo === selectedClass);
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Lista de hoy</h2>
        <div class="panel-header-actions">
          <select class="select" id="attendance-class">
            <option value="todos">Todas las clases</option>
            ${appData.horarios.map((item) => `<option value="${item.grupo}" ${item.grupo === selectedClass ? "selected" : ""}>${item.grupo} - ${item.dia} ${item.hora}</option>`).join("")}
          </select>
          <button class="secondary-action" type="button" data-open-form="asistencia">Registrar asistencia</button>
        </div>
      </div>
      <div class="attendance-grid">
        ${visibleStudents.map((student) => `
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
        `).join("") || `<div class="empty-state">No hay alumnos para la clase seleccionada.</div>`}
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
              <p class="meta">${payment.concepto} - ${payment.metodo}</p>
            </div>
            <div class="row-start">
              <strong>${money(payment.monto)}</strong>
              <span class="badge ${statusClass(payment.estado)}">${payment.estado}</span>
              <button class="mini-action" type="button" data-edit-route="pagos" data-edit-id="${payment.id || payment.alumno}">Editar</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCash() {
  const openCut = appData.caja.cortes[0] || fallbackData.caja.cortes[0];
  const net = openCut.ingresos - openCut.egresos;
  return `
    <div class="three-column">
      <article class="metric-card"><span class="meta">Ingresos del corte</span><strong>${money(openCut.ingresos)}</strong><span class="badge">${openCut.estado}</span></article>
      <article class="metric-card"><span class="meta">Egresos</span><strong>${money(openCut.egresos)}</strong><span class="badge is-warning">Operacion</span></article>
      <article class="metric-card"><span class="meta">Neto estimado</span><strong>${money(net)}</strong><span class="badge">Caja</span></article>
    </div>
    <div class="two-column">
      <section class="panel">
        <div class="panel-header"><h2>Movimientos recientes</h2><button class="secondary-action" type="button" data-open-form="caja">Nuevo movimiento</button></div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Hora</th><th>Concepto</th><th>Tipo</th><th>Metodo</th><th>Monto</th></tr></thead>
            <tbody>${appData.caja.movimientos.map((move) => `<tr><td>${move.hora}</td><td>${move.concepto}</td><td><span class="badge ${move.tipo === "Egreso" ? "is-warning" : ""}">${move.tipo}</span></td><td>${move.metodo}</td><td><strong>${money(move.monto)}</strong></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header"><h2>Cortes</h2><button class="secondary-action" type="button" data-open-form="caja">Cerrar corte</button></div>
        <div class="detail-grid">
          ${appData.caja.cortes.map((cut) => `<div class="detail-row"><span><strong>${cut.fecha}</strong><br><span class="meta">${cut.responsable}</span></span><span><strong>${money(cut.ingresos - cut.egresos)}</strong><br><span class="badge ${cut.estado === "Abierto" ? "is-warning" : ""}">${cut.estado}</span></span></div>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderCoaches() {
  return `
    <section class="panel">
      <div class="panel-header"><h2>Plantilla tecnica</h2><button class="secondary-action" type="button" data-open-form="entrenadores">Nuevo entrenador</button></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Entrenador</th><th>Disciplinas</th><th>Grupos</th><th>Alumnos</th><th>Sesiones</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${appData.entrenadores.map((coach) => `
              <tr>
                <td><strong>${coach.nombre}</strong></td>
                <td>${coach.deportes}</td>
                <td>${coach.grupos}</td>
                <td>${coach.alumnos}</td>
                <td>${coach.sesiones}</td>
                <td><span class="badge">${coach.estado}</span></td>
                <td><button class="mini-action" type="button" data-edit-route="entrenadores" data-edit-id="${coach.id || coach.nombre}">Editar</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderEvaluations() {
  return `
    <section class="panel">
      <div class="panel-header"><h2>Evaluaciones por alumno</h2><button class="secondary-action" type="button" data-open-form="evaluaciones">Nueva evaluacion</button></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Alumno</th><th>Grupo</th><th>Fecha</th><th>Tecnica</th><th>Fisico</th><th>Disciplina</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${appData.evaluaciones.map((evaluation) => `
              <tr>
                <td><strong>${evaluation.alumno}</strong></td>
                <td>${evaluation.grupo}</td>
                <td>${evaluation.fecha}</td>
                <td>${scoreCell(evaluation.tecnica)}</td>
                <td>${scoreCell(evaluation.fisico)}</td>
                <td>${scoreCell(evaluation.disciplina)}</td>
                <td><span class="badge ${evaluation.estado === "Programada" ? "is-info" : ""}">${evaluation.estado}</span></td>
                <td><button class="mini-action" type="button" data-edit-route="evaluaciones" data-edit-id="${evaluation.id || evaluation.alumno}">Editar</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderEvents() {
  return `
    <section class="module-grid">
      ${appData.eventos.map((event) => `
        <article class="group-card">
          <div class="row">
            <strong>${event.nombre}</strong>
            <span class="badge ${event.tipo === "Torneo" ? "is-info" : ""}">${event.tipo}</span>
          </div>
          <p class="meta">${event.fecha} - ${event.sede}</p>
          <p class="meta">${event.inscritos} inscritos - ${event.estado}</p>
          <div class="actions-row">
            <button class="mini-action" type="button" data-edit-route="eventos" data-edit-id="${event.id || event.nombre}">Editar</button>
            <button class="mini-action" type="button">Fixture</button>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderInventory() {
  return `
    <section class="panel">
      <div class="panel-header"><h2>Existencias</h2><button class="secondary-action" type="button" data-open-form="inventario">Registrar entrada</button></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Articulo</th><th>Categoria</th><th>Stock</th><th>Minimo</th><th>Ubicacion</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${appData.inventario.map((item) => `
              <tr>
                <td><strong>${item.articulo}</strong></td>
                <td>${item.categoria}</td>
                <td><div class="stock-level"><div class="progress"><span style="width:${percent(item.stock, Math.max(item.minimo * 2, item.stock))}%"></span></div><strong>${item.stock}</strong></div></td>
                <td>${item.minimo}</td>
                <td>${item.ubicacion}</td>
                <td><span class="badge ${item.estado === "Bajo" ? "is-danger" : ""}">${item.estado}</span></td>
                <td><button class="mini-action" type="button" data-edit-route="inventario" data-edit-id="${item.id || item.articulo}">Editar</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderCommunication() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Mensajes a tutores</h2>
        <button class="secondary-action" type="button" data-open-form="comunicacion">Nuevo mensaje</button>
      </div>
      <div class="list">
        ${appData.mensajes.map((message) => `
          <article class="message-item">
            <div class="row">
              <strong>${message.titulo}</strong>
              <span class="badge ${statusClass(message.estado)}">${message.estado}</span>
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
    value: percent(group.alumnos, group.cupo)
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

function renderSettings() {
  const settings = appData.configuracion;
  return `
    <div class="two-column">
      <section class="panel">
        <div class="panel-header"><h2>Academia</h2><button class="secondary-action" type="button" data-open-form="configuracion">Guardar</button></div>
        <div class="detail-grid">
          <label class="detail-row"><span>Nombre</span><input class="input" value="${settings.academia}"></label>
          <label class="detail-row"><span>Moneda</span><input class="input" value="${settings.moneda}"></label>
          <label class="detail-row"><span>Objetivo asistencia</span><input class="input" type="number" value="${settings.asistenciaObjetivo}"></label>
          <label class="detail-row"><span>Politica de pagos</span><input class="input" value="${settings.pagos}"></label>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header"><h2>Operacion</h2><button class="secondary-action" type="button" data-open-form="configuracion">Agregar sede</button></div>
        <div class="detail-grid">
          <div class="detail-row"><span>Canales</span><strong>${settings.canales.join(", ")}</strong></div>
          ${settings.sedes.map((site) => `<div class="detail-row"><span>${site}</span><button class="mini-action" type="button">Editar</button></div>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function scoreCell(value) {
  if (!value) return `<span class="meta">Pendiente</span>`;
  return `<strong>${value}</strong><div class="progress"><span style="width:${value}%"></span></div>`;
}

function statusClass(status) {
  if (status === "Vencido" || status === "Fallido" || status === "Bajo") return "is-danger";
  if (status === "Pendiente" || status === "Borrador" || status === "Abierto") return "is-warning";
  return "";
}

function mostFullGroup() {
  return [...appData.grupos].sort((a, b) => (b.alumnos / b.cupo) - (a.alumnos / a.cupo))[0] || { nombre: "Sin grupos", alumnos: 0, cupo: 0 };
}

function openModal(titleText, content) {
  modalTitle.textContent = titleText;
  modalBody.innerHTML = content;
  modalBackdrop.hidden = false;
}

function closeModal() {
  modalBackdrop.hidden = true;
  modalBody.innerHTML = "";
}

function routeItems(route) {
  return {
    alumnos: appData.alumnos,
    grupos: appData.grupos,
    deportes: appData.deportes,
    calendario: appData.horarios,
    pagos: appData.pagos,
    caja: appData.caja.cortes,
    entrenadores: appData.entrenadores,
    evaluaciones: appData.evaluaciones,
    eventos: appData.eventos,
    inventario: appData.inventario,
    comunicacion: appData.mensajes
  }[route] || [];
}

function findItem(route, id) {
  return routeItems(route).find((item) => String(item.id || item.nombre || item.alumno || item.articulo) === String(id)) || null;
}

function openForm(route = currentRoute, item = null) {
  const schema = formSchemas[route] || [["nombre", "Nombre"], ["estado", "Estado"]];
  const isEdit = Boolean(item);
  const fields = schema.map(([name, label, type = "text"]) => {
    const value = item?.[name] || item?.[label.toLowerCase()] || "";
    return `
      <label>
        <span class="label">${label}</span>
        <input class="input" name="${name}" type="${type}" value="${String(value).replaceAll('"', "&quot;")}">
      </label>
    `;
  }).join("");

  openModal(`${isEdit ? "Editar" : "Nuevo"} ${routes[route] || "registro"}`, `
    <form class="form-grid" id="module-form" data-form-route="${route}" data-form-id="${item?.id || ""}">
      ${fields}
      <div class="form-actions">
        <button class="secondary-action" type="button" data-close-modal>Cancelar</button>
        <button class="primary-action" type="submit">${isEdit ? "Guardar cambios" : "Crear registro"}</button>
      </div>
    </form>
  `);
}

function openStudentPreview(student) {
  openModal(student.nombre, `
    <div class="preview-head">
      <span class="avatar">${initials(student.nombre)}</span>
      <div>
        <p class="eyebrow">Preview alumno</p>
        <h2>${student.nombre}</h2>
        <p class="meta">${student.edad} anos - ${student.grupo}</p>
      </div>
    </div>
    <div class="three-column">
      <article class="metric-card"><span class="meta">Estado</span><strong>${student.estado}</strong><span class="badge">${student.pago}</span></article>
      <article class="metric-card"><span class="meta">Asistencia</span><strong>${student.asistencia}%</strong><span class="badge">Ultimas clases</span></article>
      <article class="metric-card"><span class="meta">Adeudo</span><strong>${money(student.adeudo || 0)}</strong><span class="badge ${student.pago === "Pendiente" ? "is-warning" : ""}">Pagos</span></article>
    </div>
    <div class="detail-grid">
      <div class="detail-row"><span>Tutor</span><strong>${student.telefono_tutor || student.telefono || "Sin capturar"}</strong></div>
      <div class="detail-row"><span>Email</span><strong>${student.email_tutor || student.email || "Sin capturar"}</strong></div>
      <div class="detail-row"><span>Observaciones medicas</span><strong>${student.medical_notes || student.observaciones || "Sin observaciones"}</strong></div>
    </div>
    <div class="form-actions">
      <button class="secondary-action" type="button" data-close-modal>Cerrar</button>
      <button class="primary-action" type="button" data-edit-route="alumnos" data-edit-id="${student.id || student.nombre}">Editar alumno</button>
    </div>
  `);
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

  document.querySelectorAll("[data-open-form]").forEach((button) => {
    button.addEventListener("click", () => openForm(button.dataset.openForm));
  });

  document.querySelectorAll("[data-edit-route]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const route = button.dataset.editRoute;
      openForm(route, findItem(route, button.dataset.editId));
    });
  });

  document.querySelectorAll("[data-preview-student]").forEach((button) => {
    button.addEventListener("click", () => {
      const student = findItem("alumnos", button.dataset.previewStudent);
      if (student) openStudentPreview(student);
    });
  });

  const attendanceClass = document.querySelector("#attendance-class");
  if (attendanceClass) {
    attendanceClass.addEventListener("change", () => {
      sessionStorage.setItem("sportik_attendance_class", attendanceClass.value);
      render();
    });
  }
}

function showLogin(message = "") {
  document.body.classList.remove("is-authenticated");
  title.textContent = "Iniciar sesion";
  view.innerHTML = `
    <section class="login-shell">
      <form class="login-card" id="login-form">
        <img class="login-logo" src="logo/logo_sportik.png" alt="SportIk">
        <div>
          <p class="eyebrow">Acceso SportIk</p>
          <h1>Iniciar sesion</h1>
          <p class="meta">Entra con un perfil para ver solo los modulos permitidos.</p>
        </div>
        <label>
          <span class="label">Email</span>
          <input class="input" name="email" type="email" value="admin@sportik.test" autocomplete="username" required>
        </label>
        <label>
          <span class="label">Contrasena</span>
          <input class="input" name="password" type="password" value="admin123" autocomplete="current-password" required>
        </label>
        <button class="primary-action" type="submit">Entrar</button>
        <p class="login-error" id="login-error">${message}</p>
        <div class="login-demo">
          <span class="meta">Demo: admin@sportik.test / admin123</span>
          <span class="meta">Coach: laura.coach@sportik.test / coach123</span>
          <span class="meta">Caja: caja@sportik.test / caja123</span>
        </div>
      </form>
    </section>
  `;

  document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const error = document.querySelector("#login-error");
    error.textContent = "Validando acceso...";

    try {
      currentUser = await apiRequest("api/Auth.php?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password")
        })
      });
      onAuthenticated();
    } catch (errorMessage) {
      error.textContent = errorMessage.message || "No se pudo iniciar sesion";
    }
  });
}

function onAuthenticated() {
  document.body.classList.add("is-authenticated");
  userChip.hidden = false;
  userName.textContent = currentUser.name || "Usuario";
  userRole.textContent = currentUser.role || "perfil";
  applyPermissions();

  const targetRoute = canAccess(currentRoute) ? currentRoute : firstAllowedRoute();
  currentRoute = targetRoute;
  location.hash = targetRoute;
  setRoute(targetRoute);
  loadData();
}

async function loadSession() {
  try {
    currentUser = await apiRequest("api/Auth.php?action=me");
    onAuthenticated();
  } catch (error) {
    showLogin();
  }
}

const renderers = {
  dashboard: renderDashboard,
  alumnos: renderStudents,
  grupos: renderGroups,
  deportes: renderSports,
  calendario: renderSchedule,
  asistencia: renderAttendance,
  pagos: renderPayments,
  caja: renderCash,
  entrenadores: renderCoaches,
  evaluaciones: renderEvaluations,
  eventos: renderEvents,
  inventario: renderInventory,
  comunicacion: renderCommunication,
  reportes: renderReports,
  configuracion: renderSettings
};

const quickActions = {
  dashboard: "Nueva inscripcion",
  alumnos: "Nuevo alumno",
  grupos: "Nuevo grupo",
  deportes: "Nueva disciplina",
  calendario: "Nueva clase",
  asistencia: "Guardar lista",
  pagos: "Registrar pago",
  caja: "Cerrar corte",
  entrenadores: "Nuevo entrenador",
  evaluaciones: "Nueva evaluacion",
  eventos: "Nuevo evento",
  inventario: "Nueva entrada",
  comunicacion: "Enviar mensaje",
  reportes: "Exportar",
  configuracion: "Guardar"
};

function render() {
  view.innerHTML = (renderers[currentRoute] || renderDashboard)();
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
quickAction.addEventListener("click", () => openForm(currentRoute));
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop || event.target.closest("[data-close-modal]")) {
    closeModal();
  }
});
modalBody.addEventListener("submit", async (event) => {
  if (event.target.id !== "module-form") return;
  event.preventDefault();
  const form = event.target;
  const route = form.dataset.formRoute;
  const id = form.dataset.formId;
  const payload = Object.fromEntries(new FormData(form).entries());
  const resource = resourceForRoute[route] || route;
  const url = id ? `api/${resource}.php?id=${encodeURIComponent(id)}` : `api/${resource}.php`;

  try {
    await apiRequest(url, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    closeModal();
    await loadData();
  } catch (error) {
    openModal("No se pudo guardar", `
      <p class="login-error">${error.message}</p>
      <div class="form-actions"><button class="primary-action" type="button" data-close-modal>Entendido</button></div>
    `);
  }
});
logoutButton.addEventListener("click", async () => {
  try {
    await apiRequest("api/Auth.php?action=logout", { method: "POST" });
  } catch (error) {
    // The local session is cleared even if the network response is interrupted.
  }
  currentUser = null;
  appData = structuredClone(fallbackData);
  showLogin();
});

showLogin();
loadSession();
