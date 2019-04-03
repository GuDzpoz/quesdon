import * as React from "react"
import { Link } from "react-router-dom"
import { me } from "../../initial-state"
import { PageLatest } from "./latest"

export class PageIndex extends React.Component {
    render() {
        return <div>
            <title>Quesdon</title>
            <h1>Quesdon</h1>
            <p>ザ・インタビューズとかaskfmとかそんなかんじのやつのMastodonアカウントで使えるやつです</p>
            <details open>
                <summary>
                    これはCutls Pによる運営です。開発者の運営ではありません。
                </summary>
                開発者へのお問い合わせは<a href="https://mstdn.rinsuki.net/@rinsuki">@rinsuki@mstdn.rinsuki.net</a>まで。
            </details>
            <p>{me ? <Link to="/my">マイページ</Link> : <Link to="/login">ログイン</Link>}</p>
            <PageLatest />
        </div>
    }
}
