-- Migration: Create profiles table
-- Run this after schema.sql
-- Connects Supabase Auth users to app-level data

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
  username TEXT,
  is_teacher BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
