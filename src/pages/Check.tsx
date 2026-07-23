import { useState } from "react";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";

import { checkData } from "../data/CheckData";
import { typeName } from "../data/TypeName";
import CheckCard from "../components/CheckCard";

const now = () => {
  const d = new Date();

  return d.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function Check() {
  const location = useLocation();
  const navigate = useNavigate();

  const type = (location.state?.type as keyof typeof checkData) ?? "Mb";

  const worker = location.state?.worker ?? "";

  const [items, setItems] = useState(
    checkData[type].map((item) => ({
      ...item,
    })),
  );

  const clickItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        if (!item.startTime) {
          return {
            ...item,
            startTime: now(),
          };
        }

        if (!item.endTime) {
          return {
            ...item,
            endTime: now(),
          };
        }

        return item;
      }),
    );
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
        pb: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          mb: 3,
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            left: 0,
          }}
        >
          <HomeIcon />
        </IconButton>

        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "black",
          }}
        >
          {typeName[type]}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1.1rem",
          textAlign: "center",
          mb: 3,
        }}
      >
        {type === "Tech"
          ? `기술팀 ${worker || "미입력"} 님`
          : `${worker || "미입력"} 근무자`}
      </Typography>

      {/* 점검 리스트 */}
      {items.map((item, index) => (
        <CheckCard key={index} item={item} onClick={() => clickItem(index)} />
      ))}

      {/* 확인 버튼 */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{
            height: 52,
            borderRadius: 3,
          }}
          onClick={() =>
            navigate("/edit", {
              state: {
                type,
                worker,
                items,
              },
            })
          }
        >
          확인
        </Button>
      </Box>
    </Container>
  );
}
