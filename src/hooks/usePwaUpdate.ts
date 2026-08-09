import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

export type UpdateStatus =
  "idle" | "checking" | "updating" | "complete" | "error";

const CHECK_HOUR = 17;
const SNACKBAR_DURATION = 2000;

export default function usePwaUpdate() {
  const [status, setStatus] = useState<UpdateStatus>(() => {
    const updatePending = sessionStorage.getItem("pwaUpdatePending");

    if (updatePending === "true") {
      sessionStorage.removeItem("pwaUpdatePending");
      return "complete";
    }

    return "idle";
  });

  // PWA 업데이트 확인
  useEffect(() => {
    let scheduleTimer: ReturnType<typeof setTimeout> | undefined;
    let statusTimer: ReturnType<typeof setTimeout> | undefined;
    let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

    let cancelled = false;

    const getToday = () => {
      const now = new Date();

      return (
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")}`
      );
    };

    const isAfterCheckTime = () => {
      return new Date().getHours() >= CHECK_HOUR;
    };

    const alreadyCheckedToday = () => {
      return localStorage.getItem("pwaUpdateChecked") === getToday();
    };

    const showStatus = (newStatus: UpdateStatus) => {
      if (cancelled) {
        return;
      }

      if (statusTimer) {
        clearTimeout(statusTimer);
      }

      setStatus(newStatus);

      statusTimer = setTimeout(() => {
        if (!cancelled) {
          setStatus("idle");
        }
      }, SNACKBAR_DURATION);
    };

    const checkForUpdate = () => {
      if (cancelled) {
        return;
      }

      // 17시 이전에는 업데이트 확인하지 않음
      if (!isAfterCheckTime()) {
        return;
      }

      // 오늘 이미 확인했다면 종료
      if (alreadyCheckedToday()) {
        return;
      }

      if (statusTimer) {
        clearTimeout(statusTimer);
      }

      // 업데이트 확인 중
      setStatus("checking");

      try {
        updateSW = registerSW({
          immediate: true,

          onRegisteredSW(_swUrl, registration) {
            if (registration) {
              registration.update().catch((error) => {
                console.error("PWA 업데이트 확인 실패:", error);
              });
            }
          },

          // 새로운 Service Worker 발견
          onNeedRefresh() {
            if (cancelled) {
              return;
            }

            if (statusTimer) {
              clearTimeout(statusTimer);
            }

            setStatus("updating");

            // 새 버전 적용 후 다시 Home이 열렸을 때
            // "업데이트 완료"를 표시하기 위한 기록
            sessionStorage.setItem("pwaUpdatePending", "true");

            // 오늘 업데이트 확인 완료
            localStorage.setItem("pwaUpdateChecked", getToday());

            if (updateSW) {
              updateSW(true).catch((error) => {
                console.error("PWA 업데이트 적용 실패:", error);

                sessionStorage.removeItem("pwaUpdatePending");

                showStatus("error");
              });
            }
          },

          // 오프라인 사용 준비
          onOfflineReady() {
            // 업데이트 완료 상태로 사용하지 않음
          },

          onRegisterError(error) {
            console.error("PWA Service Worker 오류:", error);

            showStatus("error");
          }
        });

        // 업데이트가 없는 경우
        // 2초 후 확인 메시지 종료
        statusTimer = setTimeout(() => {
          if (!cancelled) {
            setStatus("idle");

            localStorage.setItem("pwaUpdateChecked", getToday());
          }
        }, SNACKBAR_DURATION);
      } catch (error) {
        console.error("PWA 업데이트 확인 오류:", error);

        showStatus("error");
      }
    };

    // PWA가 다시 화면에 나타났을 때
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      if (isAfterCheckTime() && !alreadyCheckedToday()) {
        checkForUpdate();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Home에 처음 들어왔을 때
    const initialTimer = setTimeout(() => {
      if (!cancelled) {
        checkForUpdate();
      }
    }, 0);

    // 다음 17:00까지 예약
    const scheduleNextCheck = () => {
      if (cancelled) {
        return;
      }

      const now = new Date();
      const nextCheck = new Date(now);

      nextCheck.setHours(CHECK_HOUR, 0, 0, 0);

      // 이미 17시가 지났다면 다음 날 17시
      if (now >= nextCheck) {
        nextCheck.setDate(nextCheck.getDate() + 1);
      }

      const delay = nextCheck.getTime() - now.getTime();

      scheduleTimer = setTimeout(() => {
        if (!cancelled) {
          checkForUpdate();
          scheduleNextCheck();
        }
      }, delay);
    };

    scheduleNextCheck();

    return () => {
      cancelled = true;

      clearTimeout(initialTimer);

      if (scheduleTimer) {
        clearTimeout(scheduleTimer);
      }

      if (statusTimer) {
        clearTimeout(statusTimer);
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 업데이트 완료 메시지를 2초 동안 표시
  useEffect(() => {
    if (status !== "complete") {
      return;
    }

    const timer = setTimeout(() => {
      setStatus("idle");
    }, SNACKBAR_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  return status;
}
