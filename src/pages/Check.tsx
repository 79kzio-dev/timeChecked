import { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Button
} from "@mui/material";

import { useLocation } from "react-router-dom";

import { checkData } from "../data/CheckData";
import { typeName } from "../data/TypeName";
import CheckCard from "../components/CheckCard";
import { useNavigate } from "react-router-dom";


const now = () => {

    const d = new Date();

    return d.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

};

export default function Check() {


    const location = useLocation();

    const navigate = useNavigate();


    // Home / Worker에서 전달받은 값
    const type =
        location.state?.type as keyof typeof checkData
        ?? "Mb";


    const worker =
        location.state?.worker
        ?? "";

    // 점검 데이터 생성
    const [items, setItems] = useState(

        checkData[type].map(item => ({
            ...item
        }))

    );




    const clickItem = (index:number) => {


        setItems(prev =>

            prev.map((item,i)=>{


                if(i !== index)
                    return item;



                // 첫 클릭 : 시작시간
                if(!item.startTime){

                    return {
                        ...item,
                        startTime: now()
                    };

                }



                // 두 번째 클릭 : 종료시간
                if(!item.endTime){

                    return {
                        ...item,
                        endTime: now()
                    };

                }



                return item;


            })

        );


    };




    return (

        <Container

            maxWidth="sm"

            sx={{
                mt:4,
                pb:3
            }}

        >


            {/* 상단 점검 정보 */}

            <Box

                sx={{

                    mb:3,

                    p:2.5,

                    borderRadius:3,

                    bgcolor:"primary.main",

                    color:"primary.contrastText"

                }}

            >

                <Typography

                    sx={{
                        fontWeight:700,
                        fontSize:"1.1rem"
                    }}

                >

                    {
                        type === "Tech"
                            ? `${typeName[type]} 기술팀 ${worker || "미입력"} 님`
                            : `${typeName[type]} ${worker || "미입력"} 근무자`
                    }

                </Typography>

            </Box>





            {/* 점검 리스트 */}

            {
                items.map((item,index)=>(

                    <CheckCard

                        key={index}

                        item={item}

                        onClick={() =>
                            clickItem(index)
                        }

                    />

                ))
            }

            <Box
                sx={{
                    mt:4,
                    display:"flex",
                    gap:2
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        height:52,
                        borderRadius:3
                    }}

                    onClick={() =>
                        navigate("/edit", {
                            state: {
                                type,
                                worker,
                                items
                            }
                        })
                    }
                >
                    확인
                </Button>
            </Box>
        </Container>

    );

}