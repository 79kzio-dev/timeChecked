import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MenuIcon from "@mui/icons-material/Menu";

import type { CheckItem } from "../data/CheckItem";

type Props = {
  id: string;
  item: CheckItem;
  onStart: () => void;
  onEnd: () => void;
};

export default function CheckCard({
                                    id,
                                    item,
                                    onStart,
                                    onEnd
                                  }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      elevation={2}
      sx={{
        mb: 2,
        borderRadius: 3
      }}
    >
      <CardContent
        sx={{
          py: 2,
          "&:last-child": {
            pb: 2
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          {/* 드래그 핸들 */}
          <Box
            {...attributes}
            {...listeners}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              cursor: "grab",
              color: "text.secondary",
              touchAction: "none",
              "&:active": {
                cursor: "grabbing"
              }
            }}
          >
            <MenuIcon />
          </Box>

          {/* 점검 위치 */}
          <Typography
            sx={{
              flex: 1,
              fontWeight: 700,
              fontSize: 17,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap", textAlign: "left"
            }}
          >
            {item.name}
          </Typography>

          {/* 시작 */}
          <Box
            sx={{
              width: 60,
              display: "flex",
              justifyContent: "center"
            }}
          >
            {item.startTime ? (
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: 16,
                  fontVariantNumeric: "tabular-nums"
                }}
              >
                {item.startTime}
              </Typography>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={onStart}
              >
                시작
              </Button>
            )}
          </Box>

          <Typography
            sx={{
              mx: 1,
              fontWeight: 700
            }}
          >
            ~
          </Typography>

          {/* 종료 */}
          <Box
            sx={{
              width: 60,
              display: "flex",
              justifyContent: "center"
            }}
          >
            {item.endTime ? (
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: 16,
                  fontVariantNumeric: "tabular-nums"
                }}
              >
                {item.endTime}
              </Typography>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={onEnd}
              >
                종료
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}