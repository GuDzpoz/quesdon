# quesdon

ザ・インタビューズとかaskfmとかそういうののMastodon版

LICENSE: [AGPL 3.0](LICENSE)

## 魔改造アリ

Cutlsが勝手にいじったもの[Quesdon(toot.app)](https://quesdon.toot.app)

* DMで質問の通知が来ます。`TOOT_ORIGIN`にインスタンス名を、`TOOT_TOKEN`にアクセストークンを渡して起動します。オプトアウト方法等はありません(アカウントをミュートしたら終わり)。
* Misskeyでログインできます。投稿もOK。
* 未回答の質問をインポートできます。(ブックマークレットと合わせて公開)
* 質問未回答の状態で通報することができます。通報された質問は論理的に削除され管理者のみに表示されます。
* 各ユーザーページに「通報」ボタンが表示されます(ユーザーベースの通報)。これは管理者へ非匿名質問という扱いです。
* `ADMIN`に小文字にしたacct(cutls@cutls.comなど)を指定してAdminを指定。
  + Adminはユーザーページに「Admin(凍結権限所持)」と表示されます。
  + Adminはユーザーページに「通報時の注意」が表示されます。
  + Adminはユーザーを凍結することができます。(WebUIあり)
  + Adminは回答をNSFWに設定することができます。(WebUIあり)  
NSFWにしたとき、Adminはそのユーザーに警告DMを送るかどうかを選択できます。
  + Adminは通報された回答の一覧を見ることができます。
  + Adminは通報の通知を受け取ることができます。
  + Adminは全ユーザーを一覧にして見ることができます、

つまり、DMで通知して「管理者」が新設されたということです。

## how to run

required: latest version Node.js, MongoDB

```sh
yarn install
yarn build
MONGODB_URL=mongodb://localhost/quesdon BACK_PORT=3000 yarn start
```

## 開発のしかた

### 開発環境を立てる

`cp .env.development .env`したあと`yarn dev`とするといろいろwatchしながら動くやつが立ち上がるのであとは <http://localhost:8080> を開くだけ

### ファイル構造

言わなくても見ればわかると思いますが念のため

- `src/`: ソース一式
    - `server/`: サーバーサイドのソース
        - `api/`: APIまわりが入ってるやつ
        - `db/`: データベースのModel
        - `utils/`: あちこちで使うやつ
    - `client/`: クライアントのソース
- `views/`: サーバーサイドが見るテンプレート(pugで書かれている)
