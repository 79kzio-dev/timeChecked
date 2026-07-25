import {useState} from "react";
import {
    Alert,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";

import type {FieldKey, MemoItem} from "../data/MemoData";

type Props = {
    item: MemoItem;
};

export default function MemoCard({item}: Props) {
    const [inputOpen, setInputOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    const [step, setStep] = useState(0);

    const defaultValues: Record<FieldKey, string> = {
        location: "",
        store: "",
        company: "",
        worker: "",
        count: "",
    };

    const [values, setValues] = useState(defaultValues);

    const [previewText, setPreviewText] = useState("");

    const fields = item.fields ?? [];

    const displayText =
        fields.length === 0
            ? item.text
            : fields.reduce((text, field) => {
                return text.replaceAll(`{${field.key}}`, `(${field.label})`);
            }, item.text);


    const reset = () => {
        setStep(0);
        setValues(defaultValues);
    };

    const handleCardClick = async () => {
        if (fields.length === 0) {
            try {
                await navigator.clipboard.writeText(item.text);
                setSnackOpen(true);
            } catch (e) {
                console.error(e);
            }
            return;
        }

        reset();
        setInputOpen(true);
    };

    const handleNext = () => {
        if (step < fields.length - 1) {
            setStep(step + 1);
            return;
        }

        let result = item.text;

        Object.entries(values).forEach(([key, value]) => {
            result = result.replaceAll(`{${key}}`, value);
        });

        setPreviewText(result);

        setInputOpen(false);
        setPreviewOpen(true);
    };

    const handleBack = () => {
        if (step === 0) {
            setInputOpen(false);
            return;
        }

        setStep(step - 1);
    };

    const currentField = fields[step];

    return (
        <>
            <Card
                elevation={2}
                sx={{
                    mb: 2,
                    borderRadius: 3,
                }}
            >
                <CardActionArea onClick={handleCardClick}>
                    <CardContent>
                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                                lineHeight: 1.6,
                                fontSize: 15,
                            }}
                        >
                            {displayText}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* 입력 Dialog */}
            <Dialog
                open={inputOpen}
                onClose={() => setInputOpen(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    {item.title
                        ? `${item.title} 입력`
                        : `${currentField?.label ?? ""} 입력`}
                </DialogTitle>

                <DialogContent>
                    {currentField && (
                        <TextField
                            fullWidth
                            autoFocus
                            label={currentField.label}
                            value={values[currentField.key]}
                            onChange={(e) =>
                                setValues((prev) => ({
                                    ...prev,
                                    [currentField.key]: e.target.value,
                                }))
                            }
                            slotProps={{
                                input: {
                                    endAdornment: currentField.suffix ? (
                                        <InputAdornment position="end">
                                            {currentField.suffix}
                                        </InputAdornment>
                                    ) : undefined,
                                },
                            }}
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleBack}>{step === 0 ? "취소" : "이전"}</Button>

                    <Button variant="contained" onClick={handleNext}>
                        {step === fields.length - 1 ? "확인" : "다음"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 미리보기 */}
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>미리보기</DialogTitle>

                <DialogContent>
                    <Typography
                        sx={{
                            whiteSpace: "pre-line",
                            lineHeight: 1.8,
                            fontSize: 15,
                        }}
                    >
                        {previewText}
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={async () => {
                            try {
                                await navigator.clipboard.writeText(previewText);
                                setSnackOpen(true);
                                setPreviewOpen(false);
                                reset();
                            } catch (e) {
                                console.error(e);
                            }
                        }}
                    >
                        복사
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackOpen}
                autoHideDuration={1500}
                onClose={() => setSnackOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{
                        width: "100%",
                    }}
                >
                    복사되었습니다.
                </Alert>
            </Snackbar>
        </>
    );
}