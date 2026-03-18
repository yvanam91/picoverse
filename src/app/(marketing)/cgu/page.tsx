import React from 'react';

export const metadata = {
  title: 'CGU - Picoverse',
  description: 'Conditions Générales d’Utilisation de Picoverse.',
};

export default function CGUPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0911] text-[#252B37] dark:text-[#F3EEF8]">
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4 font-['Inter']">Conditions Générales d’Utilisation (CGU)</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Date de dernière mise à jour : 17 mars 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">1. Présentation du Service</h2>
          <p className="mb-4 leading-relaxed">
            Picoverse (ci-après "le Service") est un outil de création de pages web personnelles ou professionnelles permettant de regrouper des liens et du contenu. Le Service est édité par Yvan AMIGONI (ci-après "l'Éditeur").
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">2. Accès et Création de Compte</h2>
          <p className="mb-4 leading-relaxed">
            L'accès au Service est gratuit et ouvert à toute personne physique.
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Responsabilité :</strong> L'utilisateur est seul responsable de la confidentialité de ses identifiants de connexion. Toute action effectuée depuis son compte est présumée avoir été réalisée par lui-même.</li>
            <li><strong>Sécurité :</strong> L'utilisateur s'engage à informer l'Éditeur sans délai en cas d'utilisation frauduleuse de son compte.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">3. Propriété du Contenu et Propriété Intellectuelle</h2>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Propriété de l'utilisateur :</strong> L'utilisateur reste propriétaire de l'intégralité des contenus (textes, images, liens) qu'il publie sur ses pages.</li>
            <li><strong>Licence d'utilisation :</strong> En publiant du contenu sur le Service, l'utilisateur concède à l'Éditeur une licence gratuite, mondiale et non exclusive de reproduire et d'afficher ses contenus, strictement pour les besoins techniques du fonctionnement, de l'affichage et de la diffusion des pages créées.</li>
            <li><strong>Garantie :</strong> L'utilisateur garantit qu'il détient tous les droits de propriété intellectuelle ou les autorisations nécessaires sur les contenus qu'il publie. L'Éditeur ne pourra être tenu responsable en cas de violation de droits tiers par l'utilisateur.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">4. Obligations de l'Utilisateur et Contenus Interdits</h2>
          <p className="mb-4 leading-relaxed">
            L'utilisateur s'engage à utiliser le Service de bonne foi. Sont strictement interdits :
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Tout contenu illicite, haineux, diffamatoire ou incitant à la violence.</li>
            <li>Les liens vers des sites proposant des contenus ou activités illégales (streaming illégal, phishing, contrefaçon, etc.).</li>
            <li>Les contenus à caractère pornographique ou adulte qui ne respecteraient pas strictement le cadre légal en vigueur.</li>
            <li>Toute tentative d'exploitation de l'API du Service, de contournement des mesures de sécurité ou d'usurpation de droits administratifs.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">5. Modération et Suspension de Compte</h2>
          <p className="mb-4 leading-relaxed">
            L'Éditeur se réserve le droit de modérer, masquer ou supprimer tout contenu ou compte utilisateur, sans préavis ni indemnité, dans les cas suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Violation des présentes CGU ou de la loi française.</li>
            <li>Comportement technique suspect (tentative de piratage, surcharge volontaire des ressources).</li>
            <li>Demande des autorités judiciaires.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">6. Responsabilité et Disponibilité (SLA)</h2>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Disponibilité :</strong> Le Service repose sur l'infrastructure de Vercel Inc. L'Éditeur s'efforce d'assurer la meilleure disponibilité possible mais ne peut garantir une accessibilité ininterrompue.</li>
            <li><strong>Données :</strong> Dans le cadre du plan gratuit actuel, l'Éditeur ne peut être tenu responsable d'une perte de données ou d'une corruption de fichiers. Il appartient à l'utilisateur d'effectuer ses propres sauvegardes de ses liens et contenus.</li>
            <li><strong>Contenus tiers :</strong> L'Éditeur n'exerce aucun contrôle a priori sur les sites vers lesquels les utilisateurs font des liens et décline toute responsabilité quant à leur contenu.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">7. Modification des CGU</h2>
          <p className="mb-4 leading-relaxed">
            L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment pour les adapter aux évolutions du Service ou de la législation. L'utilisation continue du Service après modification vaut acceptation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">8. Droit Applicable et Juridiction Compétente</h2>
          <p className="mb-4 leading-relaxed">
            Les présentes CGU sont soumises au droit français. En cas de litige relatif à l'interprétation ou à l'exécution de ces conditions, et à défaut de résolution amiable, les tribunaux de Rouen (76) seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
}
