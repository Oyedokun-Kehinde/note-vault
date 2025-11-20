// src/utils.js
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

export const truncateText = (text, maxLength = 200) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '…';
};