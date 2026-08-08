// import { Box, Container, Paper, Typography } from "@mui/material";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import MenuCard from "../components/MenuCard";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import usePwaUpdate from "../hooks/usePwaUpdate.ts";
//
// export default function Home() {
//   const [currentTime, setCurrentTime] = useState("");
//   const navigate = useNavigate();
//
//   const updateStatus = usePwaUpdate();
//
//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//
//       const date = now.toLocaleDateString("ko-KR", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//         weekday: "short"
//       });
//
//       const time = now.toLocaleTimeString("ko-KR", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false
//       });
//
//       setCurrentTime(`${date} ${time}`);
//     };
//
//     updateTime();
//
//     const timer = setInterval(updateTime, 1000);
//
//     return () => clearInterval(timer);
//   }, []);
//
//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         height: "100dvh",
//         display: "flex",
//         flexDirection: "column",
//         py: 2,
//         px: 2,
//         overflow: "hidden",
//       }}
//     >
//       {/* Header */}
//       <Paper
//         elevation={0}
//         onClick={() => navigate("/")}
//         sx={{
//           p: 2,
//           mb: 2,
//           borderRadius: 4,
//           bgcolor: "primary.main",
//           color: "primary.contrastText",
//           flexShrink: 0,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {updateStatus === "checking" && (
//           <Typography
//             sx={{
//               textAlign: "center",
//               color: "text.secondary",
//               fontSize: 14,
//               mb: 1,
//             }}
//           >
//             업데이트 확인 중...
//           </Typography>
//         )}
//
//         {updateStatus === "updating" && (
//           <Typography
//             sx={{
//               textAlign: "center",
//               color: "primary.main",
//               fontSize: 14,
//               fontWeight: 700,
//               mb: 1,
//             }}
//           >
//             업데이트 중...
//           </Typography>
//         )}
//
//         {updateStatus === "complete" && (
//           <Typography
//             sx={{
//               textAlign: "center",
//               color: "success.main",
//               fontSize: 14,
//               fontWeight: 700,
//               mb: 1,
//             }}
//           >
//             업데이트 완료
//           </Typography>
//         )}
//
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 1,
//           }}
//         >
//           <VerifiedUserIcon fontSize="medium" />
//
//           <Typography
//             sx={{
//               fontWeight: 700,
//               fontSize: {
//                 xs: 16,
//                 sm: 18,
//               },
//               lineHeight: 1.4,
//               textAlign: "center",
//             }}
//           >
//             The Guardians 강남점
//             <br />
//             시설물 점검 관리
//           </Typography>
//         </Box>
//
//         <Typography
//           sx={{
//             mt: 1,
//             textAlign: "right",
//             opacity: 0.9,
//             fontSize: 14,
//           }}
//         >
//           {currentTime}
//         </Typography>
//       </Paper>
//
//       {/* 메뉴 영역만 스크롤 */}
//       <Box
//         sx={{
//           flex: 1,
//           minHeight: 0,
//           overflowY: "auto",
//           pr: 0.5,
//
//           "&::-webkit-scrollbar": {
//             display: "none",
//           },
//
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//       >
//         <MenuCard
//           title="본관 종합점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Mb" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="신관 종합점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Nb" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="HOS 종합점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Hos" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="식품관 점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Food" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="스위트 파크 점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Sweet" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="외곽 및 점외 시설물 점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Out" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="기술 점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Tech" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="보조 배터리 점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Battery" },
//             })
//           }
//         />
//
//         <MenuCard
//           title="누수 점검"
//           onClick={() =>
//             navigate("/worker", {
//               state: { type: "Water" },
//             })
//           }
//         />
//
//         <MenuCard title="메모G" onClick={() => navigate("/memo")} />
//
//         <Typography
//           sx={{
//             mt: 4,
//             mb: 2,
//             textAlign: "right",
//             color: "text.secondary",
//             fontSize: 14,
//           }}
//         >
//           Developed by Kzio
//         </Typography>
//       </Box>
//     </Container>
//   );
// }


import { Alert, Box, Container, Paper, Snackbar, Typography } from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import MenuCard from "../components/MenuCard";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import usePwaUpdate from "../hooks/usePwaUpdate.ts";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");

  const navigate = useNavigate();

  /*
   * PWA 업데이트 상태
   */
  const updateStatus = usePwaUpdate();

  /*
   * 현재 시간
   */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const date = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short"
      });

      const time = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });

      setCurrentTime(`${date} ${time}`);
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  /*
   * 업데이트 상태에 따른 Snackbar 표시 여부
   *
   * 별도의 setUpdateSnackOpen 상태를 사용하지 않습니다.
   *
   * 이렇게 하면
   * "Calling setState synchronously within an effect"
   * ESLint 오류가 발생하지 않습니다.
   */
  const updateSnackOpen =
    updateStatus === "checking" ||
    updateStatus === "updating" ||
    updateStatus === "complete" ||
    updateStatus === "error";

  /*
   * 업데이트 메시지
   */
  const getUpdateMessage = () => {
    switch (updateStatus) {
      case "checking":
        return "업데이트를 확인하고 있습니다...";

      case "updating":
        return "새 버전을 업데이트하고 있습니다...";

      case "complete":
        return "업데이트가 완료되었습니다.";

      case "error":
        return "업데이트 확인 중 문제가 발생했습니다.";

      default:
        return "";
    }
  };

  /*
   * Snackbar 종류
   */
  const getUpdateSeverity = () => {
    switch (updateStatus) {
      case "error":
        return "error" as const;

      case "complete":
        return "success" as const;

      default:
        return "info" as const;
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        py: 2,
        px: 2,
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        onClick={() => navigate("/")}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 4,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <VerifiedUserIcon fontSize="medium" />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: 16,
                sm: 18
              },
              lineHeight: 1.4,
              textAlign: "center"
            }}
          >
            The Guardians 강남점
            <br />
            시설물 점검 관리
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 1,
            textAlign: "right",
            opacity: 0.9,
            fontSize: 14
          }}
        >
          {currentTime}
        </Typography>
      </Paper>

      {/* 메뉴 영역만 스크롤 */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          pr: 0.5,

          "&::-webkit-scrollbar": {
            display: "none"
          },

          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <MenuCard
          title="본관 종합점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Mb"
              }
            })
          }
        />

        <MenuCard
          title="신관 종합점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Nb"
              }
            })
          }
        />

        <MenuCard
          title="HOS 종합점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Hos"
              }
            })
          }
        />

        <MenuCard
          title="식품관 점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Food"
              }
            })
          }
        />

        <MenuCard
          title="스위트 파크 점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Sweet"
              }
            })
          }
        />

        <MenuCard
          title="외곽 및 점외 시설물 점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Out"
              }
            })
          }
        />

        <MenuCard
          title="기술 점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Tech"
              }
            })
          }
        />

        <MenuCard
          title="보조 배터리 점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Battery"
              }
            })
          }
        />

        <MenuCard
          title="누수 점검"
          onClick={() =>
            navigate("/worker", {
              state: {
                type: "Water"
              }
            })
          }
        />

        <MenuCard title="메모G" onClick={() => navigate("/memo")} />

        <Typography
          sx={{
            mt: 4,
            mb: 2,
            textAlign: "right",
            color: "text.secondary",
            fontSize: 14
          }}
        >
          Developed by Kzio
        </Typography>
      </Box>

      {/* PWA 업데이트 상태 */}
      <Snackbar
        open={updateSnackOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Alert
          severity={getUpdateSeverity()}
          variant="filled"
          sx={{
            width: "100%"
          }}
        >
          {getUpdateMessage()}
        </Alert>
      </Snackbar>
    </Container>
  );
}
