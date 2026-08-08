import { useEffect, useRef, useState } from "react";
import { registerSW } from "virtual:pwa-register";

type UpdateStatus =
  | "idle"
  | "checking"
  | "updating"
  | "complete"
  | "error";

export default function usePwaUpdate() {
  const [status, setStatus] = useState<UpdateStatus>("idle");

  /*
   * ============================================
   * 테스트 설정
   * ============================================
   *
   * true  : 현재 시간이 몇 시인지 관계없이 17시 이후로 간주
   * false : 실제 현재 시간을 사용
   *
   * 테스트가 끝나면 false로 변경하세요.
   */
  const TEST_MODE = false;

  const updateSWRef = useRef<
    ((reloadPage?: boolean) => Promise<void>) | null
  >(null);

  const registrationRef =
    useRef<ServiceWorkerRegistration | null>(null);

  const checkingRef = useRef(false);

  const updateFoundRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    /*
     * 오늘 날짜
     */
    const getToday = () => {
      const now = new Date();

      return (
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")}`
      );
    };

    /*
     * 업데이트 확인
     */
    const checkForUpdate = async () => {
      if (!mounted) return;

      /*
       * 이미 확인 중이면 중복 실행하지 않음
       */
      if (checkingRef.current) {
        return;
      }

      const now = new Date();

      /*
       * 테스트 모드에서는 17시로 강제
       */
      const hour = TEST_MODE ? 17 : now.getHours();

      /*
       * 17시 이전에는 업데이트 확인하지 않음
       */
      if (hour < 17) {
        return;
      }

      const today = getToday();

      /*
       * 오늘 이미 확인했다면 다시 확인하지 않음
       */
      const checkedDate =
        localStorage.getItem("pwaUpdateChecked");

      if (checkedDate === today) {
        return;
      }

      /*
       * 확인 시작
       */
      checkingRef.current = true;
      updateFoundRef.current = false;

      if (mounted) {
        setStatus("checking");
      }

      try {
        /*
         * Service Worker가 아직 등록되지 않았다면
         * registerSW를 먼저 실행
         */
        if (!updateSWRef.current) {
          const updateSW = registerSW({
            immediate: true,

            /*
             * Service Worker 등록 완료
             */
            onRegisteredSW(_swUrl, registration) {
              if (!registration) {
                return;
              }

              registrationRef.current = registration;
            },

            /*
             * 새로운 버전 발견
             */
            onNeedRefresh() {
              updateFoundRef.current = true;

              if (!mounted) {
                return;
              }

              setStatus("updating");

              /*
               * 새 Service Worker가 적용되는 순간
               * controllerchange가 발생함
               */
              const handleControllerChange = () => {
                navigator.serviceWorker.removeEventListener(
                  "controllerchange",
                  handleControllerChange
                );

                if (!mounted) {
                  return;
                }

                /*
                 * 오늘 업데이트 확인 완료
                 */
                localStorage.setItem(
                  "pwaUpdateChecked",
                  getToday()
                );

                setStatus("complete");

                /*
                 * 완료 메시지를 잠시 보여준 후
                 * 새 버전으로 새로고침
                 */
                setTimeout(() => {
                  window.location.reload();
                }, 800);
              };

              navigator.serviceWorker.addEventListener(
                "controllerchange",
                handleControllerChange
              );

              /*
               * 새 Service Worker 적용
               *
               * false를 사용해서 우리가 직접
               * controllerchange 후 새로고침함
               */
              updateSW().catch((error) => {
                console.error(
                  "PWA 업데이트 적용 실패:",
                  error
                );

                navigator.serviceWorker.removeEventListener(
                  "controllerchange",
                  handleControllerChange
                );

                if (mounted) {
                  setStatus("error");
                }
              });
            },

            /*
             * 오프라인 사용 준비 완료
             *
             * 업데이트가 없는 경우에도
             * Service Worker 초기 등록 과정에서 호출될 수 있음
             */
            onOfflineReady() {
              /*
               * onNeedRefresh가 실행되지 않았다면
               * 새로운 업데이트가 없는 것으로 처리
               */
              if (updateFoundRef.current) {
                return;
              }

              localStorage.setItem(
                "pwaUpdateChecked",
                getToday()
              );

              if (!mounted) {
                return;
              }

              setStatus("complete");

              setTimeout(() => {
                if (mounted) {
                  setStatus("idle");
                }
              }, 1500);
            },

            /*
             * Service Worker 등록 실패
             */
            onRegisterError(error) {
              console.error(
                "PWA Service Worker 등록 실패:",
                error
              );

              if (mounted) {
                setStatus("error");
              }
            }
          });

          updateSWRef.current = updateSW;
        }

        /*
         * 이미 등록되어 있는 Service Worker가 있다면
         * 직접 업데이트 확인
         */
        const registration =
          registrationRef.current;

        if (registration) {
          await registration.update();

          /*
           * onNeedRefresh가 실행되었다면
           * 이미 업데이트 처리 중
           */
          if (updateFoundRef.current) {
            return;
          }

          /*
           * 업데이트가 발견되지 않은 경우
           */
          setTimeout(() => {
            if (!mounted) {
              return;
            }

            if (!updateFoundRef.current) {
              localStorage.setItem(
                "pwaUpdateChecked",
                getToday()
              );

              setStatus("complete");

              setTimeout(() => {
                if (mounted) {
                  setStatus("idle");
                }
              }, 1500);
            }
          }, 500);
        }
      } catch (error) {
        console.error(
          "PWA 업데이트 확인 실패:",
          error
        );

        if (mounted) {
          setStatus("error");
        }
      } finally {
        /*
         * 약간의 시간이 지나면 다시 확인 가능
         */
        setTimeout(() => {
          checkingRef.current = false;
        }, 1000);
      }
    };

    /*
     * 처음 Home에 들어왔을 때 확인
     */
    checkForUpdate();

    /*
     * 앱이 백그라운드에 있다가 다시 활성화될 때
     *
     * 예:
     * - 휴대폰에서 다른 앱을 사용
     * - 다시 TimeChecked로 돌아옴
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkForUpdate();
      }
    };

    /*
     * 브라우저 창으로 다시 돌아왔을 때
     */
    const handleFocus = () => {
      checkForUpdate();
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener(
      "focus",
      handleFocus
    );

    /*
     * 정리
     */
    return () => {
      mounted = false;

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, []);

  return status;
}