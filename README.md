# Discord Twitter Link Replacer

<p>
<a href="https://discord.com/api/oauth2/authorize?client_id=1163327448910401566&permissions=536882176&scope=bot"><img src="https://img.shields.io/badge/add%20your%20server-darkgreen?style=for-the-badge&logo=discord&logoColor=white">
<a href="https://discord.gg/XprScgmYna"><img src="https://img.shields.io/badge/join%20support%20server-blue?style=for-the-badge&logo=discord&logoColor=white">
<a href="https://discord.js.org"><img alt="Static Badge" src="https://img.shields.io/badge/discord.js-gray?style=for-the-badge&logo=node.js">
</p>

Twitter の URL (`twitter.com`, `x.com`) を[FixTweet](https://github.com/FixTweet/FixTweet)の URL (`fxtwitter.com`) に置き換える Bot です。

https://github.com/Assault1892/discord-replace-twitter-link/assets/34514603/bc8112f9-5e29-45ef-b0a3-3f812006d981

**2023/10/19 現在、スレッド内で URL の置き換えが動かない場合は Bot の再導入をお願いします。導入用 URL の権限設定ミスをしていました...。**

## つかいかた

ここから自分のサーバーに入れてください  
**Bot が見えないチャンネルでのメッセージは取得できません** 気を付けてね

また Bot の権限より上の権限で制御されているチャンネルなどでは動作しません  
お手数をおかけしますが Bot 専用の権限を割り当てるなどお願いします  
https://discord.com/api/oauth2/authorize?client_id=1163327448910401566&permissions=536882176&scope=bot

## セルフホストしたいんだけど

`Manage Webhooks`, `Read Messages/View Channels`, `Send Messages`, `Manage Messages` の権限が与えられないと動きません

1. `git clone` します
2. `npm i` します
3. `config.json.sample` を `config.json` にリネームします
4. `config.json` の中にある `token` に Bot の Token を入れます
5. `npm start` します
6. おわり

お好みで `pm2` とか使ってデーモン化してみてもいいとおもいます

### 更新したいんだけど

1. `git pull` します
2. `npm i` します
3. `npm start` します
4. おわり

## なんか壊れたんだけど助けて

なんかあったら**必ず Node.js と discord.js のバージョンを添えて**Issue 立てるか[私の Discord サーバー](https://discord.gg/XprScgmYna)に入って教えてください  
やる気がある時に直します

開発環境: Windows 10 22H2, Node.js 20.7.0, discord.js 14.13.0  
サーバー: Raspberry Pi 4, Ubuntu 22.04.3, Node.js 20.7.0
