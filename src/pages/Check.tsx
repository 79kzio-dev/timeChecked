import { useEffect, useState } from "react";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";

import { checkData } from "../data/CheckData";
import { typeName } from "../data/TypeName";
import CheckCard from "../components/CheckCard";
import type { CheckItem } from "../data/CheckItem";

const now = () => {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

export default function Check() {
  const location = useLocation();
  const navigate = useNavigate();

  const type = (location.state?.type as keyof typeof checkData) ?? "Mb";

  const worker = location.state?.worker ?? "";

  const storageKey = `check_${type}_${worker}`;

  const createItems = (): CheckItem[] =>
    checkData[type].map((item) => ({
      ...item,
      startTime: "",
      endTime: ""
    }));

  const [items, setItems] = useState<CheckItem[]>(() => {
    const saved = localStorage.getItem(storageKey);

    return saved ? JSON.parse(saved) : createItems();
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const startItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.startTime === ""
          ? {
            ...item,
            startTime: now()
          }
          : item
      )
    );
  };

  const endItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.endTime === ""
          ? {
            ...item,
            endTime: now()
          }
          : item
      )
    );
  };

  const reset = () => {
    localStorage.removeItem(storageKey);
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
        pb: 3
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          mb: 3
        }}
      >
        <IconButton
          onClick={reset}
          sx={{
            position: "absolute",
            left: 0
          }}
        >
          <HomeIcon />
        </IconButton>

        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: 700
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
          mb: 3
        }}
      >
        {type === "Tech"
          ? `기술팀 ${worker || "미입력"} 님`
          : `${worker || "미입력"} 근무자`}
      </Typography>

      {items.map((item, index) => (
        <CheckCard
          key={index}
          item={item}
          onStart={() => startItem(index)}
          onEnd={() => endItem(index)}
        />
      ))}

      <Box
        sx={{
          mt: 4
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{
            height: 52,
            borderRadius: 3
          }}
          onClick={() =>
            navigate("/edit", {
              state: {
                type,
                worker,
                items
              }
            })
          }
        >
          확인
        </Button>
      </Box>
    </Container>
  );
}
