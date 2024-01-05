export const DateSplit = (data) => {
  const date = new Date(data).toUTCString().split(" ");
  return `${date[1]} ${date[2]} ${date[3]}`;
};

export const trimTextByCharacter = (text, charLimit) => {
  if (text.length > charLimit) {
    return text.substring(0, charLimit) + "..."; // Trim text and add ellipsis
  }
  return text; // Return original text if it's shorter than the limit
};
