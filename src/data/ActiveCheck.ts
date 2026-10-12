export type ActiveCheck = {
  type: string;
  worker: string;
};

const ACTIVE_CHECK_KEY = "active_check_session";

export function getActiveCheck(): ActiveCheck | null {
  try {
    const saved = localStorage.getItem(ACTIVE_CHECK_KEY);
    return saved ? (JSON.parse(saved) as ActiveCheck) : null;
  } catch {
    return null;
  }
}

export function saveActiveCheck(session: ActiveCheck) {
  localStorage.setItem(ACTIVE_CHECK_KEY, JSON.stringify(session));
}

export function clearActiveCheck() {
  localStorage.removeItem(ACTIVE_CHECK_KEY);
}

export function getWorkerDraft(type: string): string {
  // Remove drafts saved by the earlier localStorage implementation.
  localStorage.removeItem(`worker_draft_${type}`);
  return sessionStorage.getItem(`worker_draft_${type}`) ?? "";
}

export function saveWorkerDraft(type: string, worker: string) {
  sessionStorage.setItem(`worker_draft_${type}`, worker);
}
