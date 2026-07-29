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

  //점검 추가 버튼
  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem: CheckItem = {
      name: newItemName.trim(),
      startTime: "",
      endTime: ""
    };

    setItems((prev) => [...prev, newItem]);

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
        mt: 3,
        pb: 3
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: "background.default",
          pb: 2,
          mb: 3
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

          {/*점검 추가 버튼*/}
          <IconButton color="primary" onClick={() => setAddOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            mt: 2,
            fontWeight: 700,
            fontSize: "1.1rem",
            textAlign: "center"
          }}
        >
          {type === "Tech"
            ? `기술팀 ${worker || "미입력"} 님`
            : `${worker || "미입력"} 근무자`}
        </Typography>
      </Box>

      {items.map((item, index) => (
        <CheckCard
          key={index}
          item={item}
          onStart={() => startItem(index)}
          onEnd={() => endItem(index)}
        />
      ))}

      {/* 추가 FAB */}
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    display: "flex",*/}
      {/*    justifyContent: "flex-end",*/}
      {/*    right: {*/}
      {/*      xs: 20,*/}
      {/*      sm: "calc((100vw - 600px) / 2 + 20px)"*/}
      {/*    },*/}
      {/*    bottom: 90,*/}
      {/*    zIndex: 1100,*/}
      {/*    mt: 2,*/}
      {/*    mb: 2*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Fab*/}
      {/*    color="primary"*/}
      {/*    size="small"*/}
      {/*    onClick={() => setAddOpen(true)}*/}
      {/*    sx={{*/}
      {/*      width: 40,*/}
      {/*      height: 40,*/}
      {/*      minHeight: 40,*/}
      {/*      boxShadow: 2*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <AddIcon />*/}
      {/*  </Fab>*/}
      {/* </Box>*/}

      {/*확인 버튼*/}
      <Box sx={{ mt: 4 }}>
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

      {/*//FAB추가 Dialog*/}
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
