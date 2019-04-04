import * as React from "react"
import { Link } from "react-router-dom"
import { me } from "../../initial-state"
import { PageLatest } from "./latest"

export class PageIndex extends React.Component {
    render() {
        return <div>
            <title>Quesdon(toot.app)</title>
            <h1>Quesdon(toot.app)</h1>
            <p>ザ・インタビューズとかaskfmとかそんなかんじのやつのMastodonで使えるやつです。Misskeyにも勝手に対応。</p>
            <p>本家(quesdon.rinsuki.net)が終わってもここはしばらく終わりません。</p>
            <details>
                <summary>
                    これはCutls Pによる運営です。開発者の運営ではありません。
                </summary>
                開発者様へのお問い合わせは<a href="https://mstdn.rinsuki.net/@rinsuki">@rinsuki@mstdn.rinsuki.net</a>または<a href="https://mstdn.rinsuki.net/@quesdon">@quesdon@mstdn.rinsuki.net</a>までお願いします。
            </details>
            <details>
                <summary>
                Quesdon(toot.app)だけの限定機能が追加！
                </summary>
                <p>自分宛ての新しい質問ができると<a href="https://mstdn.jp/@qtnotf">@qtnotf@mstdn.jp</a>よりDMで通知されます。要らない場合はこのアカウントをミュートしてください。</p>
                <p>Misskeyでもログインできます。ログイン時に「Misskeyとしてログイン」にチェック！</p>
            </details>
            <p>{me ? <Link to="/my">マイページ</Link> : <Link to="/login">ログイン</Link>}</p>
            <PageLatest />
        </div>
    }
}
