import {Box, Container, Paper, Typography} from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import MenuCard from "../components/MenuCard";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            const date = now.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short"
            });

            const time = now.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });

            setCurrentTime(`${date} ${time}`);
        };

        updateTime();

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    const navigate = useNavigate();

    return (
        <Container
            maxWidth="sm"
            sx={{
                py: 3,
            }}
        >
            {/* Header */}
            <Paper
                elevation={0}
                onClick={() => navigate("/")}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 4,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <VerifiedUserIcon fontSize="medium"/>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        The Guardians 강남점
                        <br/> 시설물 점검 관리
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        mt: 1,
                        textAlign: "end",
                        opacity: 0.9,
                        fontSize: 15,
                    }}
                >
                    {currentTime}
                </Typography>
            </Paper>

            <MenuCard
                title="본관 종합점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Mb",
                        },
                    })
                }
            />
            <MenuCard
                title="신관 종합점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Nb",
                        },
                    })
                }
            />
            <MenuCard
                title="HOS 종합점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Hos",
                        },
                    })
                }
            />
            <MenuCard
                title="식품관 점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Food",
                        },
                    })
                }
            />
            <MenuCard
                title="스위트 파크 점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Sweet",
                        },
                    })
                }
            />
            <MenuCard
                title="외곽 및 점외 시설물 점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Out",
                        },
                    })
                }
            />
            <MenuCard
                title="기술 점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Tech",
                        },
                    })
                }
            />
            <MenuCard
                title="보조 배터리 점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Battery",
                        },
                    })
                }
            />
            <MenuCard
                title="누수 점검"
                onClick={() =>
                    navigate("/worker", {
                        state: {
                            type: "Water",
                        },
                    })
                }
            />
            <MenuCard title="메모G" onClick={() => navigate("/memo", {})}/>

            <Typography
                sx={{
                    mt: 4,
                    textAlign: "end",
                    color: "text.secondary",
                    fontSize: 14,
                }}
            >
                Developed by Kzio
            </Typography>
        </Container>
    );
}
