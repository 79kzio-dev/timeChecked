import { useEffect, useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

import { typeName } from "../data/TypeName";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";

export default function Worker() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("updatePending") === "true") {
      localStorage.removeItem("updatePending");
      window.location.reload();
    }
  }, []);

  // Home에서 전달받을 점검 종류
  const type = location.state?.type ?? "점검";

  const [worker, setWorker] = useState("");

  const startCheck = () => {

    navigate("/check", {
      state: {
        type,
        worker
      }
    });

  };


  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 450,
          mx: "auto",
          p: 4,
          borderRadius: 4
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1
          }}
        >
          {typeName[type]}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4
          }}
        >
          {type === "Tech"
            ? "기술팀 이름을 입력하세요."
            : "근무자 이름을 입력하세요."}
        </Typography>

        <TextField
          fullWidth
          label={type === "Tech" ? "기술팀" : "근무자"}
          value={worker}
          onChange={(e) => setWorker(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <PersonIcon
                  sx={{
                    mr: 1,
                    color: "action.active"
                  }}
                />
              )
            }
          }}
        />

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{
              height: 52,
              borderRadius: 3
            }}
          >
            취소
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={startCheck}
            sx={{
              height: 52,
              borderRadius: 3
            }}
          >
            점검 시작
          </Button>
        </Box>
      </Paper>
    </Container>
  );

}