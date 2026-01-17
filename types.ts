
export type SiteType = 'vitrine' | 'portfolio' | 'blog' | 'ecommerce' | 'event' | 'saas';

export interface PageConfig {
  id: string;
  name: string;
  type: 'home' | 'about' | 'contact' | 'blog' | 'services' | 'gallery' | 'dashboard' | 'login';
}

export interface SiteConfig {
  // --- MODULE A: HTML (Structure Globale) ---
  projectName: string;
  userSiteDescription: string;
  html_lang: string;
  html_title: string;
  html_h1: string;
  html_footer_text: string;
  html_signature: string; 
  
  // --- MODULE B: CSS (Aesthetics) ---
  css_accent_color: string;
  css_bg_color: string;
  css_color: string;
  css_border_radius: number;
  css_font_family: string;
  css_bg_image_base64: string | null;
  
  // --- MODULE C: PYTHON (Backend & Admin) ---
  py_port: number;
  py_secret_key: string;
  py_db_uri: string;
  py_debug_mode: boolean;
  admin_user: string; 
  admin_pass: string; 
  google_drive_url: string; // Lien Drive lié
  google_sheets_url: string; // Lien Sheets lié

  // --- MODULE D: GOOGLE SHEETS MAPPING (A1, B1, C1, D1) ---
  sheet_col_a1: string; // Titre
  sheet_col_b1: string; // Média (Lien)
  sheet_col_c1: string; // Prix
  sheet_col_d1: string; // Date (jj/MM/aaaa)

  // --- MODULE E: JS (Logique) ---
  js_alert_welcome: string;

  siteType: SiteType;
  pages: PageConfig[];
}

export interface GeneratedFile {
  name: string;
  content: string;
  language: 'html' | 'css' | 'javascript' | 'json' | 'python' | 'markdown';
}
