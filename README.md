# discord-replace-twitter-link

<p>
<a href="https://discord.com/api/oauth2/authorize?client_id=1163327448910401566&permissions=536880128&scope=bot"><img src="https://img.shields.io/badge/add%20your%20server-darkgreen?style=for-the-badge&logo=discord&logoColor=white">
<a href="https://discord.gg/XprScgmYna"><img src="https://img.shields.io/badge/join%20support%20server-blue?style=for-the-badge&logo=discord&logoColor=white">
<a href="https://discord.js.org"><img alt="Static Badge" src="https://img.shields.io/badge/discord.js-gray?style=for-the-badge&logo=node.js">
</p>

Twitter の URL (`twitter.com`, `x.com`) を[FixTweet](https://github.com/FixTweet/FixTweet)の URL (`fxtwitter.com`) に置き換える Bot です。

![Preview](https://github.com/Assault1892/discord-replace-twitter-link/assets/34514603/7afdd4cb-0d23-4f29-947f-043448c39f2f)

## つかいかた

ここから自分のサーバーに入れてください  
**Bot が見えないチャンネルでのメッセージは取得できません** 気を付けてね  
https://discord.com/api/oauth2/authorize?client_id=1163327448910401566&permissions=536880128&scope=bot

## セルフホストしたいんだけど

1. `git clone` します
2. `npm i` します
3. `config.json.samples` を `config.json` にリネームします
4. `config.json` の中にある `token` に Bot の Token を入れます
5. `pm2 start index.js` します
6. おわり

### 更新したいんだけど

1. `pm2 stop 0` します (もしかしたら番号ちがうかも `pm2 ps` して確認してね)
2. `git pull` します
3. `npm i` します
4. `pm2 start 0` します (番号ちがうかも 同上)
5. おわり

## なんか壊れたんだけど助けて

なんかあったら**必ず Node.js と discord.js のバージョンを添えて**Issue 立てるか[私の Discord サーバー](https://discord.gg/XprScgmYna)に入って教えてください  
やる気がある時に直します

開発環境: Windows 10 22H2, Node.js 20.7.0, discord.js 14.13.0  
サーバー: Raspberry Pi 4, Ubuntu 22.04.3, Node.js 20.7.0
