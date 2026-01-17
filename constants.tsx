
import { SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  projectName: "Nexus Enterprise",
  userSiteDescription: "Un écosystème de gestion d'articles illimités lié à Google Sheets.",
  html_lang: "fr",
  html_title: "Nexus Hub - Architecture Polaris",
  html_h1: "Bienvenue dans l'Infrastructure Nexus",
  html_footer_text: "© 2024 Star Quiz Code - Piloté par Polaris Master Builder.",
  html_signature: "Signé par l'Architecte Polaris",
  
  css_accent_color: "#3b82f6",
  css_bg_color: "#020617",
  css_color: "#f8fafc",
  css_border_radius: 12,
  css_font_family: "'Plus Jakarta Sans', sans-serif",
  css_bg_image_base64: null,
  
  py_port: 5000,
  py_secret_key: "nexus_super_secure_key",
  py_db_uri: "sqlite:///nexus_enterprise.db",
  py_debug_mode: true,
  admin_user: "admin",
  admin_pass: "polaris2024",
  google_drive_url: "https://drive.google.com",
  google_sheets_url: "https://docs.google.com/spreadsheets",

  sheet_col_a1: "Module Nexus v3.5",
  sheet_col_b1: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
  sheet_col_c1: "Gratuit",
  sheet_col_d1: "01/01/2025",

  js_alert_welcome: "success",

  siteType: 'saas',
  pages: [{ id: '1', name: 'Accueil', type: 'home' }]
};
