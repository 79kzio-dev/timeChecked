import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";

import { checkData } from "../data/CheckData";
import { typeName } from "../data/TypeName";
import CheckCard from "../components/CheckCard";
import type { CheckItem } from "../data/CheckItem";
import { resetAllChecks } from "../data/Storage.ts";

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

  const [homeOpen, setHomeOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");

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

  const addItem = () => {
    if (!newItemName.trim()) return;

    setItems((prev) => [
      ...prev,
      {
        name: newItemName.trim(),
        startTime: "",
        endTime: ""
      }
    ]);

    setNewItemName("");
    setAddOpen(false);
  };

  const goHome = () => {
    setHomeOpen(false);

    resetAllChecks();

    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        py: 2
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "background.default",
          pb: 2,
          flexShrink: 0
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <IconButton onClick={() => setHomeOpen(true)}>
            <HomeIcon />
          </IconButton>

          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: "1.1rem",
              fontWeight: 700
            }}
          >
            {typeName[type]}
          </Typography>

          {/* 점검 추가 */}
          <IconButton color="primary" onClick={() => setAddOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            mt: 2,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 17
          }}
        >
          {type === "Tech"
            ? `기술팀 ${worker || "미입력"} 님`
            : `${worker || "미입력"} 근무자`}
        </Typography>
      </Box>

      {/* 체크리스트(여기만 스크롤) */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          mt: 2,
          mb: 2,
          pr: 0.5,
          // 스크롤바 숨김
          "&::-webkit-scrollbar": {
            display: "none"
          },

          // Firefox
          scrollbarWidth: "none",

          // IE, Edge 구버전
          msOverflowStyle: "none"
        }}
      >
        {items.map((item, index) => (
          <CheckCard
            key={index}
            item={item}
            onStart={() => startItem(index)}
            onEnd={() => endItem(index)}
          />
        ))}
      </Box>

      {/* 하단 고정 확인 버튼 */}
      <Box
        sx={{
          flexShrink: 0,
          pt: 2,
          pb: 1,
          bgcolor: "background.default",
          borderTop: "1px solid",
          borderColor: "divider"
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

      {/* 홈 이동 Dialog */}
      <Dialog open={homeOpen} onClose={() => setHomeOpen(false)}>
        <DialogTitle>홈으로 이동</DialogTitle>

        <DialogContent>
          <DialogContentText>
            홈으로 이동하시겠습니까?
            <br />
            진행 중인 모든 점검 내용이 초기화됩니다.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setHomeOpen(false)}>취소</Button>

          <Button variant="contained" color="error" onClick={goHome}>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 점검 항목 추가 Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>점검 항목 추가</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="점검 항목명"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>취소</Button>

          <Button variant="contained" onClick={addItem}>
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}