import * as React from "react"
import { Link } from "react-router-dom"
import { APIUser } from "../../../../api-interfaces"
import { apiFetch } from "../../../api-fetch"
import { me } from "../../../initial-state"
import { Title } from "../../common/title"
import { QuestionRemaining } from "../../question-remaining"
import { ListGroup, ListGroupItem } from "reactstrap"

export class PageMyIndex extends React.Component {
    render() {
        if (!me) return null
        return <div>
            <Title>マイページ</Title>
            <h1>マイページ</h1>
            <p>こんにちは、{me.name}さん!</p>
            <ListGroup>
                <ListGroupItem className="justify-content-between"><Link to={`/@${me.acct}`}>あなたのプロフィール</Link></ListGroupItem>
                <ListGroupItem className="justify-content-between"><Link to="/my/questions">あなた宛ての質問<QuestionRemaining/></Link></ListGroupItem>
                <ListGroupItem className="justify-content-between"><Link to="/my/followers">Quesdonを利用しているフォロワー一覧</Link></ListGroupItem>
                <ListGroupItem className="justify-content-between"><Link to="/my/settings">設定</Link></ListGroupItem>
            </ListGroup>
            <ul>
                <li><a href="javascript://" onClick={this.logoutConfirm.bind(this)}>ログアウト</a></li>
            </ul>
        </div>
    }
    logoutConfirm() {
        if (!confirm("ログアウトしていい?")) return
        apiFetch("/api/web/logout")
            .then((r) => r.json())
            .then((r) => {
                location.pathname = "/"
            })
    }
}
