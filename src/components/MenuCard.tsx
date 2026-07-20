import {
    Card,
    CardActionArea,
    Typography,
    Box
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
    title: string;
    onClick: () => void;
}

export default function MenuCard({
                                     title,
                                     onClick
                                 }: Props) {

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 4,
                mb: 2,
                transition: "0.2s",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 6
                }
            }}
        >

            <CardActionArea
                onClick={onClick}
                sx={{
                    p: 2.2
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 600
                        }}
                    >
                        {title}
                    </Typography>

                    <ChevronRightIcon
                        color="action"
                    />

                </Box>

            </CardActionArea>

        </Card>

    );
}