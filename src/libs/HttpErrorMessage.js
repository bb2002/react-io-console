import {message} from "antd";

export function httpMessageExecute(code,
                          h200 = "성공했습니다.",
                          hReqErr = "연결 요청을 보낼 수 없습니다.",
                          h500 = "내부 서버 오류가 발생했습니다.",
                          h404 = "404 오류가 발생했습니다.",
                          h401 = "잘못된 인증 정보입니다."
) {
    switch(code) {
        case 200:
            message.success(h200)
            break;
        case -1:
            message.error(hReqErr)
            break;
        case 500:
            message.error(h500)
            break;
        case 404:
            message.success(h404)
            break;
        case 401:
            message.success(h401)
            break;
        case 0:
            break;
        default:
            message.error("알 수 없는 오류가 발생했습니다.")
    }
}