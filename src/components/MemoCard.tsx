import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";

type Props = {
  text: string;
};

export default function MemoCard({ text }: Props) {
  const [open, setOpen] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Card
        elevation={2}
        sx={{
          mb: 2,
          borderRadius: 3,
        }}
      >
        <CardActionArea onClick={copy}>
          <CardContent>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.6,
                fontSize: 15,
                textAlign: "left",
              }}
            >
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        message="복사되었습니다."
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </>
  );
}
