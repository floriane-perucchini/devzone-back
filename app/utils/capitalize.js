function capitalize(words) {
  words = words.split(/\s+/);
  const arrayOfWords = [words.shift(), words.join(" ")];

  const capitalizedArray = arrayOfWords.map((word) => {
    return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  });

  return capitalizedArray.join(" ").trim();
}
export default capitalize;
