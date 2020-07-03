import * as React from "react"
import { Link } from "react-router-dom"
import { me } from "../../initial-state"
import { PageLatest } from "./latest"
import { Alert } from "reactstrap"

export class PageIndex extends React.Component {
    render() {
        return <div>
            <title>Quesdon(TheDesk)</title>
            <h1>Quesdon(TheDesk)</h1>
            <p>ザ・インタビューズとかaskfmとかそんなかんじのやつのMastodonで使えるやつです。Misskeyにも勝手に対応。</p>
            <details>
                <summary>
                    これはCutls Pによる運営です。開発者の運営ではありません。
                </summary>
                独自機能を除く開発者様へのお問い合わせは<a href="https://mstdn.rinsuki.net/@rinsuki" target="_blank">@rinsuki@mstdn.rinsuki.net</a>または
                <a href="https://mstdn.rinsuki.net/@quesdon" target="_blank">@quesdon@mstdn.rinsuki.net</a>までお願いします。
            </details>
            <p>{me ? <Link to="/my">マイページ</Link> : <Link to="/login">ログイン</Link>}</p>
            <PageLatest />
        </div>
    }
}
