import * as React from "react"
import { Button } from "reactstrap"
import { APIUser } from "../../../../api-interfaces"
import { apiFetch } from "../../../api-fetch"
import { Title } from "../../common/title"
import { UserLink } from "../../userLink"
import { me } from "../../../initial-state"

interface State {
    accounts: APIUser[]
    loading: boolean
}

export class PageMyAdmin extends React.Component<{}, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            accounts: [],
            loading: false,
        }
    }


    render() {
        return <div>
            <Title>Quesdonの管理</Title>
            <h1>Quesdonの管理</h1>
            {me.isAdmin ?
            <ul>
                {this.state.accounts.map((user) => <li><UserLink {...user} /><Button onClick={this.ban.bind(user.acct.toLowerCase())}>凍結する</Button></li>)}
            </ul>
             : "管理者権限がありません"}
            {this.state.loading ? "読み込み中" :  "完了"}
        </div>
    }
    componentDidMount() {
        if(!me.isAdmin){
            location.href="/my"
        }
    }
    async ban(user) {
        function errorMsg(code: number | string) {
            return "読み込みに失敗しました。再度お試しください (" + code + ")"
        }
        this.setState({loading: true})
        const req = await apiFetch("/api/web/accounts/ban", {
            method: "POST",
            body: user
        }).catch((e) => {
            alert(errorMsg(-1))
        })
        if (!req) return
        if (!req.ok) {
            alert(errorMsg("HTTP-" + req.status))
            return
        }

        const res = await req.json().catch((e) => {
            alert(errorMsg(-2))
            return
        })
        if (!res) return

        alert("凍結しました。")
        if (!res) return
        this.setState({
            accounts: this.state.accounts.concat(res),
            loading: false,
        })
    }
}
