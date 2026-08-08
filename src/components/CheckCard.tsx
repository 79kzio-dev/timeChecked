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

export default function CheckCard({ id, item, onStart, onEnd }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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
            justifyContent: "space-between",
            gap: 2
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
              //width는 사이즈 변경
              width: 15,
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
              whiteSpace: "nowrap",
              textAlign: "left"
            }}
          >
            {item.name}
          </Typography>

          {/* 오른쪽 영역(Grid 고정) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "60px 16px 60px",
              alignItems: "center",
              justifyContent: "end",
              columnGap: 1,
              flexShrink: 0
            }}
          >
            {/* 시작 */}
            <Box
              sx={{
                width: 52,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {item.startTime ? (
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "primary.main",
                    whiteSpace: "nowrap",
                    fontSize: 17,
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
                  sx={{
                    width: "100%",
                    height: "100%",
                    minWidth: 0,
                    fontSize: 12
                  }}
                >
                  시작
                </Button>
              )}
            </Box>

            {/* ~ */}
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: 15
              }}
            >
              ~
            </Typography>

            {/* 종료 */}
            <Box
              sx={{
                width: 52,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {item.endTime ? (
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "primary.main",
                    whiteSpace: "nowrap",
                    fontSize: 17,
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
                  sx={{
                    width: "100%",
                    height: "100%",
                    minWidth: 0,
                    fontSize: 12
                  }}
                >
                  종료
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}