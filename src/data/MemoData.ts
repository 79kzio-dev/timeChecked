export type FieldKey = "location" | "store" | "company" | "worker" | "count";

export interface MemoField {
  key: FieldKey;
  label: string;
  suffix?: string;
}

export interface MemoItem {
  text: string;
  title?: string;
  fields?: MemoField[];
}

export const memoData: MemoItem[] = [
  {
    text: "11층 EV 123호기 T345호기 제어 완료했습니다. 기술팀 {worker}님입니다.",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "11층 EV T1~T5호기 매장층 제어 완료했습니다.. 기술팀 {worker}님입니다.",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "11층 EV T12호기 11층 제어 완료했습니다. 기술팀 {worker}님입니다.",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "11층 식당가 점검 특이사항 없습니다."
  },
  {
    text: "11층 식당가 화니, 일포노, 히바린 보조 배터리 점검 특이사항 없습니다. (종합 점검시 보조 배터리 타이머 확인 해주세요)"
  },
  {
    text: "12,13,18호기 파킹제어 완료했습니다. 기술팀 {worker}님 입니다.",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "12,13,18호기 파킹제어 해제 완료했습니다. 기술팀 {worker}님 입니다.",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "호남선 ES 운행 정지하여 POP설치 완료했습니다. 기술팀 {worker}님 입니다",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "호남선 ES 가동하여 POP회수 완료했습니다. 기술팀 {worker}님 입니다.",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "T5호기 파킹제어 완료 했습니다. 기술팀 {worker}님 입니다.",
    title: "기술팀",
    fields: [
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "{store} {worker}님 최종퇴근으로 스위트 파크 1번 셔터 시건했습니다.",
    title: "근무자",
    fields: [
      {
        key: "store",
        label: "매장"
      },
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "{store} {worker}님 첫 출근으로 스위트 파크 1번 셔터 개방했습니다.",
    title: "근무자",
    fields: [
      {
        key: "store",
        label: "매장"
      },
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "검품장 외곽 적재현황 및 신분증 실사,표찰 특이사항 없습니다"
  },
  {
    text: "6게이트 발렛키 {count}개 인계받았습니다. 주차팀 {worker}님 입니다.",
    title: "주차팀",
    fields: [
      {
        key: "count",
        label: "수량",
        suffix: "개"
      },
      {
        key: "worker",
        label: "OOO"
      }
    ]
  },
  {
    text: "1층 T7, T8호기 오픈스테이지 및 홀 점검 특이사항 없습니다."
  },

  {
    text: "오픈스테이지 점검 및 1층 T7,8호기 홀 점검 특이사항 업습니다."
  },

  {
    text: "{location}층 {store} {company} 화기작업 시작사인 완료 및 안전점검 특이사항 없습니다.",
    fields: [
      {
        key: "location",
        label: "위치",
        suffix: "층"
      },
      {
        key: "store",
        label: "매장"
      },
      {
        key: "company",
        label: "업체"
      }
    ]
  },

  {
    text: "{location}층 {store} {company} 화기작업 연장사인 완료 및 안전점검 특이사항 없습니다.",
    fields: [
      {
        key: "location",
        label: "위치",
        suffix: "층"
      },
      {
        key: "store",
        label: "매장"
      },
      {
        key: "company",
        label: "업체"
      }
    ]
  },

  {
    text: "{location}층 {store} {company} 화기작업 종료사인 완료했습니다.",
    fields: [
      {
        key: "location",
        label: "위치",
        suffix: "층"
      },
      {
        key: "store",
        label: "매장"
      },
      {
        key: "company",
        label: "업체"
      }
    ]
  },

  {
    text: "신본관 {location}층 \n본관 {location}층 \n\n신관 {location}층\n\n외 점검 특이사항 업습니다.",
    fields: [
      {
        key: "location",
        label: "위치",
        suffix: "층"
      }
    ]
  }
];

