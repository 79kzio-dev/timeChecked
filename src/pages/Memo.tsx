import { Box, Container, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MemoCard from "../components/MemoCard";
import { memoData } from "../data/MemoData";
import { useNavigate } from "react-router-dom";

export default function Memo() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <IconButton color="inherit" onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>

        <Typography
          sx={{
            width: "100%",
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          메모G
        </Typography>
      </Box>
      {memoData.map((text, index) => (
        <MemoCard key={index} text={text} />
      ))}
    </Container>
  );
}
