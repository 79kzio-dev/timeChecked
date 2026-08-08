import { useEffect, useState } from "react";
import { Alert, Box, Container, Paper, Snackbar, Typography } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MenuCard from "../components/MenuCard";
import { useNavigate } from "react-router-dom";
import usePwaUpdate from "../hooks/usePwaUpdate";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");

  const navigate = useNavigate();

  // PWA 업데이트 상태
  const updateStatus = usePwaUpdate();

  // 업데이트 상태에 따른 Snackbar 문구
  const getUpdateMessage = () => {
    switch (updateStatus) {
      case "checking":
        return "업데이트를 확인하고 있습니다...";

      case "updating":
        return "업데이트를 적용하고 있습니다...";

      case "complete":
        return "업데이트가 완료되었습니다.";

      case "error":
        return "업데이트 확인에 실패했습니다.";

      default:
        return "";
    }
  };

  // 시간
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

    return () => clearInterval(timer);
  }, []);

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

      {/* PWA 업데이트 Snackbar */}
      <Snackbar
        open={updateStatus !== "idle"}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Alert
          severity={
            updateStatus === "error"
              ? "error"
              : updateStatus === "complete"
                ? "success"
                : "info"
          }
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