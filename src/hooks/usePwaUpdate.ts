import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

export type UpdateStatus =
  "idle" | "checking" | "updating" | "complete" | "error";

const CHECK_HOUR = 17;

// 테스트할 때만 true
// 실제 배포할 때는 false
const TEST_MODE = false;

const SNACKBAR_DURATION = 2000;

export default function usePwaUpdate() {
  const [status, setStatus] = useState<UpdateStatus>("idle");

  useEffect(() => {
    let scheduleTimer: ReturnType<typeof setTimeout> | undefined;
    let statusTimer: ReturnType<typeof setTimeout> | undefined;
    let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

    let cancelled = false;

    // 오늘 날짜
    const getToday = () => {
      const now = new Date();

      return (
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")}`
      );
    };

    // 현재 시간이 업데이트 확인 시간 이후인지 확인
    const isAfterCheckTime = () => {
      if (TEST_MODE) {
        return true;
      }

      return new Date().getHours() >= CHECK_HOUR;
    };

    // 오늘 이미 확인했는지
    const alreadyCheckedToday = () => {
      return localStorage.getItem("pwaUpdateChecked") === getToday();
    };

    const finishChecking = () => {
      if (cancelled) return;

      if (statusTimer) {
        clearTimeout(statusTimer);
      }

      statusTimer = setTimeout(() => {
        if (!cancelled) {
          setStatus("idle");
        }
      }, SNACKBAR_DURATION);
    };

    const checkForUpdate = () => {
      if (cancelled) return;

      // 17시 이전
      if (!isAfterCheckTime()) {
        return;
      }

      // 오늘 이미 확인했으면 종료
      if (alreadyCheckedToday()) {
        return;
      }

      // 오늘 확인했다는 기록
      localStorage.setItem("pwaUpdateChecked", getToday());

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
            if (cancelled) return;

            if (statusTimer) {
              clearTimeout(statusTimer);
            }

            setStatus("updating");

            if (updateSW) {
              updateSW(true).catch((error) => {
                console.error("PWA 업데이트 적용 실패:", error);

                if (!cancelled) {
                  setStatus("error");

                  statusTimer = setTimeout(() => {
                    if (!cancelled) {
                      setStatus("idle");
                    }
                  }, SNACKBAR_DURATION);
                }
              });
            }
          },

          // PWA가 오프라인 사용 준비가 되었을 때
          // 여기서는 "업데이트 완료"로 사용하지 않습니다.
          onOfflineReady() {
            // 아무것도 하지 않음
          },

          onRegisterError(error) {
            console.error("PWA Service Worker 오류:", error);

            if (!cancelled) {
              setStatus("error");

              statusTimer = setTimeout(() => {
                if (!cancelled) {
                  setStatus("idle");
                }
              }, SNACKBAR_DURATION);
            }
          }
        });

        // 업데이트가 없는 경우
        // 2초 동안 "확인 중" 메시지를 보여준 뒤 닫음
        finishChecking();
      } catch (error) {
        console.error("PWA 업데이트 확인 오류:", error);

        if (!cancelled) {
          setStatus("error");

          statusTimer = setTimeout(() => {
            if (!cancelled) {
              setStatus("idle");
            }
          }, SNACKBAR_DURATION);
        }
      }
    };

    // 다음 17:00까지 남은 시간 계산
    const scheduleNextCheck = () => {
      if (cancelled) return;

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

    // 앱이 다시 화면에 나타났을 때
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      // 17시 이후이고 오늘 아직 확인하지 않았다면 확인
      if (isAfterCheckTime() && !alreadyCheckedToday()) {
        checkForUpdate();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 처음 Home에 들어왔을 때
    // 17시 이후라면 바로 확인
    const initialTimer = setTimeout(() => {
      if (!cancelled) {
        checkForUpdate();
      }
    }, 0);

    // 17시가 되면 자동으로 확인하도록 예약
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

  return status;
}