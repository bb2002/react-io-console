import {useState} from "react";
import initializeFirebase, {fbStore} from "../libs/Firebase";
import {collection, getDocs} from "firebase/firestore";

export function useFirebaseLogin() {
    const [dbConnResult, setDBConnResult] = useState(0)

    const checkDatabaseConnect = () => {
        getDocs(collection(fbStore, `/default`)).then((snapshot) => {
            /**
             * Default 테이블의 문서 개수를 테스트로 카운트합니다.
             * 테이블의 docs 가 0 개인경우 오류가 발생하므로, 디비 설정을 꼭 확인하십시오.
             */
            if(snapshot.size === 0) {
                // 로그인 실패
                setDBConnResult(-1)
            } else {
                // 로그인 성공
                setDBConnResult(1)
            }
        }).catch(() => {
            setDBConnResult(-1)
        })
    }

    const firebaseLogin = (config, dbCheck = true) => {
        try {
            initializeFirebase(JSON.parse(config))      // Firebase 초기화 시도
            window.localStorage.setItem("config", config)
            if(dbCheck) {
                checkDatabaseConnect()                      // DB 연결 시도
            }
        } catch(ex) {
            throw Error("Firebase initialize failed.")
        }
    }

    const getConfigFromStorage = () => {
        return window.localStorage.getItem("config")
    }

    return {
        firebaseLogin,
        checkDatabaseConnect,
        getConfigFromStorage,
        dbConnResult
    }
}