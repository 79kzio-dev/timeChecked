export function resetAllChecks() {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("check_") || key.startsWith("worker_draft_")) {
      localStorage.removeItem(key);
    }
  });

  Object.keys(sessionStorage).forEach((key) => {
    if (key.startsWith("worker_draft_")) {
      sessionStorage.removeItem(key);
    }
  });
}
