const formatFileSize = (size) => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = parseInt(Math.floor(Math.log(size) / Math.log(k)));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const truncateFileName = (fileName, maxLength) => {
  if (fileName.length <= maxLength) return fileName;

  const ellipsis = "...";
  const startLength = Math.floor((maxLength - ellipsis.length) / 2);
  const endLength = maxLength - startLength - ellipsis.length;

  return (
    fileName.substr(0, startLength) + ellipsis + fileName.substr(-endLength)
  );
};

const extractNumbers = (str = "") => {
  // Use a regular expression to match only digits
  const regex = /\d/g;

  // Use the match method to find all matches in the string
  const matches = str.match(regex);

  // Join the matched digits into a single string
  if (matches) {
    return matches.join("");
  } else {
    return null; // Return null if no digits are found
  }
};

export { formatFileSize, truncateFileName, extractNumbers };
