export const getRouteName = (url) => {
  const match = url.split('/');
  console.log("MM",match);
  return match ? match[match.length -1] : "";
};
