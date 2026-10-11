export const QARE_URL =
  "https://www.qare.fr/praticien/69fca90c4c4ffa002f7a3001?all=true&selectedSpeciality=psychologist&standardizedMotives=";
export const RPPS = "10111858667";
export const PORTRAIT_SRC: string | null = "/photo-doriane.jpg";

export const nav = [
  { label: "Accueil", href: "#accueil" },
  { label: "Qui suis-je ?", href: "#qui-suis-je" },
  { label: "Cadre et tarif", href: "#cadre-tarif" },
  { label: "FAQ", href: "#faq" },
] as const;

export const concerns = [
  { icon: "wave", title: "Stress ou anxiété", text: "Vous vous sentez souvent sous pression, envahi·e par vos pensées ou en difficulté pour retrouver votre calme." },
  { icon: "people", title: "Famille, couple ou travail", text: "Une relation, un changement ou une situation professionnelle prend beaucoup de place dans votre quotidien." },
  { icon: "spark", title: "Confiance en soi", text: "Vous doutez de vous, vous vous comparez beaucoup ou avez du mal à prendre votre place." },
  { icon: "heart", title: "Émotions", text: "Vous traversez une période où vos émotions semblent difficiles à comprendre, à accueillir ou à exprimer." },
] as const;

export const principles = [
  { id: "ecouter", label: "Écouter", text: "Créer un espace où vous pouvez déposer ce qui vous préoccupe, à votre rythme et sans jugement." },
  { id: "comprendre", label: "Comprendre", text: "Mettre du sens sur ce que vous vivez, en tenant compte de votre histoire et de votre environnement." },
  { id: "collaborer", label: "Collaborer", text: "Avancer ensemble, avec une démarche adaptée à vos besoins, vos ressources et vos objectifs." },
  { id: "reponses", label: "Trouver vos propres réponses", text: "Vous accompagner pour retrouver vos repères et construire des solutions qui vous ressemblent." },
] as const;

export const steps = [
  { title: "Parler à votre rythme", text: "Vous pouvez commencer par ce qui vous semble le plus important aujourd’hui." },
  { title: "Ne pas devoir savoir quoi dire", text: "Il n’est pas nécessaire d’avoir préparé votre séance ni de savoir par où commencer." },
  { title: "Faire le point ensemble", text: "Nous prenons le temps de comprendre ce qui vous amène et ce dont vous avez besoin." },
  { title: "Rester libre", text: "Vous êtes libre de poursuivre, d’espacer les séances ou de ne pas donner suite." },
] as const;

export const consultationFacts = [
  { icon: "clock", title: "45 min", text: "Durée approximative" },
  { icon: "camera", title: "En visio", text: "Téléphone, ordinateur ou tablette" },
  { icon: "lock", title: "Confidentiel", text: "Un cadre professionnel et sécurisé" },
] as const;

export const faqs = [
  { q: "Comment se déroule une séance en ligne ?", a: "Les séances se déroulent en visioconférence, via la plateforme sécurisée Qare. Vous vous connectez depuis l’endroit où vous vous sentez le plus à l’aise, avec un téléphone, une tablette ou un ordinateur." },
  { q: "Dois-je savoir exactement de quoi parler ?", a: "Non. Vous n’avez rien à préparer et il n’est pas nécessaire de savoir précisément par où commencer. Nous pouvons prendre le temps de faire le point ensemble." },
  { q: "Combien de temps dure une consultation ?", a: "Une consultation individuelle dure environ 45 minutes." },
  { q: "À quel rythme peut-on se voir ?", a: "Le rythme se construit ensemble selon votre situation, vos besoins et ce qui vous convient. Il peut évoluer au fil de l’accompagnement." },
  { q: "Les séances sont-elles confidentielles ?", a: "Oui. Les échanges s’inscrivent dans un cadre confidentiel et professionnel. La visioconférence se déroule via la plateforme sécurisée Qare." },
  { q: "Les consultations peuvent-elles être remboursées ?", a: "Certaines mutuelles proposent un remboursement des séances de psychologie. Vous pouvez vous rapprocher de votre mutuelle pour connaître les modalités de votre contrat." },
] as const;

export const testimonials = [
  "« J’ai trouvé un espace où je pouvais parler librement, sans avoir besoin de tout expliquer parfaitement. »",
  "« Les séances m’ont aidé·e à prendre du recul et à mieux comprendre ce que je traversais. »",
  "« Je me suis senti·e écouté·e avec beaucoup de douceur et de justesse. »",
] as const;

export const legalLinks = ["Mentions légales", "Politique de confidentialité", "Cookies"] as const;
