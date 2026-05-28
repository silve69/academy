-- SportIk MVP - safe database cleanup
-- Use this before schema.sql if phpMyAdmin blocks parent table drops.

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
DROP TABLE IF EXISTS courts;
DROP TABLE IF EXISTS sports;
DROP TABLE IF EXISTS academy_settings;
DROP TABLE IF EXISTS branches;
DROP TABLE IF EXISTS tutors;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

SET FOREIGN_KEY_CHECKS = 1;
