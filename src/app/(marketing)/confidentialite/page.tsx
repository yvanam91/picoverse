import React from 'react';

export const metadata = {
  title: 'Politique de Confidentialité - Picoverse',
  description: 'Politique de Confidentialité de Picoverse.',
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0911] text-[#252B37] dark:text-[#F3EEF8]">
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4 font-['Inter']">Politique de Confidentialité</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Dernière mise à jour : 17 mars 2026</p>

        <p className="mb-8 leading-relaxed">
          La protection de vos données personnelles est une priorité pour Yvan AMIGONI (ci-après "l'Éditeur"). Cette notice explique comment vos données sont collectées, traitées et protégées lors de l'utilisation du Service.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">1. Responsable du traitement</h2>
          <p className="mb-4 leading-relaxed">
            Le responsable du traitement des données est Yvan AMIGONI, joignable à l’adresse : <a href="mailto:yvan@picover.se" className="text-[#6A58A9] dark:text-[#A997DF] hover:underline">yvan@picover.se</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">2. Données collectées et Finalités</h2>
          <p className="mb-4 leading-relaxed">
            Nous collectons uniquement les données strictement nécessaires au bon fonctionnement du Service :
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Création de compte :</strong> Nom d’utilisateur, adresse e-mail (pour l'identification et la communication) et mot de passe (haché de manière sécurisée).</li>
            <li><strong>Données techniques :</strong> Votre adresse IP est collectée pour des raisons de sécurité (détection de fraude, prévention des abus) et pour assurer la stabilité du Service.</li>
            <li><strong>Analytics :</strong> Nous utilisons Vercel Analytics et PostHog pour comprendre l'usage du site et l'améliorer. Ces outils sont configurés pour être respectueux de la vie privée et sont utilisés à des fins de mesures d'audience anonymes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">3. Base légale du traitement</h2>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Exécution du contrat :</strong> La collecte de l'e-mail et du nom d'utilisateur est nécessaire pour vous fournir le service de création de pages.</li>
            <li><strong>Intérêt légitime :</strong> La collecte de l'adresse IP et les analytics anonymes répondent à notre besoin de sécuriser et d'optimiser la plateforme.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">4. Destinataires et Sous-traitants</h2>
          <p className="mb-4 leading-relaxed">
            Vos données ne sont jamais revendues à des tiers. Elles sont toutefois transmises à des prestataires techniques de confiance pour le fonctionnement du site :
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Vercel Inc. :</strong> Hébergement du site et analytics.</li>
            <li><strong>PostHog :</strong> Analyse de l'usage produit (données hébergées sur des serveurs en UE).</li>
            <li><strong>Resend :</strong> Envoi des e-mails de service (confirmation d'inscription, réinitialisation de mot de passe).</li>
          </ul>
          <p className="mb-4 leading-relaxed">
            Bien que certains prestataires soient des sociétés basées aux États-Unis, nous veillons à ce que les serveurs de stockage soient situés au sein de l'Union Européenne lorsque cela est possible, ou que des garanties de protection équivalentes soient en place.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">5. Durée de conservation</h2>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Compte actif :</strong> Vos données sont conservées tant que votre compte est actif.</li>
            <li><strong>Suppression du compte :</strong> Si vous décidez de supprimer votre compte via votre interface d'administration, l'intégralité de vos données personnelles est supprimée immédiatement de nos bases de données de production.</li>
            <li><strong>Logs techniques :</strong> Les logs contenant les adresses IP sont conservés pour une durée maximale de 12 mois, conformément aux obligations légales de conservation des données de connexion.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">6. Sécurité</h2>
          <p className="mb-4 leading-relaxed">
            Nous mettons en œuvre des mesures de sécurité rigoureuses :
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Toutes les communications entre votre navigateur et nos serveurs sont chiffrées (protocole HTTPS/SSL).</li>
            <li>Les mots de passe sont hachés (rendus illisibles) en base de données avant tout stockage.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Inter']">7. Vos Droits (RGPD)</h2>
          <p className="mb-4 leading-relaxed">
            Conformément à la réglementation européenne, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Droit d’accès, de rectification et de suppression de vos données.</li>
            <li>Droit d'opposition ou de limitation du traitement.</li>
            <li>Droit à la portabilité de vos données.</li>
          </ul>
          <p className="mb-4 leading-relaxed">
            Pour exercer ces droits, vous pouvez envoyer un e-mail à : <a href="mailto:yvan@picover.se" className="text-[#6A58A9] dark:text-[#A997DF] hover:underline">yvan@picover.se</a>. Une réponse vous sera adressée dans un délai maximum d'un mois.
          </p>
          <p className="mb-4 leading-relaxed">
            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la <a href="https://cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#6A58A9] dark:text-[#A997DF] hover:underline">CNIL (cnil.fr)</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
