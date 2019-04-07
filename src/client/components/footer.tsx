import * as React from "react"
import { Link } from "react-router-dom"
import { gitVersion, upstreamUrl, usingDarkTheme } from "../initial-state"

export class Footer extends React.Component {
    render() {
        return <footer className="container">
            <p>これはQuesdon(toot.app)であるため、他のQuesdon(quesdon.rinsuki.netなど)上の質問については表示されません。</p>
            <p>Quesdon は AGPL-3.0 で提供されています。<a target="_blank" href={upstreamUrl}>ソースコード</a>&nbsp;
            (<a target="_blank" href={`${upstreamUrl}/commits/${gitVersion}`}>{gitVersion.slice(0, 7)}</a>)</p>
            <p>公式アカウント: <a href="https://mstdn.rinsuki.net/@quesdon" target="_blank">@quesdon@mstdn.rinsuki.net</a>/開発者: <a href="https://mstdn.rinsuki.net/@rinsuki" target="_blank">@rinsuki@mstdn.rinsuki.net</a></p>
            <p>このサーバーは<a href="https://kirishima.cloud/@Cutls" target="_blank">Cutls P(@Cutls@kirishima.cloud)</a>が管理しています。(<a href="https://quesdon.toot.app/@Cutls@kirishima.cloud">運営に質問する</a>)</p>
            <p>
                {usingDarkTheme
                ?   <a href="#" onClick={this.leaveDarkTheme.bind(this)}>ダークテーマから戻す</a>
                :   <a href="#" onClick={this.enterDarkTheme.bind(this)}>ダークテーマにする(β)</a>
                }
            </p>
        </footer>
    }

    leaveDarkTheme() {
        localStorage.removeItem("using-dark-theme")
        location.reload()
    }

    enterDarkTheme() {
        localStorage.setItem("using-dark-theme", "1")
        location.reload()
    }
}
