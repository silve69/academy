-- AcademyAdmin - sample data
-- Load after schema.sql: mysql -u USER -p academy < database/seed.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM sale_items;
DELETE FROM sales;
DELETE FROM inventory_movements;
DELETE FROM products;
DELETE FROM tournament_registrations;
DELETE FROM tournaments;
DELETE FROM events;
DELETE FROM sport_evaluations;
DELETE FROM expenses;
DELETE FROM cash_cuts;
DELETE FROM messages;
DELETE FROM message_templates;
DELETE FROM payments;
DELETE FROM payment_concepts;
DELETE FROM payment_methods;
DELETE FROM attendance;
DELETE FROM classes;
DELETE FROM schedules;
DELETE FROM student_groups;
DELETE FROM documents;
DELETE FROM emergency_contacts;
DELETE FROM student_tutors;
DELETE FROM sport_groups;
DELETE FROM coaches;
DELETE FROM disciplines;
DELETE FROM sports;
DELETE FROM courts;
DELETE FROM academy_settings;
DELETE FROM branches;
DELETE FROM tutors;
DELETE FROM students;
DELETE FROM users;
DELETE FROM role_permissions;
DELETE FROM roles;

ALTER TABLE roles AUTO_INCREMENT = 1;
ALTER TABLE role_permissions AUTO_INCREMENT = 1;
ALTER TABLE branches AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE academy_settings AUTO_INCREMENT = 1;
ALTER TABLE students AUTO_INCREMENT = 1;
ALTER TABLE tutors AUTO_INCREMENT = 1;
ALTER TABLE emergency_contacts AUTO_INCREMENT = 1;
ALTER TABLE documents AUTO_INCREMENT = 1;
ALTER TABLE sports AUTO_INCREMENT = 1;
ALTER TABLE disciplines AUTO_INCREMENT = 1;
ALTER TABLE courts AUTO_INCREMENT = 1;
ALTER TABLE coaches AUTO_INCREMENT = 1;
ALTER TABLE sport_groups AUTO_INCREMENT = 1;
ALTER TABLE schedules AUTO_INCREMENT = 1;
ALTER TABLE classes AUTO_INCREMENT = 1;
ALTER TABLE attendance AUTO_INCREMENT = 1;
ALTER TABLE payment_methods AUTO_INCREMENT = 1;
ALTER TABLE payment_concepts AUTO_INCREMENT = 1;
ALTER TABLE payments AUTO_INCREMENT = 1;
ALTER TABLE cash_cuts AUTO_INCREMENT = 1;
ALTER TABLE expenses AUTO_INCREMENT = 1;
ALTER TABLE sport_evaluations AUTO_INCREMENT = 1;
ALTER TABLE events AUTO_INCREMENT = 1;
ALTER TABLE tournaments AUTO_INCREMENT = 1;
ALTER TABLE tournament_registrations AUTO_INCREMENT = 1;
ALTER TABLE products AUTO_INCREMENT = 1;
ALTER TABLE inventory_movements AUTO_INCREMENT = 1;
ALTER TABLE sales AUTO_INCREMENT = 1;
ALTER TABLE sale_items AUTO_INCREMENT = 1;
ALTER TABLE message_templates AUTO_INCREMENT = 1;
ALTER TABLE messages AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO roles (id, name, description) VALUES
  (1, 'admin', 'Acceso completo al MVP'),
  (2, 'coach', 'Gestiona grupos, clases y asistencia'),
  (3, 'staff', 'Apoya altas, pagos y comunicacion'),
  (4, 'caja', 'Opera ventas, gastos y cortes');

INSERT INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) VALUES
  (1, '*', TRUE, TRUE, TRUE, TRUE),
  (2, 'dashboard', TRUE, FALSE, FALSE, FALSE),
  (2, 'alumnos', TRUE, FALSE, TRUE, FALSE),
  (2, 'grupos', TRUE, FALSE, TRUE, FALSE),
  (2, 'deportes', TRUE, FALSE, FALSE, FALSE),
  (2, 'calendario', TRUE, TRUE, TRUE, FALSE),
  (2, 'asistencia', TRUE, TRUE, TRUE, FALSE),
  (2, 'entrenadores', TRUE, FALSE, FALSE, FALSE),
  (2, 'evaluaciones', TRUE, TRUE, TRUE, FALSE),
  (2, 'eventos', TRUE, FALSE, FALSE, FALSE),
  (2, 'comunicacion', TRUE, TRUE, FALSE, FALSE),
  (2, 'reportes', TRUE, FALSE, FALSE, FALSE),
  (3, 'dashboard', TRUE, FALSE, FALSE, FALSE),
  (3, 'alumnos', TRUE, TRUE, TRUE, FALSE),
  (3, 'grupos', TRUE, TRUE, TRUE, FALSE),
  (3, 'deportes', TRUE, TRUE, TRUE, FALSE),
  (3, 'calendario', TRUE, TRUE, TRUE, FALSE),
  (3, 'asistencia', TRUE, TRUE, TRUE, FALSE),
  (3, 'pagos', TRUE, TRUE, TRUE, FALSE),
  (3, 'comunicacion', TRUE, TRUE, TRUE, FALSE),
  (3, 'eventos', TRUE, TRUE, TRUE, FALSE),
  (3, 'reportes', TRUE, FALSE, FALSE, FALSE),
  (4, 'dashboard', TRUE, FALSE, FALSE, FALSE),
  (4, 'pagos', TRUE, TRUE, TRUE, FALSE),
  (4, 'caja', TRUE, TRUE, TRUE, FALSE),
  (4, 'inventario', TRUE, TRUE, TRUE, FALSE),
  (4, 'reportes', TRUE, FALSE, FALSE, FALSE);

INSERT INTO branches (id, name, code, address, phone, status) VALUES
  (1, 'Academy Centro', 'CENTRO', 'Av. Principal 100, Centro', '555-100-0100', 'active'),
  (2, 'Academy Norte', 'NORTE', 'Av. Norte 220, Industrial', '555-100-0200', 'active');

INSERT INTO users (id, role_id, branch_id, name, email, password_hash, phone, status) VALUES
  (1, 1, 1, 'Admin Academy', 'admin@academy-admin.com', '$2y$10$mhKMjXZOW0JbpzutXtLMYe5nln27LIo9h.d6pu3UIj.4r89jEmCea', '555-100-0001', 'active'),
  (2, 2, 1, 'Laura Medina', 'laura.coach@academy-admin.com', '$2y$10$RqGYBmu9QmhUy3/nOFVtYuFcroPGVwgHPOTG/bUINSBR4GO5I2aI2', '555-100-0002', 'active'),
  (3, 2, 1, 'Carlos Vega', 'carlos.coach@academy-admin.com', '$2y$10$RqGYBmu9QmhUy3/nOFVtYuFcroPGVwgHPOTG/bUINSBR4GO5I2aI2', '555-100-0003', 'active'),
  (4, 3, 1, 'Marta Rios', 'marta.staff@academy-admin.com', '$2y$10$DEqnKQgOSjIOn7npKa/0fe0Yoi93DoN0ww8JtfibmOLhqYYJG8yp2', '555-100-0004', 'active'),
  (5, 4, 1, 'Ivan Caja', 'caja@academy-admin.com', '$2y$10$xyYZsY2UoEjqp6I88dA0i.Fma0sxnTNK5rN0YUZbrrKBTk72kwpWC', '555-100-0005', 'active');

INSERT INTO academy_settings (setting_key, setting_value, setting_group, description, updated_by) VALUES
  ('academia_nombre', 'AcademyAdmin', 'academia', 'Nombre publico de la academia', 1),
  ('moneda', 'MXN', 'finanzas', 'Moneda operativa', 1),
  ('tolerancia_asistencia_minutos', '10', 'operacion', 'Minutos antes de marcar retardo', 1);

INSERT INTO students (id, first_name, last_name, birth_date, gender, phone, email, address, medical_notes, status, joined_at) VALUES
  (1, 'Sofia', 'Garcia', '2014-03-12', 'female', NULL, NULL, 'Col. Centro', 'Alergia leve al polvo', 'active', '2026-04-01'),
  (2, 'Diego', 'Hernandez', '2013-07-25', 'male', NULL, NULL, 'Col. Roma', NULL, 'active', '2026-04-03'),
  (3, 'Valentina', 'Lopez', '2015-01-09', 'female', NULL, NULL, 'Col. Del Valle', 'Usa inhalador solo en emergencia', 'active', '2026-04-08'),
  (4, 'Mateo', 'Martinez', '2012-11-18', 'male', NULL, NULL, 'Col. Narvarte', NULL, 'active', '2026-04-10'),
  (5, 'Camila', 'Perez', '2014-09-30', 'female', NULL, NULL, 'Col. Portales', NULL, 'active', '2026-04-12'),
  (6, 'Luis', 'Torres', '2013-05-02', 'male', NULL, NULL, 'Col. Independencia', 'Rodilla en observacion', 'waiting_list', '2026-05-05');

INSERT INTO tutors (id, first_name, last_name, relationship, phone, email, address) VALUES
  (1, 'Ana', 'Garcia', 'madre', '555-200-0101', 'ana.garcia@example.test', 'Col. Centro'),
  (2, 'Roberto', 'Hernandez', 'padre', '555-200-0102', 'roberto.hernandez@example.test', 'Col. Roma'),
  (3, 'Paola', 'Lopez', 'madre', '555-200-0103', 'paola.lopez@example.test', 'Col. Del Valle'),
  (4, 'Jorge', 'Martinez', 'padre', '555-200-0104', 'jorge.martinez@example.test', 'Col. Narvarte'),
  (5, 'Elena', 'Perez', 'madre', '555-200-0105', 'elena.perez@example.test', 'Col. Portales'),
  (6, 'Rosa', 'Torres', 'madre', '555-200-0106', 'rosa.torres@example.test', 'Col. Independencia');

INSERT INTO student_tutors (student_id, tutor_id, is_primary, can_pick_up) VALUES
  (1, 1, TRUE, TRUE),
  (2, 2, TRUE, TRUE),
  (3, 3, TRUE, TRUE),
  (4, 4, TRUE, TRUE),
  (5, 5, TRUE, TRUE),
  (6, 6, TRUE, TRUE);

INSERT INTO emergency_contacts (student_id, name, relationship, phone, priority, notes) VALUES
  (1, 'Miguel Garcia', 'tio', '555-300-0101', 1, NULL),
  (2, 'Claudia Ruiz', 'abuela', '555-300-0102', 1, NULL),
  (3, 'Nora Lopez', 'tia', '555-300-0103', 1, 'Puede recoger con aviso'),
  (4, 'Lucia Cano', 'madre', '555-300-0104', 1, NULL),
  (5, 'Raul Perez', 'padre', '555-300-0105', 1, NULL);

INSERT INTO documents (student_id, document_type, file_name, file_path, status, uploaded_at, reviewed_by, reviewed_at, notes) VALUES
  (1, 'birth_certificate', 'sofia-acta.pdf', 'uploads/students/1/sofia-acta.pdf', 'approved', '2026-04-01 10:00:00', 4, '2026-04-01 12:00:00', NULL),
  (1, 'medical_certificate', 'sofia-medico.pdf', 'uploads/students/1/sofia-medico.pdf', 'pending', '2026-04-02 09:30:00', NULL, NULL, NULL),
  (2, 'waiver', 'diego-responsiva.pdf', 'uploads/students/2/diego-responsiva.pdf', 'approved', '2026-04-03 16:10:00', 4, '2026-04-04 09:00:00', NULL),
  (3, 'medical_certificate', 'valentina-medico.pdf', 'uploads/students/3/valentina-medico.pdf', 'approved', '2026-04-08 11:20:00', 4, '2026-04-08 14:00:00', NULL);

INSERT INTO sports (id, name, description, status) VALUES
  (1, 'Basket', 'Fundamentos, coordinacion y juego por equipos', 'active'),
  (2, 'Volley', 'Tecnica, recepcion, saque y rotacion', 'active'),
  (3, 'Futbol', 'Control de balon, pase, tiro y juego reducido', 'active');

INSERT INTO disciplines (id, sport_id, name, description, status) VALUES
  (1, 1, 'Mini basket', 'Desarrollo motriz y fundamentos', 'active'),
  (2, 2, 'Volley juvenil', 'Rotacion, recepcion y saque', 'active'),
  (3, 3, 'Futbol formativo', 'Tecnica individual y juego reducido', 'active');

INSERT INTO courts (id, branch_id, name, sport_id, capacity, status, notes) VALUES
  (1, 1, 'Cancha 1', 1, 24, 'active', 'Piso techado'),
  (2, 1, 'Cancha 2', 2, 24, 'active', 'Red reglamentaria'),
  (3, 1, 'Campo A', 3, 30, 'active', 'Futbol 7');

INSERT INTO coaches (id, user_id, sport_id, name, phone, email, certification, status, hired_at) VALUES
  (1, 2, 1, 'Laura Medina', '555-100-0002', 'laura.coach@academy-admin.com', 'Entrenadora nivel 1', 'active', '2026-01-10'),
  (2, 3, 3, 'Carlos Vega', '555-100-0003', 'carlos.coach@academy-admin.com', 'Preparador fisico infantil', 'active', '2026-01-15');

INSERT INTO sport_groups (id, sport_id, coach_user_id, coach_id, branch_id, court_id, name, level, min_age, max_age, capacity, monthly_fee, status) VALUES
  (1, 1, 2, 1, 1, 1, 'Basket U12 Mixto', 'beginner', 9, 12, 18, 750.00, 'active'),
  (2, 2, 2, 1, 1, 2, 'Volley Juvenil', 'intermediate', 11, 15, 16, 700.00, 'active'),
  (3, 3, 3, 2, 1, 3, 'Futbol U13', 'beginner', 10, 13, 20, 800.00, 'active');

INSERT INTO student_groups (student_id, group_id, enrolled_at, status) VALUES
  (1, 1, '2026-04-01', 'active'),
  (2, 3, '2026-04-03', 'active'),
  (3, 2, '2026-04-08', 'active'),
  (4, 3, '2026-04-10', 'active'),
  (5, 1, '2026-04-12', 'active'),
  (6, 2, '2026-05-05', 'paused');

INSERT INTO schedules (id, group_id, day_of_week, start_time, end_time, location, court_id, status) VALUES
  (1, 1, 2, '17:00:00', '18:30:00', 'Cancha 1', 1, 'active'),
  (2, 1, 4, '17:00:00', '18:30:00', 'Cancha 1', 1, 'active'),
  (3, 2, 1, '18:00:00', '19:30:00', 'Cancha 2', 2, 'active'),
  (4, 2, 3, '18:00:00', '19:30:00', 'Cancha 2', 2, 'active'),
  (5, 3, 2, '18:30:00', '20:00:00', 'Campo A', 3, 'active'),
  (6, 3, 5, '18:30:00', '20:00:00', 'Campo A', 3, 'active');

INSERT INTO classes (id, group_id, schedule_id, class_date, start_time, end_time, location, topic, status) VALUES
  (1, 1, 1, '2026-05-19', '17:00:00', '18:30:00', 'Cancha 1', 'Bote y pase', 'completed'),
  (2, 1, 2, '2026-05-21', '17:00:00', '18:30:00', 'Cancha 1', 'Tiro en movimiento', 'completed'),
  (3, 2, 3, '2026-05-18', '18:00:00', '19:30:00', 'Cancha 2', 'Recepcion y saque', 'completed'),
  (4, 2, 4, '2026-05-20', '18:00:00', '19:30:00', 'Cancha 2', 'Rotacion basica', 'completed'),
  (5, 3, 5, '2026-05-19', '18:30:00', '20:00:00', 'Campo A', 'Control orientado', 'completed'),
  (6, 3, 6, '2026-05-22', '18:30:00', '20:00:00', 'Campo A', 'Definicion', 'completed'),
  (7, 1, 1, '2026-05-26', '17:00:00', '18:30:00', 'Cancha 1', 'Juego reducido', 'scheduled'),
  (8, 3, 5, '2026-05-26', '18:30:00', '20:00:00', 'Campo A', 'Pases bajo presion', 'scheduled');

INSERT INTO attendance (class_id, student_id, status, checked_in_at, notes, recorded_by) VALUES
  (1, 1, 'present', '2026-05-19 16:58:00', NULL, 2),
  (1, 5, 'late', '2026-05-19 17:08:00', 'Llego despues del calentamiento', 2),
  (2, 1, 'present', '2026-05-21 16:55:00', NULL, 2),
  (2, 5, 'absent', NULL, 'Aviso familiar', 2),
  (3, 3, 'present', '2026-05-18 17:57:00', NULL, 2),
  (3, 6, 'excused', NULL, 'Lista de espera, clase de prueba cancelada', 2),
  (4, 3, 'present', '2026-05-20 17:59:00', NULL, 2),
  (5, 2, 'present', '2026-05-19 18:22:00', NULL, 3),
  (5, 4, 'present', '2026-05-19 18:25:00', NULL, 3),
  (6, 2, 'late', '2026-05-22 18:42:00', NULL, 3),
  (6, 4, 'absent', NULL, 'Sin aviso', 3);

INSERT INTO payment_methods (id, name, code, status) VALUES
  (1, 'Efectivo', 'cash', 'active'),
  (2, 'Tarjeta', 'card', 'active'),
  (3, 'Transferencia', 'transfer', 'active');

INSERT INTO payment_concepts (id, name, code, default_amount, status) VALUES
  (1, 'Mensualidad', 'monthly_fee', 750.00, 'active'),
  (2, 'Inscripcion', 'registration', 300.00, 'active'),
  (3, 'Uniforme', 'uniform', 480.00, 'active');

INSERT INTO payments (student_id, group_id, payment_concept_id, payment_method_id, period_month, concept, amount, due_date, paid_at, payment_method, status, reference, notes, created_by) VALUES
  (1, 1, 1, 3, '2026-05', 'monthly_fee', 750.00, '2026-05-05', '2026-05-03 12:10:00', 'transfer', 'paid', 'TR-1001', NULL, 4),
  (5, 1, 1, NULL, '2026-05', 'monthly_fee', 750.00, '2026-05-05', NULL, NULL, 'overdue', NULL, 'Recordatorio enviado', 4),
  (3, 2, 1, 1, '2026-05', 'monthly_fee', 700.00, '2026-05-05', '2026-05-05 09:30:00', 'cash', 'paid', 'CAJA-204', NULL, 4),
  (6, 2, 2, NULL, '2026-05', 'registration', 300.00, '2026-05-10', NULL, NULL, 'pending', NULL, 'Pendiente hasta confirmar lugar', 4),
  (2, 3, 1, 2, '2026-05', 'monthly_fee', 800.00, '2026-05-05', '2026-05-04 18:00:00', 'card', 'paid', 'CARD-4812', NULL, 4),
  (4, 3, 1, NULL, '2026-05', 'monthly_fee', 800.00, '2026-05-05', NULL, NULL, 'overdue', NULL, 'Pago prometido para fin de semana', 4),
  (1, 1, 1, NULL, '2026-06', 'monthly_fee', 750.00, '2026-06-05', NULL, NULL, 'pending', NULL, NULL, 4),
  (2, 3, 1, NULL, '2026-06', 'monthly_fee', 800.00, '2026-06-05', NULL, NULL, 'pending', NULL, NULL, 4),
  (3, 2, 1, NULL, '2026-06', 'monthly_fee', 700.00, '2026-06-05', NULL, NULL, 'pending', NULL, NULL, 4);

INSERT INTO cash_cuts (id, branch_id, opened_by, closed_by, opened_at, closed_at, opening_amount, cash_sales, card_sales, transfer_sales, expenses_amount, expected_amount, counted_amount, status, notes) VALUES
  (1, 1, 5, 5, '2026-05-27 08:30:00', '2026-05-27 20:15:00', 1000.00, 1230.00, 800.00, 750.00, 320.00, 1910.00, 1910.00, 'closed', 'Cierre sin diferencia'),
  (2, 1, 5, NULL, '2026-05-28 08:30:00', NULL, 1000.00, 480.00, 0.00, 0.00, 0.00, 1480.00, NULL, 'open', 'Caja matutina');

INSERT INTO expenses (id, cash_cut_id, branch_id, concept, amount, spent_at, payment_method_id, supplier, receipt_number, status, notes, created_by) VALUES
  (1, 1, 1, 'Balones de entrenamiento', 320.00, '2026-05-27', 1, 'Deportes Centro', 'TCK-778', 'registered', NULL, 5),
  (2, 2, 1, 'Agua para torneo', 180.00, '2026-05-28', 1, 'Abarrotes Sol', NULL, 'registered', 'Pendiente de ticket', 5);

INSERT INTO sport_evaluations (student_id, group_id, coach_id, evaluated_at, physical_score, technical_score, tactical_score, attitude_score, overall_score, notes, next_steps) VALUES
  (1, 1, 1, '2026-05-24', 88, 82, 76, 95, 85.25, 'Muy buena disposicion y mejora de bote', 'Trabajo de tiro con mano izquierda'),
  (2, 3, 2, '2026-05-24', 91, 79, 72, 88, 82.50, 'Velocidad destacada', 'Refuerzo en recepcion orientada'),
  (3, 2, 1, '2026-05-24', 84, 86, 80, 92, 85.50, 'Gran consistencia en saque', 'Practicar rotacion defensiva');

INSERT INTO events (id, sport_id, branch_id, name, event_type, starts_at, ends_at, location, capacity, status, fee, notes) VALUES
  (1, 1, 1, 'Clinica de tiro', 'clinic', '2026-06-08 10:00:00', '2026-06-08 13:00:00', 'Cancha 1', 20, 'scheduled', 150.00, 'Abierto a alumnos activos'),
  (2, 3, 1, 'Amistoso U13', 'friendly', '2026-06-14 09:00:00', '2026-06-14 11:00:00', 'Campo A', 24, 'scheduled', 0.00, NULL);

INSERT INTO tournaments (id, sport_id, branch_id, name, starts_on, ends_on, location, category, status, fee, notes) VALUES
  (1, 3, 1, 'Copa Academy Verano', '2026-07-06', '2026-07-10', 'Campo A', 'U13', 'open', 350.00, 'Fase de grupos y final'),
  (2, 1, 1, '3x3 Basket Kids', '2026-06-22', '2026-06-22', 'Cancha 1', 'U12', 'planned', 250.00, NULL);

INSERT INTO tournament_registrations (tournament_id, student_id, group_id, status, notes) VALUES
  (1, 2, 3, 'registered', NULL),
  (1, 4, 3, 'paid', 'Pago en caja'),
  (2, 1, 1, 'registered', NULL);

INSERT INTO products (id, sku, name, category, sale_price, cost, stock_quantity, min_stock, status) VALUES
  (1, 'UNI-BASK-12', 'Uniforme basket U12', 'Uniformes', 480.00, 320.00, 12, 5, 'active'),
  (2, 'BAL-FUT-5', 'Balon futbol #5', 'Equipo', 390.00, 250.00, 7, 4, 'active'),
  (3, 'BOT-SIK-750', 'Termo Academy 750ml', 'Accesorios', 180.00, 95.00, 18, 6, 'active');

INSERT INTO inventory_movements (product_id, movement_type, quantity, unit_cost, reference, notes, created_by) VALUES
  (1, 'in', 20, 320.00, 'COMP-1001', 'Compra inicial', 5),
  (1, 'out', 8, 320.00, 'VENTA-0001', 'Ventas mayo', 5),
  (2, 'in', 10, 250.00, 'COMP-1002', 'Compra inicial', 5),
  (2, 'out', 3, 250.00, 'CLASES', 'Reposicion a entrenadores', 5),
  (3, 'in', 25, 95.00, 'COMP-1003', 'Compra inicial', 5),
  (3, 'out', 7, 95.00, 'VENTA-0002', 'Ventas mayo', 5);

INSERT INTO sales (id, student_id, cash_cut_id, payment_method_id, sold_at, subtotal, discount, total, status, reference, created_by) VALUES
  (1, 1, 1, 1, '2026-05-27 16:30:00', 480.00, 0.00, 480.00, 'paid', 'VENTA-0001', 5),
  (2, 4, 1, 2, '2026-05-27 18:10:00', 570.00, 0.00, 570.00, 'paid', 'VENTA-0002', 5);

INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, total) VALUES
  (1, 1, 1, 480.00, 480.00),
  (2, 2, 1, 390.00, 390.00),
  (2, 3, 1, 180.00, 180.00);

INSERT INTO message_templates (id, name, channel, subject, body, status) VALUES
  (1, 'Recordatorio de pago', 'whatsapp', NULL, 'Hola {{tutor_name}}, te recordamos el pago pendiente de {{student_name}} por {{amount}}.', 'active'),
  (2, 'Clase cancelada', 'whatsapp', NULL, 'Hola {{tutor_name}}, la clase de {{group_name}} del {{class_date}} fue cancelada.', 'active'),
  (3, 'Resumen de asistencia', 'email', 'Resumen de asistencia Academy', 'Hola {{tutor_name}}, {{student_name}} asistio a {{present_count}} clases este mes.', 'active');

INSERT INTO messages (template_id, student_id, tutor_id, group_id, channel, recipient, subject, body, status, sent_at, created_by) VALUES
  (1, 5, 5, 1, 'whatsapp', '555-200-0105', NULL, 'Hola Elena, te recordamos el pago pendiente de Camila por 750.00.', 'sent', '2026-05-23 10:00:00', 4),
  (1, 4, 4, 3, 'whatsapp', '555-200-0104', NULL, 'Hola Jorge, te recordamos el pago pendiente de Mateo por 800.00.', 'queued', NULL, 4),
  (3, 1, 1, 1, 'email', 'ana.garcia@example.test', 'Resumen de asistencia Academy', 'Hola Ana, Sofia asistio a 2 clases este mes.', 'sent', '2026-05-24 08:00:00', 4);
