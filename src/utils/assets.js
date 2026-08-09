export const assetUrl = (path) => {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
};
