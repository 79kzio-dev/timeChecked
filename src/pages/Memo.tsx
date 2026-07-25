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
        py: 3
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3
        }}
      >
        <IconButton color="inherit" onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>

        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            mr: 6
          }}
        >
          Memo G
        </Typography>
      </Box>

      {memoData.map((item, index) => (
        <MemoCard key={index} item={item} />
      ))}
    </Container>
  );
}
