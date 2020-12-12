# Firebase Cloud Messaging (FCM) の送信テスト

## 前提条件

- nodejsを利用
- yarnを利用

## はじめに

- 依存解決
```shell
$ yarn install
```

## 実行

実行する前に次の環境変数を設定する

- MY_FCM_TOKEN：メッセージを送信するデバイスのトークン
- MY_FCM_TOPIC：メッセージを送信するトピック
- GOOGLE_APPLICATION_CREDENTIALS：サービスアカウントのjsonへのパス

```shell
$ node index.js (option)
```

- option
    - sendToDevice (default) : MY_FCM_TOKENのデバイスへ個別メッセージ送信
    - subscribeTopic：MY_FCM_TOKENのデバイスをMY_FCM_TOPICのトピックへsubscribeする
    - unsubscribeTopic：MY_FCM_TOKENのデバイスをMY_FCM_TOPICのトピックからunsubscribeする
    - sendToTopic：MY_FCM_TOPICのトピックからunsubscribeする
    
例:
```shell
$ node index.js # 端末へ送信
$ node index.js sendToTopic # トピックへ送信
$ node index.js subscribeTopic # トピック購読
$ node index.js sendToTopic # トピックへ送信
$ node index.js unsubscribeTopic # トピックの購読やめる
```
