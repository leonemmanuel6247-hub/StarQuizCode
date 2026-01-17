
import { SiteConfig, GeneratedFile } from '../types';

export const generateSite = (config: SiteConfig): GeneratedFile[] => {
  const commonCss = `
:root {
    --accent: ${config.css_accent_color};
    --bg: ${config.css_bg_color};
    --text: ${config.css_color};
    --radius: ${config.css_border_radius}px;
}
* { box-sizing: border-box; outline: none; }
body {
    background-color: var(--bg);
    ${config.css_bg_image_base64 ? `background-image: url("${config.css_bg_image_base64}");` : ''}
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: var(--text);
    font-family: ${config.css_font_family};
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
header, footer {
    padding: 2.5rem;
    text-align: center;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
nav.site-nav {
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(10px);
    padding: 1.2rem;
    display: flex;
    justify-content: center;
    gap: 3rem;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
nav.site-nav a {
    color: white;
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.5;
    transition: 0.4s;
}
nav.site-nav a:hover, nav.site-nav a.active { opacity: 1; color: var(--accent); text-shadow: 0 0 10px var(--accent); }

main { flex: 1; max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; width: 100%; }
.card {
    background: rgba(10,10,20,0.9);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 3.5rem;
    border-radius: var(--radius);
    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
    backdrop-filter: blur(15px);
    margin-bottom: 3rem;
    animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.btn {
    background: var(--accent);
    color: white;
    padding: 1.2rem 3rem;
    border: none;
    border-radius: 50px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-align: center;
}
.btn:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.4); filter: brightness(1.2); }
.btn-secondary { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }

form label { display: block; font-size: 0.7rem; font-weight: 900; margin-bottom: 10px; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; }
input, select, textarea {
    width: 100%;
    padding: 18px;
    margin-bottom: 30px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    color: white;
    border-radius: 12px;
    font-family: inherit;
    transition: 0.3s;
}
input:focus { border-color: var(--accent); background: rgba(255,255,255,0.08); }

.article-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; }
.article-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: var(--radius); padding: 1.5rem; transition: 0.4s; position: relative; overflow: hidden; }
.article-item:hover { transform: translateY(-10px); border-color: var(--accent); background: rgba(255,255,255,0.04); }
.article-media { width: 100%; height: 220px; object-fit: cover; border-radius: calc(var(--radius) / 2); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); }
.article-title { color: var(--accent); font-size: 1.3rem; margin-bottom: 1rem; font-weight: 900; text-transform: uppercase; }
.article-meta { display: flex; justify-content: space-between; font-size: 0.75rem; opacity: 0.6; margin-bottom: 2rem; }

.like-btn { cursor: pointer; display: flex; align-items: center; gap: 0.6rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: white; padding: 0.8rem 1.5rem; border-radius: 10px; font-size: 0.8rem; transition: 0.3s; }
.like-btn:hover { background: rgba(255,255,255,0.1); border-color: var(--accent); }

.signature { margin-top: 6rem; text-align: right; font-style: italic; opacity: 0.5; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem; letter-spacing: 1px; }
.backdoor-link { position: fixed; bottom: 20px; left: 20px; opacity: 0.4; font-size: 0.65rem; color: white; text-decoration: none; transition: 0.4s; padding: 8px 15px; background: rgba(0,0,0,0.6); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); }
.backdoor-link:hover { opacity: 1; border-color: var(--accent); color: var(--accent); }
  `.trim();

  const scriptJs = `
document.addEventListener('DOMContentLoaded', () => {
    console.log("Nexus Engine v4.5 par SuccessPolaris Initialisé.");

    const config = {
        title: localStorage.getItem('nexus_custom_title') || "${config.projectName}",
        desc: localStorage.getItem('nexus_custom_desc') || "${config.userSiteDescription}",
        adminUser: localStorage.getItem('nexus_admin_user') || "${config.admin_user}",
        adminPass: localStorage.getItem('nexus_admin_pass') || "${config.admin_pass}"
    };

    const headerTitle = document.querySelector('header h1');
    if (headerTitle) headerTitle.innerText = config.title;
    document.title = config.title + " - SuccessPolaris";

    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const sexe = document.getElementById('sexe').value;

            if (!email.toLowerCase().endsWith("@gmail.com")) {
                alert("error - Seul le format @gmail.com est autorisé.");
                return;
            }
            if (!sexe) {
                alert("error - Veuillez définir votre identité.");
                return;
            }
            
            alert("success");
            window.location.href = "/site";
        });
    }

    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const u = document.getElementById('user').value;
            const p = document.getElementById('pass').value;

            if (u === config.adminUser && p === config.adminPass) {
                alert("Accès Maître SuccessPolaris Accordé.");
                window.location.href = "/admin-dashboard";
            } else {
                alert("Identifiants incorrects.");
            }
        });
    }

    const personalizeForm = document.getElementById('personalizeForm');
    if (personalizeForm) {
        personalizeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const t = document.getElementById('p_title').value;
            const d = document.getElementById('p_desc').value;
            const au = document.getElementById('p_admin').value;
            const ap = document.getElementById('p_pass').value;

            if (t) localStorage.setItem('nexus_custom_title', t);
            if (d) localStorage.setItem('nexus_custom_desc', d);
            if (au) localStorage.setItem('nexus_admin_user', au);
            if (ap) localStorage.setItem('nexus_admin_pass', ap);

            alert("Site SuccessPolaris Personnalisé ! Recharge en cours...");
            window.location.href = "/site";
        });
    }

    const dlBtn = document.getElementById('downloadCustomSources');
    if (dlBtn) {
        dlBtn.addEventListener('click', () => {
            alert("Pour télécharger les sources Star Quiz Code finales, utilisez le bouton EXPORTER du panneau de contrôle SuccessPolaris.");
        });
    }

    document.querySelectorAll('.like-btn').forEach(btn => {
        let l = Math.floor(Math.random() * 20);
        btn.innerText = "🤍 Like ("+l+")";
        btn.onclick = () => { l++; btn.innerText = "❤️ Like ("+l+")"; btn.style.color = "var(--accent)"; };
    });
});
  `.trim();

  const indexHtml = `
<!DOCTYPE html>
<html lang="${config.html_lang}">
<head><meta charset="UTF-8"><title>${config.projectName}</title><link rel="stylesheet" href="style.css"></head>
<body>
    <header><h1>${config.projectName}</h1></header>
    <main><div class="card" style="text-align:center; padding: 5rem 2rem;">
        <h2 style="font-size: 2.5rem; letter-spacing: -1px;">BIENVENUE SUR STAR QUIZ CODE</h2>
        <p style="font-size: 1.1rem; opacity: 0.7; max-width: 600px; margin: 2rem auto;">${config.userSiteDescription}</p>
        <div style="margin-top: 3rem; display: flex; gap: 1.5rem; justify-content: center;">
            <a href="/register" class="btn">Accéder au Portail</a>
        </div>
    </div></main>
    <footer>${config.html_footer_text}</footer>
    <script src="script.js"></script>
</body>
</html>
  `.trim();

  const registerHtml = `
<!DOCTYPE html>
<html lang="${config.html_lang}">
<head><meta charset="UTF-8"><title>Portail SuccessPolaris</title><link rel="stylesheet" href="style.css"></head>
<body>
    <main><div class="card" style="max-width: 500px; margin: 0 auto;">
        <h2 style="text-align:center; margin-bottom: 3rem;">AUTHENTIFICATION MAÎTRE</h2>
        <form id="registrationForm">
            <label>NOM COMPLET</label><input type="text" id="nom" required>
            <label>IDENTITÉ / SEXE</label><select id="sexe" required><option value="">Sélectionner...</option><option value="M">Masculin</option><option value="F">Féminin</option></select>
            <label>EMAIL GMAIL VALIDE</label><input type="email" id="email" placeholder="nom@gmail.com" required>
            <label>PAYS</label><input type="text" id="pays" required>
            <button type="submit" class="btn" style="width:100%; margin-top: 1rem;">INITIER L'ACCÈS</button>
        </form>
    </div></main>
    <script src="script.js"></script>
</body>
</html>
  `.trim();

  const userSiteHtml = `
<!DOCTYPE html>
<html lang="${config.html_lang}">
<head><meta charset="UTF-8"><title>${config.projectName}</title><link rel="stylesheet" href="style.css"></head>
<body>
    <nav class="site-nav">
        <a href="/site" class="active">Archives</a>
        <a href="/personalize">Créer mon site</a>
    </nav>
    <header><h1>${config.projectName}</h1></header>
    <main>
        <div class="card">
            <h2 style="margin-bottom: 3rem; text-transform: uppercase; letter-spacing: 2px;">Archives Cloud (A1-D1)</h2>
            <div class="article-list">
                <article class="article-item">
                    <h3 class="article-title">${config.sheet_col_a1}</h3>
                    <img src="${config.sheet_col_b1}" alt="Media" class="article-media">
                    <div class="article-meta">
                        <span style="font-weight:900; color:var(--accent);">VALEUR: ${config.sheet_col_c1}</span>
                        <span>DATE: ${config.sheet_col_d1}</span>
                    </div>
                    <button class="like-btn">🤍 Like (0)</button>
                </article>
            </div>
            <div class="signature">${config.html_signature}</div>
        </div>
    </main>
    <a href="/backdoor" class="backdoor-link">Accès Admin</a>
    <script src="script.js"></script>
</body>
</html>
  `.trim();

  const personalizeHtml = `
<!DOCTYPE html>
<html lang="${config.html_lang}">
<head><meta charset="UTF-8"><title>Générateur SuccessPolaris</title><link rel="stylesheet" href="style.css"></head>
<body>
    <nav class="site-nav">
        <a href="/site">Archives</a>
        <a href="/personalize" class="active">Créer mon site</a>
    </nav>
    <main>
        <div class="card">
            <h2 style="margin-bottom: 1rem;">CONFIGURATION PERSONNALISÉE</h2>
            <p style="opacity:0.6; margin-bottom: 3rem;">Adaptez votre instance Star Quiz Code à votre vision.</p>
            
            <form id="personalizeForm">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <label>Titre de votre site</label>
                        <input type="text" id="p_title" placeholder="Mon Hub SuccessPolaris">
                        
                        <label>Accès Administrateur</label>
                        <input type="text" id="p_admin" placeholder="Utilisateur">
                        <input type="password" id="p_pass" placeholder="Clé Secrète">
                    </div>
                    <div>
                        <label>Vision du projet</label>
                        <textarea id="p_desc" style="height: 195px;" placeholder="Écrivez votre description ici..."></textarea>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1.5rem; margin-top: 2rem;">
                    <button type="submit" class="btn" style="flex: 2;">Sauvegarder les Paramètres</button>
                    <button type="button" id="downloadCustomSources" class="btn btn-secondary" style="flex: 1;">Aide Téléchargement</button>
                </div>
            </form>
            
            <p style="margin-top: 3rem; font-size: 0.8rem; text-align: center; opacity: 0.4;">
                Consultez les fichiers PDF du site SuccessPolaris pour optimiser vos codes.
            </p>
        </div>
    </main>
    <script src="script.js"></script>
</body>
</html>
  `.trim();

  const backdoorHtml = `
<!DOCTYPE html>
<html lang="${config.html_lang}">
<head><meta charset="UTF-8"><title>Sécurité SuccessPolaris</title><link rel="stylesheet" href="style.css"></head>
<body>
    <main style="display: flex; align-items: center; justify-content: center; min-height: 80vh;">
        <div class="card" style="width: 100%; max-width: 450px;">
            <h2 style="text-align:center; margin-bottom: 3rem; color: var(--accent);">VÉRIFICATION DES ACCÈS</h2>
            <form id="adminLoginForm">
                <label>UTILISATEUR</label><input type="text" id="user" required>
                <label>CLÉ DE DÉCRYPTAGE</label><input type="password" id="pass" required>
                <button type="submit" class="btn" style="width:100%; margin-top: 1rem;">DÉVERROUILLER</button>
            </form>
        </div>
    </main>
    <script src="script.js"></script>
</body>
</html>
  `.trim();

  const adminDashboardHtml = `
<!DOCTYPE html>
<html lang="${config.html_lang}">
<head><meta charset="UTF-8"><title>Dashboard Admin</title><link rel="stylesheet" href="style.css"></head>
<body>
    <header><h1>Dashboard Administrateur SuccessPolaris</h1></header>
    <main>
        <div class="card">
            <div class="admin-badge">Mode Architecte</div>
            <h2 style="margin-bottom: 2.5rem;">Gestion Cloud & Infrastructure</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                <div style="background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 15px;">
                    <h3 style="color:var(--accent); margin-bottom: 1.5rem;">Sources Externes</h3>
                    <label>Google Drive</label>
                    <input type="text" readonly value="${config.google_drive_url}">
                    
                    <label>Google Sheets</label>
                    <input type="text" readonly value="${config.google_sheets_url}">
                    
                    <div style="display: flex; gap: 1rem;">
                        <a href="${config.google_drive_url}" target="_blank" class="btn btn-secondary" style="font-size: 0.7rem; padding: 0.8rem;">Ouvrir Drive</a>
                        <a href="${config.google_sheets_url}" target="_blank" class="btn btn-secondary" style="font-size: 0.7rem; padding: 0.8rem;">Ouvrir Sheets</a>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 15px;">
                    <h3 style="color:var(--accent); margin-bottom: 1.5rem;">Statut Système</h3>
                    <p style="font-size: 0.85rem; opacity: 0.7;">Intégration A1-D1 : Active</p>
                    <p style="font-size: 0.85rem; opacity: 0.7;">Backend Python : Prêt</p>
                    
                    <div style="margin-top: 2rem; padding: 1rem; border: 1px dashed rgba(255,255,255,0.1); border-radius: 10px;">
                        <p style="font-size: 0.7rem; font-weight: 800; color: #fbbf24;">NOTE :</p>
                        <p style="font-size: 0.7rem; opacity: 0.6;">Consultez les fichiers PDF de SuccessPolaris pour les mises à jour.</p>
                    </div>
                </div>
            </div>
            
            <p style="text-align: center; margin-top: 4rem;">
                <a href="/site" style="color: var(--accent); text-decoration: none; font-weight: bold; font-size: 0.8rem;">← QUITTER LE DASHBOARD</a>
            </p>
        </div>
    </main>
    <script src="script.js"></script>
</body>
</html>
  `.trim();

  const appPy = `
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index(): return render_template('index.html')

@app.route('/register')
def register(): return render_template('register.html')

@app.route('/site')
def user_site(): return render_template('user_site.html')

@app.route('/personalize')
def personalize(): return render_template('personalize.html')

@app.route('/backdoor')
def backdoor(): return render_template('backdoor.html')

@app.route('/admin-dashboard')
def admin_dashboard(): return render_template('admin_dashboard.html')

if __name__ == '__main__':
    app.run(debug=${config.py_debug_mode}, port=${config.py_port})
  `.trim();

  return [
    { name: 'app.py', content: appPy, language: 'python' },
    { name: 'templates/index.html', content: indexHtml, language: 'html' },
    { name: 'templates/register.html', content: registerHtml, language: 'html' },
    { name: 'templates/user_site.html', content: userSiteHtml, language: 'html' },
    { name: 'templates/personalize.html', content: personalizeHtml, language: 'html' },
    { name: 'templates/backdoor.html', content: backdoorHtml, language: 'html' },
    { name: 'templates/admin_dashboard.html', content: adminDashboardHtml, language: 'html' },
    { name: 'static/css/style.css', content: commonCss, language: 'css' },
    { name: 'static/js/script.js', content: scriptJs, language: 'javascript' }
  ];
};
