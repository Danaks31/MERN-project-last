export const dateParser = (num) => {
  let option = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", option);

  return date.toString();
};

// Pour parsé un timestamp
export const timestampParser = (num) => {
  let option = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", option);
  return date.toString();
};

// Re créé le fonctionnement de IsEmpty PhP en js ( Si l'une de ces conditions est vrai, return true )
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
