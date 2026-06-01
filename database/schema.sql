-- AcademyAdmin - MySQL schema
-- Load with: mysql -u USER -p academy < database/schema.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP VIEW IF EXISTS v_group_roster;
DROP VIEW IF EXISTS v_student_balance;
DROP VIEW IF EXISTS v_attendance_summary;
DROP VIEW IF EXISTS v_product_stock;

DROP TABLE IF EXISTS sale_items;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS inventory_movements;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS tournament_registrations;
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS sport_evaluations;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS cash_cuts;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS message_templates;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS payment_concepts;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS student_groups;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS emergency_contacts;
DROP TABLE IF EXISTS student_tutors;
DROP TABLE IF EXISTS sport_groups;
DROP TABLE IF EXISTS coaches;
DROP TABLE IF EXISTS disciplines;
DROP TABLE IF EXISTS sports;
DROP TABLE IF EXISTS courts;
DROP TABLE IF EXISTS academy_settings;
DROP TABLE IF EXISTS branches;
DROP TABLE IF EXISTS tutors;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS role_permissions;
DROP TABLE IF EXISTS roles;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE roles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) NOT NULL UNIQUE,
  description VARCHAR(160) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE role_permissions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role_id INT UNSIGNED NOT NULL,
  module VARCHAR(60) NOT NULL,
  can_view BOOLEAN NOT NULL DEFAULT TRUE,
  can_create BOOLEAN NOT NULL DEFAULT FALSE,
  can_update BOOLEAN NOT NULL DEFAULT FALSE,
  can_delete BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  UNIQUE KEY uq_role_permissions_module (role_id, module),
  INDEX idx_role_permissions_role (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE branches (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  address VARCHAR(255) NULL,
  phone VARCHAR(30) NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role_id INT UNSIGNED NOT NULL,
  branch_id INT UNSIGNED NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_users_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE academy_settings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(80) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_group VARCHAR(60) NOT NULL DEFAULT 'general',
  description VARCHAR(180) NULL,
  updated_by INT UNSIGNED NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_academy_settings_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE students (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  birth_date DATE NOT NULL,
  gender ENUM('female', 'male', 'other', 'unspecified') NOT NULL DEFAULT 'unspecified',
  phone VARCHAR(30) NULL,
  email VARCHAR(160) NULL,
  address VARCHAR(255) NULL,
  medical_notes TEXT NULL,
  status ENUM('active', 'inactive', 'waiting_list') NOT NULL DEFAULT 'active',
  joined_at DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_students_status (status),
  INDEX idx_students_name (last_name, first_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tutors (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  relationship VARCHAR(60) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(160) NULL,
  address VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tutors_name (last_name, first_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_tutors (
  student_id INT UNSIGNED NOT NULL,
  tutor_id INT UNSIGNED NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  can_pick_up BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id, tutor_id),
  CONSTRAINT fk_student_tutors_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  CONSTRAINT fk_student_tutors_tutor FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE emergency_contacts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id INT UNSIGNED NOT NULL,
  name VARCHAR(120) NOT NULL,
  relationship VARCHAR(60) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  priority TINYINT UNSIGNED NOT NULL DEFAULT 1,
  notes VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_emergency_contacts_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_emergency_contacts_student (student_id, priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE documents (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id INT UNSIGNED NOT NULL,
  document_type ENUM('birth_certificate', 'medical_certificate', 'photo', 'waiver', 'other') NOT NULL,
  file_name VARCHAR(180) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INT UNSIGNED NULL,
  reviewed_at DATETIME NULL,
  notes VARCHAR(255) NULL,
  CONSTRAINT fk_documents_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  CONSTRAINT fk_documents_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_documents_student (student_id, document_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sports (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  description VARCHAR(255) NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE disciplines (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sport_id INT UNSIGNED NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_disciplines_sport FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE,
  UNIQUE KEY uq_disciplines_sport_name (sport_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE courts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  branch_id INT UNSIGNED NULL,
  name VARCHAR(100) NOT NULL,
  sport_id INT UNSIGNED NULL,
  capacity SMALLINT UNSIGNED NULL,
  status ENUM('active', 'maintenance', 'inactive') NOT NULL DEFAULT 'active',
  notes VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_courts_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
  CONSTRAINT fk_courts_sport FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE SET NULL,
  INDEX idx_courts_branch_status (branch_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE coaches (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  sport_id INT UNSIGNED NULL,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NULL,
  email VARCHAR(160) NULL,
  certification VARCHAR(160) NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  hired_at DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_coaches_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_coaches_sport FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE SET NULL,
  INDEX idx_coaches_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sport_groups (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sport_id INT UNSIGNED NOT NULL,
  coach_user_id INT UNSIGNED NULL,
  coach_id INT UNSIGNED NULL,
  branch_id INT UNSIGNED NULL,
  court_id INT UNSIGNED NULL,
  name VARCHAR(100) NOT NULL,
  level ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
  min_age TINYINT UNSIGNED NULL,
  max_age TINYINT UNSIGNED NULL,
  capacity SMALLINT UNSIGNED NOT NULL DEFAULT 20,
  monthly_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_sport_groups_sport FOREIGN KEY (sport_id) REFERENCES sports(id),
  CONSTRAINT fk_sport_groups_coach_user FOREIGN KEY (coach_user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_sport_groups_coach FOREIGN KEY (coach_id) REFERENCES coaches(id) ON DELETE SET NULL,
  CONSTRAINT fk_sport_groups_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
  CONSTRAINT fk_sport_groups_court FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE SET NULL,
  UNIQUE KEY uq_sport_group_name (sport_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_groups (
  student_id INT UNSIGNED NOT NULL,
  group_id INT UNSIGNED NOT NULL,
  enrolled_at DATE NOT NULL,
  status ENUM('active', 'paused', 'dropped') NOT NULL DEFAULT 'active',
  PRIMARY KEY (student_id, group_id),
  CONSTRAINT fk_student_groups_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  CONSTRAINT fk_student_groups_group FOREIGN KEY (group_id) REFERENCES sport_groups(id) ON DELETE CASCADE,
  INDEX idx_student_groups_group_status (group_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE schedules (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  group_id INT UNSIGNED NOT NULL,
  day_of_week TINYINT UNSIGNED NOT NULL COMMENT '1=Monday, 7=Sunday',
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location VARCHAR(120) NOT NULL,
  court_id INT UNSIGNED NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  CONSTRAINT fk_schedules_group FOREIGN KEY (group_id) REFERENCES sport_groups(id) ON DELETE CASCADE,
  CONSTRAINT fk_schedules_court FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE SET NULL,
  CONSTRAINT chk_schedules_day CHECK (day_of_week BETWEEN 1 AND 7),
  CONSTRAINT chk_schedules_time CHECK (start_time < end_time),
  INDEX idx_schedules_group_day (group_id, day_of_week)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE classes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  group_id INT UNSIGNED NOT NULL,
  schedule_id INT UNSIGNED NULL,
  class_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location VARCHAR(120) NOT NULL,
  topic VARCHAR(160) NULL,
  status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_classes_group FOREIGN KEY (group_id) REFERENCES sport_groups(id) ON DELETE CASCADE,
  CONSTRAINT fk_classes_schedule FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE SET NULL,
  UNIQUE KEY uq_classes_group_datetime (group_id, class_date, start_time),
  INDEX idx_classes_date_status (class_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE attendance (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  class_id INT UNSIGNED NOT NULL,
  student_id INT UNSIGNED NOT NULL,
  status ENUM('present', 'absent', 'late', 'excused') NOT NULL,
  checked_in_at DATETIME NULL,
  notes VARCHAR(255) NULL,
  recorded_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_attendance_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  CONSTRAINT fk_attendance_recorder FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE KEY uq_attendance_class_student (class_id, student_id),
  INDEX idx_attendance_student_status (student_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE payment_methods (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  code VARCHAR(30) NOT NULL UNIQUE,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE payment_concepts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(40) NOT NULL UNIQUE,
  default_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE payments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id INT UNSIGNED NOT NULL,
  group_id INT UNSIGNED NULL,
  payment_concept_id INT UNSIGNED NULL,
  payment_method_id INT UNSIGNED NULL,
  period_month CHAR(7) NOT NULL COMMENT 'YYYY-MM',
  concept ENUM('monthly_fee', 'registration', 'uniform', 'other') NOT NULL DEFAULT 'monthly_fee',
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_at DATETIME NULL,
  payment_method ENUM('cash', 'card', 'transfer', 'other') NULL,
  status ENUM('pending', 'paid', 'overdue', 'cancelled') NOT NULL DEFAULT 'pending',
  reference VARCHAR(100) NULL,
  notes VARCHAR(255) NULL,
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  CONSTRAINT fk_payments_group FOREIGN KEY (group_id) REFERENCES sport_groups(id) ON DELETE SET NULL,
  CONSTRAINT fk_payments_concept FOREIGN KEY (payment_concept_id) REFERENCES payment_concepts(id) ON DELETE SET NULL,
  CONSTRAINT fk_payments_method FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE SET NULL,
  CONSTRAINT fk_payments_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_payments_period_status (period_month, status),
  INDEX idx_payments_student_due (student_id, due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cash_cuts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  branch_id INT UNSIGNED NULL,
  opened_by INT UNSIGNED NOT NULL,
  closed_by INT UNSIGNED NULL,
  opened_at DATETIME NOT NULL,
  closed_at DATETIME NULL,
  opening_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  cash_sales DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  card_sales DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  transfer_sales DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  expenses_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  expected_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  counted_amount DECIMAL(10,2) NULL,
  status ENUM('open', 'closed', 'cancelled') NOT NULL DEFAULT 'open',
  notes VARCHAR(255) NULL,
  CONSTRAINT fk_cash_cuts_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
  CONSTRAINT fk_cash_cuts_opened_by FOREIGN KEY (opened_by) REFERENCES users(id),
  CONSTRAINT fk_cash_cuts_closed_by FOREIGN KEY (closed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_cash_cuts_status (status, opened_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE expenses (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cash_cut_id INT UNSIGNED NULL,
  branch_id INT UNSIGNED NULL,
  concept VARCHAR(120) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  spent_at DATE NOT NULL,
  payment_method_id INT UNSIGNED NULL,
  supplier VARCHAR(120) NULL,
  receipt_number VARCHAR(80) NULL,
  status ENUM('registered', 'cancelled') NOT NULL DEFAULT 'registered',
  notes VARCHAR(255) NULL,
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_expenses_cash_cut FOREIGN KEY (cash_cut_id) REFERENCES cash_cuts(id) ON DELETE SET NULL,
  CONSTRAINT fk_expenses_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
  CONSTRAINT fk_expenses_method FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE SET NULL,
  CONSTRAINT fk_expenses_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_expenses_date_status (spent_at, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sport_evaluations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id INT UNSIGNED NOT NULL,
  group_id INT UNSIGNED NULL,
  coach_id INT UNSIGNED NULL,
  evaluated_at DATE NOT NULL,
  physical_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
  technical_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
  tactical_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
  attitude_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
  overall_score DECIMAL(4,2) NOT NULL DEFAULT 0.00,
  notes TEXT NULL,
  next_steps VARCHAR(255) NULL,
  CONSTRAINT fk_evaluations_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  CONSTRAINT fk_evaluations_group FOREIGN KEY (group_id) REFERENCES sport_groups(id) ON DELETE SET NULL,
  CONSTRAINT fk_evaluations_coach FOREIGN KEY (coach_id) REFERENCES coaches(id) ON DELETE SET NULL,
  INDEX idx_evaluations_student_date (student_id, evaluated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE events (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sport_id INT UNSIGNED NULL,
  branch_id INT UNSIGNED NULL,
  name VARCHAR(140) NOT NULL,
  event_type ENUM('clinic', 'friendly', 'camp', 'meeting', 'other') NOT NULL DEFAULT 'other',
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NULL,
  location VARCHAR(160) NOT NULL,
  capacity SMALLINT UNSIGNED NULL,
  status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
  fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_events_sport FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE SET NULL,
  CONSTRAINT fk_events_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
  INDEX idx_events_starts_status (starts_at, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tournaments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sport_id INT UNSIGNED NOT NULL,
  branch_id INT UNSIGNED NULL,
  name VARCHAR(140) NOT NULL,
  starts_on DATE NOT NULL,
  ends_on DATE NULL,
  location VARCHAR(160) NOT NULL,
  category VARCHAR(80) NULL,
  status ENUM('planned', 'open', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'planned',
  fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tournaments_sport FOREIGN KEY (sport_id) REFERENCES sports(id),
  CONSTRAINT fk_tournaments_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
  INDEX idx_tournaments_dates_status (starts_on, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tournament_registrations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tournament_id INT UNSIGNED NOT NULL,
  student_id INT UNSIGNED NULL,
  group_id INT UNSIGNED NULL,
  registered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('registered', 'paid', 'cancelled') NOT NULL DEFAULT 'registered',
  notes VARCHAR(255) NULL,
  CONSTRAINT fk_tournament_reg_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  CONSTRAINT fk_tournament_reg_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
  CONSTRAINT fk_tournament_reg_group FOREIGN KEY (group_id) REFERENCES sport_groups(id) ON DELETE SET NULL,
  INDEX idx_tournament_reg_status (tournament_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(80) NULL,
  sale_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock_quantity INT NOT NULL DEFAULT 0,
  min_stock INT NOT NULL DEFAULT 0,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_products_status_stock (status, stock_quantity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE inventory_movements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  movement_type ENUM('in', 'out', 'adjustment') NOT NULL,
  quantity INT NOT NULL,
  unit_cost DECIMAL(10,2) NULL,
  reference VARCHAR(100) NULL,
  notes VARCHAR(255) NULL,
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_inventory_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_inventory_product_date (product_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sales (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id INT UNSIGNED NULL,
  cash_cut_id INT UNSIGNED NULL,
  payment_method_id INT UNSIGNED NULL,
  sold_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  discount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status ENUM('paid', 'cancelled', 'refunded') NOT NULL DEFAULT 'paid',
  reference VARCHAR(100) NULL,
  created_by INT UNSIGNED NULL,
  CONSTRAINT fk_sales_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
  CONSTRAINT fk_sales_cash_cut FOREIGN KEY (cash_cut_id) REFERENCES cash_cuts(id) ON DELETE SET NULL,
  CONSTRAINT fk_sales_method FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE SET NULL,
  CONSTRAINT fk_sales_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_sales_date_status (sold_at, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sale_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sale_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_sale_items_sale FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
  CONSTRAINT fk_sale_items_product FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE message_templates (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  channel ENUM('whatsapp', 'email', 'sms', 'in_app') NOT NULL DEFAULT 'whatsapp',
  subject VARCHAR(160) NULL,
  body TEXT NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  template_id INT UNSIGNED NULL,
  student_id INT UNSIGNED NULL,
  tutor_id INT UNSIGNED NULL,
  group_id INT UNSIGNED NULL,
  channel ENUM('whatsapp', 'email', 'sms', 'in_app') NOT NULL,
  recipient VARCHAR(180) NOT NULL,
  subject VARCHAR(160) NULL,
  body TEXT NOT NULL,
  status ENUM('draft', 'queued', 'sent', 'failed') NOT NULL DEFAULT 'queued',
  sent_at DATETIME NULL,
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_messages_template FOREIGN KEY (template_id) REFERENCES message_templates(id) ON DELETE SET NULL,
  CONSTRAINT fk_messages_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
  CONSTRAINT fk_messages_tutor FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE SET NULL,
  CONSTRAINT fk_messages_group FOREIGN KEY (group_id) REFERENCES sport_groups(id) ON DELETE SET NULL,
  CONSTRAINT fk_messages_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_messages_status_channel (status, channel),
  INDEX idx_messages_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE VIEW v_group_roster AS
SELECT
  sg.id AS group_id,
  sp.name AS sport_name,
  sg.name AS group_name,
  sg.level,
  sg.capacity,
  COUNT(CASE WHEN stg.status = 'active' THEN 1 END) AS active_students,
  COALESCE(c.name, u.name) AS coach_name
FROM sport_groups sg
JOIN sports sp ON sp.id = sg.sport_id
LEFT JOIN users u ON u.id = sg.coach_user_id
LEFT JOIN coaches c ON c.id = sg.coach_id
LEFT JOIN student_groups stg ON stg.group_id = sg.id
GROUP BY sg.id, sp.name, sg.name, sg.level, sg.capacity, c.name, u.name;

CREATE VIEW v_student_balance AS
SELECT
  s.id AS student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS student_name,
  COALESCE(SUM(CASE WHEN p.status IN ('pending', 'overdue') THEN p.amount ELSE 0 END), 0) AS outstanding_amount,
  COALESCE(SUM(CASE WHEN p.status = 'paid' THEN p.amount ELSE 0 END), 0) AS paid_amount,
  MIN(CASE WHEN p.status IN ('pending', 'overdue') THEN p.due_date END) AS next_due_date
FROM students s
LEFT JOIN payments p ON p.student_id = s.id
GROUP BY s.id, s.first_name, s.last_name;

CREATE VIEW v_attendance_summary AS
SELECT
  sg.id AS group_id,
  sp.name AS sport_name,
  sg.name AS group_name,
  c.class_date,
  COUNT(a.id) AS attendance_records,
  SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,
  SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late_count,
  SUM(CASE WHEN a.status IN ('absent', 'excused') THEN 1 ELSE 0 END) AS absent_count
FROM classes c
JOIN sport_groups sg ON sg.id = c.group_id
JOIN sports sp ON sp.id = sg.sport_id
LEFT JOIN attendance a ON a.class_id = c.id
GROUP BY sg.id, sp.name, sg.name, c.class_date;

CREATE VIEW v_product_stock AS
SELECT
  p.id AS product_id,
  p.sku,
  p.name,
  p.category,
  p.stock_quantity,
  p.min_stock,
  CASE WHEN p.stock_quantity <= p.min_stock THEN 'bajo' ELSE 'ok' END AS stock_status
FROM products p;
