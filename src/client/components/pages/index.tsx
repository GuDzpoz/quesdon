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
            <p>本家(quesdon.rinsuki.net)から質問を移行できる！</p>
            <details>
                <summary>
                    質問にログインが要るようになりました。
                </summary>
                スパム排除のための処置です。ご理解お願い致します。
            </details>
            <details>
                <summary>
                    これはCutls Pによる運営です。開発者の運営ではありません。
                </summary>
                独自機能を除く開発者様へのお問い合わせは<a href="https://mstdn.rinsuki.net/@rinsuki">@rinsuki@mstdn.rinsuki.net</a>または<a href="https://mstdn.rinsuki.net/@quesdon">@quesdon@mstdn.rinsuki.net</a>までお願いします。
            </details>
            <details>
                <summary>
                Quesdon(toot.app)だけの限定機能が追加！
                </summary>
                <li>自分宛ての新しい質問ができると<a href="https://mstdn.jp/@qtnotf">@qtnotf@mstdn.jp</a>よりDMで通知されます。要らない場合はこのアカウントをミュートしてください。</li>
                <li>Misskeyでもログインできます。ログイン時に「Misskeyとしてログイン」にチェック！</li>
            </details>
            <details>
                <summary>
                他のQuesdonに未回答の質問が残っていますか？
                </summary>
                その他Quesdonから未回答の質問をインポートしてくることができます！まずは回答をエクスポート！<a href="https://toot.app/export/" target="_blank">エクスポートの方法</a>
            </details>
            <p>{me ? <Link to="/my">マイページ</Link> : <Link to="/login">ログイン</Link>}</p>
            <PageLatest />
        </div>
    }
}
