import { Box, Container, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

import MemoCard from "../components/MemoCard";
import { memoData } from "../data/MemoData";

export default function Memo() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        py: 2,
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          mb: 2,
          bgcolor: "background.default",
          py: 1
        }}
      >
        <IconButton color="inherit" onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            mr: 6
          }}
        >
          Memo G
        </Typography>
      </Box>

      {/* Memo 영역만 스크롤 */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            display: "none"
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        {memoData.map((item, index) => (
          <MemoCard key={index} item={item} />
        ))}
      </Box>
    </Container>
  );
}
