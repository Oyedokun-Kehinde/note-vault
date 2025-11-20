export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

export const extractHashtags = (text) => {
  if (!text) return [];
  const regex = /#(\w+)/g;
  const matches = text.match(regex);
  return matches ? matches.map(tag => tag.slice(1)) : [];
};