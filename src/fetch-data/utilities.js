// Converts an object of URL options into a query-URL form
export const convertOptionsToUrl = (options) => {
  let str = "";

  Object.keys(options).forEach(
    (key) => (str += key + "=" + options[key] + "&")
  );

  return str;
};

// Removes the given list of characters from the given string 
const removeCharacters = (str, characters) => {
  for (let ch of characters) {
    if (str.includes(ch)) {
      str = str.replaceAll(ch, "");
    }
  }
  return str;
}

// Removes the given list of characters from the given string along with any spaces (if exists behind)
const removeCharactersWithBackSpaces = (str, characters) => {
  let newStr = "";
  for(let i = 1; i < str.length; i++) {
    const ch = str.charAt(i);
    const prev_ch = str.charAt(i-1);
    if(characters.has(ch) && prev_ch === " ") // current character is special and previous lies a space 
      newStr = newStr.substr(0, newStr.length - 1);
    else 
      newStr += ch;
  }
  newStr = str.charAt(0) + newStr; // add the first character
  return newStr;
}

// Converts a movie title to Rotten Tomatoes movie title
export const convertToRottenTomatoesTitle = (title) => {
  // Convert to lowercase
  let formattedTitle = title.toLowerCase();

  // Define the special characters
  const specialCharacters = new Set([":", "-", "'", ".", "!", "?", "%"]);

  // Replace & with and 
  formattedTitle = formattedTitle.replaceAll("&", "and");

  // If there is space at the back and in front of a special character, then remove the back space
  let temp = "";
  for (let i = 1; i < formattedTitle.length - 1; i++) {
    let ch = formattedTitle.charAt(i);
    let prev_ch = formattedTitle.charAt(i - 1);
    let next_ch = formattedTitle.charAt(i + 1);

    if (specialCharacters.has(ch) && prev_ch === " " && next_ch === " ") {
      // Special characters in between two spaces --> remove the previous space and ignore current character
      temp = temp.substr(0, temp.length - 1);
    } else if (ch === "-" && prev_ch !== " " && next_ch !== " ") {
      // Hyphen between two characters --> replace with underscore
      temp += "_";
    } else {
      // Other characters
      temp += ch;
    }
  }

  if (formattedTitle.length !== 1) {
    formattedTitle =
      formattedTitle[0] + temp + formattedTitle[formattedTitle.length - 1];
  }

  // Remove the special characters from the title
  formattedTitle = removeCharacters(formattedTitle, specialCharacters)

  // Replace the spaces with underscores
  formattedTitle = formattedTitle.replaceAll(" ", "_");

  return formattedTitle;
};

export const convertToMetacriticTitle = (title) => {
  // Convert to lowercase
  let formattedTitle = title.toLowerCase();
  const specialCharacters = new Set([":", "'", "&", ".", "!", "?", "%"]);

  // Remove all special characters along with spaces behind (if exists)
  formattedTitle = removeCharactersWithBackSpaces(formattedTitle, specialCharacters);

  // Remove all special characters 
  formattedTitle = removeCharacters(formattedTitle, specialCharacters);

  // Replace all spaces with hyphens 
  formattedTitle = formattedTitle.replaceAll(" ", "-");

  return formattedTitle;
};
