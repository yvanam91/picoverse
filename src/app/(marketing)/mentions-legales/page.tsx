import React from 'react';

export const metadata = {
  title: 'Mentions Légales - Picoverse',
  description: 'Mentions Légales de Picoverse.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0911] text-[#252B37] dark:text-[#F3EEF8]">
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-10 font-['Inter']">Mentions Légales</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">1. Édition du site</h2>
          <p className="mb-4 leading-relaxed">
            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), il est précisé aux utilisateurs du site l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Propriétaire du site :</strong> Yvan AMIGONI</li>
            <li><strong>Contact :</strong> <a href="mailto:yvan@picover.se" className="text-[#6A58A9] dark:text-[#A997DF] hover:underline">yvan@picover.se</a></li>
            <li><strong>Adresse postale :</strong> 15, rue Lemarchand, 76230 BOIS-GUILLAUME.</li>
            <li><strong>Directeur de la publication :</strong> Yvan AMIGONI.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">2. Hébergement</h2>
          <p className="mb-4 leading-relaxed">
            Le site est hébergé par la société Vercel Inc., dont le siège social est situé au :<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </p>
          <p className="mb-4 leading-relaxed">
            <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#6A58A9] dark:text-[#A997DF] hover:underline">https://vercel.com</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">3. Propriété intellectuelle et contrefaçons</h2>
          <p className="mb-4 leading-relaxed">
            Yvan AMIGONI est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site internet (textes, images, graphismes, logo, icônes, sons, logiciels).
          </p>
          <p className="mb-4 leading-relaxed">
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : Yvan AMIGONI.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">4. Limitations de responsabilité</h2>
          <p className="mb-4 leading-relaxed">
            Yvan AMIGONI agit en qualité d'éditeur du site. Il est responsable de la qualité et de la véracité du contenu qu’il publie.
          </p>
          <p className="mb-4 leading-relaxed">
            Toutefois, en tant qu'outil de création de pages ("page builder"), le site permet aux utilisateurs de publier leur propre contenu. Conformément à la loi, l'éditeur ne peut être tenu responsable des contenus publiés par les tiers (utilisateurs) dès lors qu'il n'en a pas eu connaissance effective ou qu'il a agi promptement pour les retirer dès qu'il en a eu connaissance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">5. Gestion des données personnelles</h2>
          <p className="mb-4 leading-relaxed">
            Le site assure à l'utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Finalité :</strong> Création de compte utilisateur et gestion des projets de pages web.</li>
            <li><strong>Droit des utilisateurs :</strong> En vertu du RGPD, l'utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition à ses données personnelles. Ces droits s'exercent via l'adresse : <a href="mailto:yvan@picover.se" className="text-[#6A58A9] dark:text-[#A997DF] hover:underline">yvan@picover.se</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
}
