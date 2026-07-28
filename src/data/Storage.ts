export function resetAllChecks() {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("check_")) {
      localStorage.removeItem(key);
    }
  });
}
