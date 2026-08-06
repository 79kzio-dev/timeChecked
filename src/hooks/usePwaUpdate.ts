import { useEffect } from "react";

export default function usePwaUpdate() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handler = () => {
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", handler);

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", handler);
    };
  }, []);
}
