import * as React from "react"
import { Button } from "reactstrap"
import { APIQuestion } from "../../../../api-interfaces"
import { apiFetch } from "../../../api-fetch"
import { Title } from "../../common/title"
import { Question } from "../../question"
import { me } from "../../../initial-state"

interface State {
    questions: APIQuestion[]
    loading: boolean,
}

export class PageMyReported extends React.Component<{}, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            questions: [],
            loading: false,
        }
    }
    render() {
        return <div>
            <Title>Quesdon 通報された質問</Title>
            <h1>Quesdon 通報された質問</h1>
            {this.checkAdmin() ? "" :  "管理者権限が必要です"}
            {this.state.questions.map((q) => <Question {...q} key={q._id}/>)}
            {this.state.loading ? "読み込み中" :  "完了"}
        </div>
    }
    componentDidMount() {
        if(!me){return false}
        if(!me.isAdmin){
            location.href="/my"
        }
        this.readIndex()
    }
    checkAdmin() {
        if(!me){return false}
        if(!me.isAdmin){
            return false;
        }
        return true;
    }
    async readIndex() {
        function errorMsg(code: number | string) {
            return "読み込みに失敗しました。再度お試しください (" + code + ")"
        }
        this.setState({loading: true})
        const req = await apiFetch("/api/web/questions/get_reported")
            .catch((e) => {
                alert(errorMsg(-1))
                this.setState({
                    loading: false,
                })
            })
        if (!req) return
        if (!req.ok) {
            alert(errorMsg("HTTP-" + req.status))
            this.setState({
                loading: false,
            })
            return
        }
        const res = await req.json().catch((e) => {
            alert(errorMsg(-2))
            this.setState({
                loading: false,
            })
        })
        if (!res) return
        this.setState({
            questions: this.state.questions.concat(res),
            loading: false,
        })
    }
}
