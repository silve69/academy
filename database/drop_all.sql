-- SportIk MVP - safe database cleanup
-- Use this before schema.sql if phpMyAdmin blocks parent table drops.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP VIEW IF EXISTS v_group_roster;
DROP VIEW IF EXISTS v_student_balance;
DROP VIEW IF EXISTS v_attendance_summary;

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS message_templates;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS student_groups;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS emergency_contacts;
DROP TABLE IF EXISTS student_tutors;
DROP TABLE IF EXISTS sport_groups;
DROP TABLE IF EXISTS sports;
DROP TABLE IF EXISTS tutors;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

SET FOREIGN_KEY_CHECKS = 1;
