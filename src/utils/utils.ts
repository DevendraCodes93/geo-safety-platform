const getImagePrefix = () => {
  // Only use /Crypgo/ prefix for GitHub Pages deployment
  return process.env.GITHUB_PAGES === "true" ? "/Crypgo/" : "";
};

export { getImagePrefix };
