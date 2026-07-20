import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box
} from "@mui/material";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import { useState } from "react";

import { typeName } from "../data/TypeName";
import type { CheckItem } from "../data/CheckItem";


export default function Edit() {


    const location = useLocation();

    const navigate = useNavigate();



    const type =
        location.state?.type as keyof typeof typeName;



    const worker =
        location.state?.worker ?? "";



    const items =
        location.state?.items as CheckItem[] ?? [];





    const createReport = () => {


        let result = "";



        if(type === "Tech") {

            result =
                `${typeName[type]} 기술팀 ${worker || "미입력"} 님\n\n`;

        } else {

            result =
                `${typeName[type]} ${worker || "미입력"} 근무자\n\n`;

        }




        items.forEach(item=>{


            let time = "미점검";


            if(item.startTime){

                time =
                    item.endTime

                        ? `${item.startTime} ~ ${item.endTime}`

                        : item.startTime;

            }



            result +=
                `${item.name.padEnd(15," ")} ${time}\n`;

        });



        return result;

    };






    const [reportText,setReportText] =
        useState(createReport());






    const saveResult = ()=>{


        navigate("/result",{

            state:{

                type,

                worker,

                report:reportText

            }

        });


    };






    const title = typeName[type];







    return (

        <Container

            maxWidth="sm"

            sx={{

                mt:4,

                pb:5

            }}

        >



            {/* 점검 정보 */}

            <Card

                elevation={2}

                sx={{

                    borderRadius:4,

                    mb:3

                }}

            >

                <CardContent>

                    <Box

                        sx={{

                            display:"flex",

                            flexDirection:"column",

                            gap:1

                        }}

                    >

                        <Typography>

                            {/*{*/}
                            {/*    type === "Tech"*/}
                            {/*        ? `${typeName[type]} 기술팀 ${worker || "미입력"} 님`*/}
                            {/*        : `${typeName[type]} ${worker || "미입력"} 근무자`*/}
                            {/*}*/}
                            {title}

                        </Typography>
                    </Box>
                </CardContent>

            </Card>

            {/* 결과 수정 */}

            <Card

                elevation={2}

                sx={{

                    borderRadius:4

                }}

            >

                <CardContent>



                    <Typography

                        sx={{

                            fontWeight:700,

                            fontSize:"1.1rem",

                            mb:2

                        }}

                    >

                        ✏️ 점검 결과 수정

                    </Typography>





                    <TextField

                        multiline

                        minRows={15}

                        fullWidth

                        value={reportText}

                        onChange={(e)=>

                            setReportText(
                                e.target.value
                            )

                        }


                        sx={{

                            "& .MuiOutlinedInput-root":{

                                borderRadius:3,

                                backgroundColor:"#fafafa"

                            },


                            "& textarea":{

                                fontSize:"15px",

                                lineHeight:1.8

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

                    mt:3,

                    height:52,

                    borderRadius:3,

                    fontSize:"1rem",

                    fontWeight:700

                }}

            >

                확인

            </Button>




        </Container>

    );

}