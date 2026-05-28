-- SportIk MVP - sample data
-- Load after schema.sql: mysql -u USER -p sportik < database/seed.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM messages;
DELETE FROM message_templates;
DELETE FROM payments;
DELETE FROM attendance;
DELETE FROM classes;
DELETE FROM schedules;
DELETE FROM student_groups;
DELETE FROM documents;
DELETE FROM emergency_contacts;
DELETE FROM student_tutors;
DELETE FROM sport_groups;
DELETE FROM sports;
DELETE FROM tutors;
DELETE FROM students;
DELETE FROM users;
DELETE FROM roles;

ALTER TABLE roles AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE students AUTO_INCREMENT = 1;
ALTER TABLE tutors AUTO_INCREMENT = 1;
ALTER TABLE emergency_contacts AUTO_INCREMENT = 1;
ALTER TABLE documents AUTO_INCREMENT = 1;
ALTER TABLE sports AUTO_INCREMENT = 1;
ALTER TABLE sport_groups AUTO_INCREMENT = 1;
ALTER TABLE schedules AUTO_INCREMENT = 1;
ALTER TABLE classes AUTO_INCREMENT = 1;
ALTER TABLE attendance AUTO_INCREMENT = 1;
ALTER TABLE payments AUTO_INCREMENT = 1;
ALTER TABLE message_templates AUTO_INCREMENT = 1;
ALTER TABLE messages AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO roles (id, name, description) VALUES
  (1, 'admin', 'Acceso completo al MVP'),
  (2, 'coach', 'Gestiona grupos, clases y asistencia'),
  (3, 'staff', 'Apoya altas, pagos y comunicacion');

INSERT INTO users (id, role_id, name, email, password_hash, phone, status) VALUES
  (1, 1, 'Admin SportIk', 'admin@sportik.test', '$2y$10$demoHashForLocalSeedOnly00000000000000000000000000', '555-100-0001', 'active'),
  (2, 2, 'Laura Medina', 'laura.coach@sportik.test', '$2y$10$demoHashForLocalSeedOnly00000000000000000000000000', '555-100-0002', 'active'),
  (3, 2, 'Carlos Vega', 'carlos.coach@sportik.test', '$2y$10$demoHashForLocalSeedOnly00000000000000000000000000', '555-100-0003', 'active'),
  (4, 3, 'Marta Rios', 'marta.staff@sportik.test', '$2y$10$demoHashForLocalSeedOnly00000000000000000000000000', '555-100-0004', 'active');

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

INSERT INTO sport_groups (id, sport_id, coach_user_id, name, level, min_age, max_age, capacity, monthly_fee, status) VALUES
  (1, 1, 2, 'Basket U12 Mixto', 'beginner', 9, 12, 18, 750.00, 'active'),
  (2, 2, 2, 'Volley Juvenil', 'intermediate', 11, 15, 16, 700.00, 'active'),
  (3, 3, 3, 'Futbol U13', 'beginner', 10, 13, 20, 800.00, 'active');

INSERT INTO student_groups (student_id, group_id, enrolled_at, status) VALUES
  (1, 1, '2026-04-01', 'active'),
  (2, 3, '2026-04-03', 'active'),
  (3, 2, '2026-04-08', 'active'),
  (4, 3, '2026-04-10', 'active'),
  (5, 1, '2026-04-12', 'active'),
  (6, 2, '2026-05-05', 'paused');

INSERT INTO schedules (id, group_id, day_of_week, start_time, end_time, location, status) VALUES
  (1, 1, 2, '17:00:00', '18:30:00', 'Cancha 1', 'active'),
  (2, 1, 4, '17:00:00', '18:30:00', 'Cancha 1', 'active'),
  (3, 2, 1, '18:00:00', '19:30:00', 'Cancha 2', 'active'),
  (4, 2, 3, '18:00:00', '19:30:00', 'Cancha 2', 'active'),
  (5, 3, 2, '18:30:00', '20:00:00', 'Campo A', 'active'),
  (6, 3, 5, '18:30:00', '20:00:00', 'Campo A', 'active');

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

INSERT INTO payments (student_id, group_id, period_month, concept, amount, due_date, paid_at, payment_method, status, reference, notes, created_by) VALUES
  (1, 1, '2026-05', 'monthly_fee', 750.00, '2026-05-05', '2026-05-03 12:10:00', 'transfer', 'paid', 'TR-1001', NULL, 4),
  (5, 1, '2026-05', 'monthly_fee', 750.00, '2026-05-05', NULL, NULL, 'overdue', NULL, 'Recordatorio enviado', 4),
  (3, 2, '2026-05', 'monthly_fee', 700.00, '2026-05-05', '2026-05-05 09:30:00', 'cash', 'paid', 'CAJA-204', NULL, 4),
  (6, 2, '2026-05', 'registration', 300.00, '2026-05-10', NULL, NULL, 'pending', NULL, 'Pendiente hasta confirmar lugar', 4),
  (2, 3, '2026-05', 'monthly_fee', 800.00, '2026-05-05', '2026-05-04 18:00:00', 'card', 'paid', 'CARD-4812', NULL, 4),
  (4, 3, '2026-05', 'monthly_fee', 800.00, '2026-05-05', NULL, NULL, 'overdue', NULL, 'Pago prometido para fin de semana', 4),
  (1, 1, '2026-06', 'monthly_fee', 750.00, '2026-06-05', NULL, NULL, 'pending', NULL, NULL, 4),
  (2, 3, '2026-06', 'monthly_fee', 800.00, '2026-06-05', NULL, NULL, 'pending', NULL, NULL, 4),
  (3, 2, '2026-06', 'monthly_fee', 700.00, '2026-06-05', NULL, NULL, 'pending', NULL, NULL, 4);

INSERT INTO message_templates (id, name, channel, subject, body, status) VALUES
  (1, 'Recordatorio de pago', 'whatsapp', NULL, 'Hola {{tutor_name}}, te recordamos el pago pendiente de {{student_name}} por {{amount}}.', 'active'),
  (2, 'Clase cancelada', 'whatsapp', NULL, 'Hola {{tutor_name}}, la clase de {{group_name}} del {{class_date}} fue cancelada.', 'active'),
  (3, 'Resumen de asistencia', 'email', 'Resumen de asistencia SportIk', 'Hola {{tutor_name}}, {{student_name}} asistio a {{present_count}} clases este mes.', 'active');

INSERT INTO messages (template_id, student_id, tutor_id, group_id, channel, recipient, subject, body, status, sent_at, created_by) VALUES
  (1, 5, 5, 1, 'whatsapp', '555-200-0105', NULL, 'Hola Elena, te recordamos el pago pendiente de Camila por 750.00.', 'sent', '2026-05-23 10:00:00', 4),
  (1, 4, 4, 3, 'whatsapp', '555-200-0104', NULL, 'Hola Jorge, te recordamos el pago pendiente de Mateo por 800.00.', 'queued', NULL, 4),
  (3, 1, 1, 1, 'email', 'ana.garcia@example.test', 'Resumen de asistencia SportIk', 'Hola Ana, Sofia asistio a 2 clases este mes.', 'sent', '2026-05-24 08:00:00', 4);
