import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import type { CheckItem } from "../data/CheckItem";

type Props = {
  item: CheckItem;
  onStart: () => void;
  onEnd: () => void;
};

export default function CheckCard({
                                    item,
                                    onStart,
                                    onEnd
                                  }: Props) {
  return (
    <Card
      elevation={2}
      sx={{
        mb: 2,
        borderRadius: 3
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2
          }}
        >
          {/* 점검 위치 */}
          <Typography
            sx={{
              flex: 1,
              fontWeight: 700,
              fontSize: "1.05rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {item.name}
          </Typography>

          {/* 오른쪽 영역(항상 같은 폭) */}
          <Box
            sx={{
              width: 180,
              flexShrink: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1
            }}
          >
            {/* 아무것도 안 누름 */}
            {!item.startTime &&
              !item.endTime && (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: 60,
                      minWidth: 60
                    }}
                    onClick={onStart}
                  >
                    시작
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: 60,
                      minWidth: 60
                    }}
                    onClick={onEnd}
                  >
                    종료
                  </Button>
                </>
              )}

            {/* 시작만 */}
            {item.startTime &&
              !item.endTime && (
                <>
                  <Typography
                    sx={{
                      width: 110,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "primary.main",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {item.startTime} ~
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: 60,
                      minWidth: 60
                    }}
                    onClick={onEnd}
                  >
                    종료
                  </Button>
                </>
              )}

            {/* 종료만 */}
            {!item.startTime &&
              item.endTime && (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: 60,
                      minWidth: 60
                    }}
                    onClick={onStart}
                  >
                    시작
                  </Button>

                  <Typography
                    sx={{
                      width: 110,
                      textAlign: "left",
                      fontWeight: 700,
                      color: "primary.main",
                      whiteSpace: "nowrap"
                    }}
                  >
                    ~ {item.endTime}
                  </Typography>
                </>
              )}
            {/* 시작 + 종료 */}
            {item.startTime &&
              item.endTime && (
                <Typography
                  sx={{
                    width: 180,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "success.main",
                    whiteSpace: "nowrap"
                  }}
                >
                  {item.startTime} ~{" "}
                  {item.endTime}
                </Typography>
              )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}