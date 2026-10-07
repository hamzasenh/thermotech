import type { FaqItem } from "./services/types";

// FAQ de la page d'accueil (section #faqs). Contenu repris de l'ancien site.
// Réponse 1 corrigée (Q34) : plus de « ou au mazout », renvoi vers la page
// remplacement, sans citer de règle régionale.
export const homeFaqs: FaqItem[] = [
    {
        id: 1,
        question: "Comment obtenir un devis pour l'installation d'une nouvelle chaudière ?",
        answer: "Pour obtenir un devis pour l’installation d’une nouvelle chaudière, il vous suffit de nous contacter par email ou par appel téléphonique. Nous vous fournissons un devis détaillé. Tout savoir sur le [remplacement de chaudière](/chauffage/remplacement-chaudiere)."
    },
    {
        id: 2,
        question: "Sur quelles chaudières intervenez-vous ?",
        answer: "Nos chauffagistes interviennent sur tout type de chaudières au gaz et au mazout, quelle que soit la marque : Bosch, Bulex, Vaillant, Viessmann, etc."
    },
    {
        id: 3,
        question: "Quel est le type de chaudières que vous prenez en charge ?",
        answer: "Nos chauffagistes installent une large gamme de chaudières pour répondre à vos besoins en chauffage, y compris des chaudières à condensation ou au gaz. Nous vous conseillons également sur la meilleure marque et le type d’équipement adapté à votre habitation."
    },
    {
        id: 4,
        question: "Quel est le meilleur moment pour faire l'entretien de ma chaudière ?",
        answer: "Il est recommandé de faire l’entretien de votre chaudière au gaz tous les deux ans et de votre chaudière au mazout chaque année. Nos chauffagistes vous conseillent de planifier un RDV avant l’hiver pour vous assurer que votre système est prêt à fonctionner de manière optimale tout au long de la saison froide."
    },
    {
        id: 5,
        question: "Quand remplacer votre chaudière ?",
        answer: "La durée de vie d’une chaudière est de plus ou moins 15 ans. Nous vous conseillons donc de réfléchir à remplacer votre chaudière si elle a plus de 12 à 15 ans. Néanmoins, si vous ne possédez pas encore de chaudière à condensation actuellement, n’hésitez pas à remplacer votre système dès maintenant."
    },
];
