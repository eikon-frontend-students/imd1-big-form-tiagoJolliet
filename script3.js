/* =========================================================
   LIVE SUMMARY
   Met à jour la colonne "Summary" à droite en temps réel
   pendant que l'utilisateur remplit le formulaire.
   ========================================================= */

// Sélectionne la balise <form> dans la page
const form = document.querySelector("form");

// Liste des champs qu'on veut afficher dans le summary.
// Chaque nom correspond à la fois :
//   - à l'attribut name="..." de l'input HTML
//   - à la fin de l'id du <dd> dans le summary (ex: "sum-name")
// En les gardant identiques, on peut tout gérer avec une seule boucle.
const textFields = ["name", "first_name", "age", "email", "pseudo", "bio"];

// refreshText() recopie la valeur de chaque input dans sa ligne du summary
function refreshText() {
  textFields.forEach((field) => {
    const input = form.elements[field]; // Trouve l'<input> ou <textarea> par son name
    const target = document.getElementById("sum-" + field); // Trouve le <dd> correspondant dans le summary

    // .trim() supprime les espaces vides au début et à la fin.
    // Si le champ est vide, on affiche "—" à la place.
    target.textContent = input.value.trim() || "—";
  });
}

// Écoute l'événement "input" sur le formulaire entier.
// L'événement "input" se déclenche à CHAQUE frappe clavier,
// donc le summary se met à jour en temps réel.
form.addEventListener("input", refreshText);

/* =========================================================
   FOND JAUNE + LIVE SUMMARY (version champ par champ)
   Même logique que ci-dessus, mais gère aussi la couleur
   de fond jaune quand un champ est rempli.
   ========================================================= */

// Même liste de champs
const fields = ["name", "first_name", "age", "email", "pseudo", "bio"];

// On boucle sur chaque nom de champ
fields.forEach((fieldName) => {
  // Sélectionne l'input via son attribut name (ex: <input name="name">)
  const input = document.querySelector(`[name="${fieldName}"]`);

  // Sélectionne le <dd> correspondant dans le summary (ex: <dd id="sum-name">)
  const summary = document.getElementById(`sum-${fieldName}`);

  // Si l'un des deux éléments n'existe pas dans le HTML, on arrête là
  // pour éviter une erreur JavaScript
  if (!input || !summary) return;

  // Pour chaque champ, on écoute l'événement "input" (frappe clavier)
  input.addEventListener("input", () => {
    // Met à jour le texte dans le summary.
    // Si le champ est vide, affiche "—"
    summary.textContent = input.value.trim() || "—";

    // Gestion du fond jaune :
    // Si le champ contient quelque chose → ajoute la classe "filled" (fond jaune)
    // Si le champ est vide → retire la classe "filled" (fond transparent)
    if (input.value.trim() !== "") {
      input.classList.add("filled"); // Ajoute "filled" → .champ-input.filled dans le CSS
    } else {
      input.classList.remove("filled"); // Retire "filled" → retour au fond transparent
    }
  });
});
