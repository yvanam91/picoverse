🚀 Picoverse (Petitverse)
Picoverse est une plateforme SaaS minimaliste et performante permettant de créer des micro-pages de destination (Link-in-bio) et de centraliser son univers numérique. Le projet met l'accent sur la rapidité, la sécurité et l'indépendance technologique.

URL Officielle : https://picover.se

🛠 Tech Stack
Framework : Next.js 15+ (App Router, Turbopack)

Langage : TypeScript

Style : Tailwind CSS

Base de données & Auth : Supabase (PostgreSQL, RLS, Auth)

Emails Transactionnels : Resend avec React Email

Déploiement : Vercel

📊 Architecture des Données
Le projet utilise une structure multi-tenant où chaque ressource est strictement isolée au niveau de la base de données.

Schéma de la Base de Données
Code snippet

erDiagram
    PROFILES ||--o{ PROJECTS : "possede"
    PLAN_CONFIG ||--o{ PROFILES : "definit"
    PROJECTS ||--o{ PAGES : "contient"
    PROJECTS ||--o{ THEMES : "propose"
    PAGES ||--o{ BLOCKS : "affiche"
    THEMES ||--o{ PAGES : "applique"

    PROFILES {
        uuid id
        string username
        string plan
    }

    PLAN_CONFIG {
        string plan_name
        int max_projects
        int max_pages_per_project
    }

    PROJECTS {
        uuid id
        uuid user_id
        string name
        string slug
        uuid default_theme_id
    }

    PAGES {
        uuid id
        uuid project_id
        string title
        string slug
        jsonb config
    }

    BLOCKS {
        uuid id
        uuid page_id
        string type
        jsonb content
        int position
    }
Pipeline des Analytics (Custom)
Le tracking des clics est géré en interne sans cookies tiers via une route API dédiée et des vues SQL agrégées.

Code snippet

graph LR
    User((Visiteur Public)) -->|Clic sur lien| API[Route /api/click]
    API -->|Insert| DB[(Table stats_clicks)]
    DB -->|Vue SQL| View[stats_links_performance]
    View -->|Lecture| Dash[Dashboard Projets]
    Dash -->|Affiche| Stats[KPIs de performance]
🔒 Sécurité & Performance
Row Level Security (RLS) : Chaque table dans Supabase possède des politiques de sécurité interdisant l'accès aux données si l'UUID de l'utilisateur connecté ne correspond pas au user_id de la ligne.

Server Actions : Toute manipulation de données (création, édition, suppression) est effectuée via des Server Actions qui re-vérifient systématiquement l'identité de l'utilisateur côté serveur.

Optimisation : Utilisation de revalidatePath pour assurer une mise à jour instantanée du cache lors des modifications dans le dashboard.

⚙️ Installation & Configuration
1. Cloner le projet
Bash

git clone https://github.com/votre-repo/picoverse.git
cd picoverse
npm install
2. Variables d'environnement
Créez un fichier .env.local à la racine avec les clés suivantes :

Bash

# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon

# Resend (Emails)
RESEND_API_KEY=re_votre_cle
NEXT_PUBLIC_EMAIL_FROM="Picoverse <hello@picover.se>"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
3. Lancer le projet
Bash

# Lancer l'application
npm run dev

# Lancer le serveur de preview des emails
npm run email
📈 Roadmap & Évolutions
[x] Gestion multi-projets et multi-pages.

[x] Système de thèmes hérités (Projet -> Page).

[x] Tracking des clics natif.

[ ] Intégration d'une CMP pour le consentement GTM.

[ ] Gestion des noms de domaines personnalisés.

[ ] Export des données utilisateur.

📄 Licence
Projet propriétaire - Tous droits réservés à Picoverse.