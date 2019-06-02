import * as React from "react"
import { Link } from "react-router-dom"
import { me } from "../../initial-state"
import { PageLatest } from "./latest"
import { Alert } from "reactstrap"

export class PageIndex extends React.Component {
    render() {
        return <div>
            <title>Quesdon(toot.app)</title>
            <h1>Quesdon(toot.app)</h1>
            <p>ザ・インタビューズとかaskfmとかそんなかんじのやつのMastodonで使えるやつです。Misskeyにも勝手に対応。</p>
            <p>本家(quesdon.rinsuki.net)から質問を移行できる！</p>
            <details>
                <summary>
                    これはCutls Pによる運営です。開発者の運営ではありません。
                </summary>
                独自機能を除く開発者様へのお問い合わせは<a href="https://mstdn.rinsuki.net/@rinsuki" target="_blank">@rinsuki@mstdn.rinsuki.net</a>または
                <a href="https://mstdn.rinsuki.net/@quesdon" target="_blank">@quesdon@mstdn.rinsuki.net</a>までお願いします。
            </details>
            <Alert color="warning">
                <p className="bold">なかなかにヤバいです</p>
                運営費の捻出にご協力ください。<a href="kyash://qr/u/611373232688837504">Kyash</a>/<a href="https://www.pixiv.net/fanbox/creator/28105985" target="_blank">PixivFANBOX</a>
            </Alert>
            <p>{me ? <Link to="/my">マイページ</Link> : <Link to="/login">ログイン</Link>}</p>
            <PageLatest />
        </div>
    }
}
