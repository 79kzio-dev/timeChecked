// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   TextField,
//   Typography
// } from "@mui/material";
//
// import { useLocation, useNavigate } from "react-router-dom";
//
// import { useState } from "react";
//
// import { typeName } from "../data/TypeName";
// import type { CheckItem } from "../data/CheckItem";
//
//
// export default function Edit() {
//
//
//   const location = useLocation();
//
//   const navigate = useNavigate();
//
//
//   const type =
//     location.state?.type as keyof typeof typeName;
//
//
//   const worker =
//     location.state?.worker ?? "";
//
//
//   const items =
//     location.state?.items as CheckItem[] ?? [];
//
//
//   const createReport = () => {
//
//     let result = "";
//     if (type === "Tech") {
//       result =
//         `${typeName[type]} 기술팀 ${worker || "미입력"} 님\n\n`;
//     } else {
//       result =
//         `${typeName[type]} ${worker || "미입력"} 근무자\n\n`;
//     }
//
//
//     items.forEach(item => {
//
//       let time = "미점검";
//       if (item.startTime) {
//         time =
//           item.endTime
//             ? `${item.startTime} ~ ${item.endTime}`
//             : item.startTime;
//       }
//       result +=
//         `${item.name.padEnd(15, " ")} ${time}\n`;
//     });
//
//     return result;
//
//   };
//
//
//   const [reportText, setReportText] =
//     useState(createReport());
//
//   const [open, setOpen] = useState(false);
//
//   const [snackOpen, setSnackOpen] = useState(false);
//
//   const saveResult = () => {
//     setOpen(true);
//   };
//   const copyResult = async () => {
//     setOpen(false);
//
//     try {
//       await navigator.clipboard.writeText(reportText);
//
//       setSnackOpen(true);
//
//       setTimeout(() => {
//
//         navigate("/");
//       }, 1000);
//     } catch {
//       alert("복사에 실패했습니다.");
//     }
//   };
//
//   const title = typeName[type];
//
//
//   //여기부터 화면
//   return (
//     <Container
//       maxWidth="sm"
//
//       sx={{
//         mt: 4,
//         pb: 5
//       }}
//     >
//       {/* 점검 정보 */}
//
//       <Card
//         elevation={2}
//
//         sx={{
//           borderRadius: 4,
//           mb: 3
//         }}
//       >
//         <CardContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 1
//             }}
//           >
//             <Typography>
//               {/*{*/}
//               {/*    type === "Tech"*/}
//               {/*        ? `${typeName[type]} 기술팀 ${worker || "미입력"} 님`*/}
//               {/*        : `${typeName[type]} ${worker || "미입력"} 근무자`*/}
//               {/*}*/}
//               {title}
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>
//
//       {/* 결과 수정 */}
//
//       <Card
//         elevation={2}
//
//         sx={{
//           borderRadius: 4
//         }}
//       >
//         <CardContent>
//           <Typography
//             sx={{
//               fontWeight: 700,
//               fontSize: "1.1rem",
//               mb: 2
//             }}
//           >
//             ✏️ 점검 결과 수정
//           </Typography>
//
//           <TextField
//             multiline
//             minRows={15}
//             fullWidth
//             value={reportText}
//             onChange={(e) => setReportText(e.target.value)}
//
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 3,
//                 backgroundColor: "#fafafa"
//               },
//
//               "& textarea": {
//                 fontSize: "15px",
//                 lineHeight: 1.8
//               }
//             }}
//           />
//         </CardContent>
//       </Card>
//
//       <Button
//         fullWidth
//         variant="contained"
//         onClick={saveResult}
//
//         sx={{
//           mt: 3,
//           height: 52,
//           borderRadius: 3,
//           fontSize: "1rem",
//           fontWeight: 700
//         }}
//       >
//         확인
//       </Button>
//
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>결과 복사</DialogTitle>
//
//         <DialogContent>
//           <DialogContentText>점검 결과를 복사하시겠습니까?</DialogContentText>
//         </DialogContent>
//
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>아니오</Button>
//
//           <Button variant="contained" onClick={copyResult}>
//             예
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackOpen}
//         autoHideDuration={1000}
//         onClose={() => setSnackOpen(false)}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center"
//         }}
//       >
//         <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
//           점검 결과가 복사되었습니다.
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
//
// }

import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { typeName } from "../data/TypeName";
import type { CheckItem } from "../data/CheckItem";

export default function Edit() {
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.state?.type as keyof typeof typeName;

  const worker = location.state?.worker ?? "";

  const items = (location.state?.items as CheckItem[]) ?? [];

  // localStorage Key
  const storageKey = `check_${type}_${worker}`;

  const createReport = () => {
    let result = "";

    if (type === "Tech") {
      result = `${typeName[type]} 기술팀 ${worker || "미입력"} 님\n\n`;
    } else {
      result = `${typeName[type]} ${worker || "미입력"} 근무자\n\n`;
    }

    items.forEach((item) => {
      const time =
        item.startTime && item.endTime
          ? `${item.startTime} ~ ${item.endTime}`
          : item.startTime
            ? `${item.startTime} ~ (미점검)`
            : item.endTime
              ? `(미점검) ~ ${item.endTime}`
              : "(미점검)";

      result += `${item.name.padEnd(15, " ")} ${time}\n`;
    });

    return result;
  };

  const [reportText, setReportText] = useState(createReport());

  const [open, setOpen] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);

  const saveResult = () => {
    setOpen(true);
  };

  const copyResult = async () => {
    setOpen(false);

    try {
      // 클립보드 복사
      await navigator.clipboard.writeText(reportText);

      // 현재 점검 데이터 삭제
      localStorage.removeItem(storageKey);

      // 복사 완료 Snackbar
      setSnackOpen(true);

      // 1초 후 홈으로 이동
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("복사에 실패했습니다.");
    }
  };

  const title = typeName[type];

  // 여기부터 화면
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        pb: 5
      }}
    >
      {/* 점검 정보 */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
          mb: 3
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              textAlign: "center"
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>

      {/* 결과 수정 */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              mb: 2
            }}
          >
            ✏️ 점검 결과 수정
          </Typography>

          <TextField
            multiline
            minRows={15}
            fullWidth
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "background.paper"
              },

              "& .MuiInputBase-input": {
                color: "text.primary",
                fontSize: 15,
                lineHeight: 1.8
              }
            }}
          />
        </CardContent>
      </Card>

      <Button
        fullWidth
        variant="contained"
        onClick={saveResult}
        sx={{
          mt: 3,
          height: 52,
          borderRadius: 3,
          fontSize: "1rem",
          fontWeight: 700
        }}
      >
        확인
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>결과 복사</DialogTitle>

        <DialogContent>
          <DialogContentText>점검 결과를 복사하시겠습니까?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>아니오</Button>

          <Button variant="contained" onClick={copyResult}>
            예
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          점검 결과가 복사되었습니다.
        </Alert>
      </Snackbar>
    </Container>
  );
}