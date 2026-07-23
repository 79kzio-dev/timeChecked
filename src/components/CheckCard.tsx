import {
  Card,
  CardActionArea,
  Typography,
  Box
} from "@mui/material";

import type { CheckItem } from "../data/CheckItem.ts";

interface Props {
  item: CheckItem;
  onClick: () => void;
}

export default function CheckCard({
                                    item,
                                    onClick
                                  }: Props) {

  let text = "미점검";
  let color: string = "#757575";

  if (item.startTime && !item.endTime) {
    text = item.startTime;
    color = "#1565C0";
  }

  if (item.startTime && item.endTime) {
    text = `${item.startTime} ~ ${item.endTime}`;
    color = "#2E7D32";
  }

  return (

    <Card
      elevation={2}
      sx={{
        mb: 2,
        borderRadius: 3
      }}
    >

      <CardActionArea
        onClick={onClick}
        disabled={item.endTime !== ""}
        sx={{
          p: 2
        }}
      >


        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2
          }}
        >

          {/*점검 위치 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              flex: 1,
              textAlign: "left",
              fontSize: {
                xs: "1rem",
                sm: "1.1rem"
              },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"

            }}
          >
            {item.name}
          </Typography>

          <Typography
            sx={{
              color,
              fontWeight: 600
            }}
          >
            {text}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}