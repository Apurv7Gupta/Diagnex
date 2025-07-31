export function getConfig() {
  const audience =
    import.meta.env.VITE_AUTH0_AUDIENCE &&
    import.meta.env.VITE_AUTH0_AUDIENCE !== "{yourApiIdentifier}"
      ? import.meta.env.VITE_AUTH0_AUDIENCE
      : null;

  return {
    domain: import.meta.env.VITE_AUTH0_DOMAIN || "",
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "",
    ...(audience ? { audience } : {}),
  };
}
