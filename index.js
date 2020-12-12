const firebaseAdminSdk = require("firebase-admin")

const firebaseAdminApp = firebaseAdminSdk.initializeApp()

const token = process.env.MY_FCM_TOKEN;
if (!token) {
  console.error("please set environment 'MY_FCM_TOKEN'")
  process.exit(1)
}

const topic = process.env.MY_FCM_TOPIC;
if (!topic) {
  console.error("please set environment 'MY_FCM_TOPIC'")
  process.exit(1)
}

console.log(firebaseAdminApp.name)

const sendToDevice = async () => {
  return firebaseAdminApp.messaging().send({
    notification: {
      title: "通知のテスト:" + new Date().toISOString(),
      body: "通知のテストの本文"
    },
    token
  })
}

const subscribeTopic = async () => {
  return firebaseAdminApp.messaging().subscribeToTopic(token, topic)
}

const unsubscribeTopic = async () => {
  return firebaseAdminApp.messaging().unsubscribeFromTopic(token, topic)
}

const sendToTopic = async () => {
  return firebaseAdminApp.messaging().sendToTopic(topic, {
    notification: {
      title: "Topicsへの通知テスト:" + new Date().toISOString(),
      body: "Topicsへの通知テストボディー"
    }
  })
}

const fcmTestFunctions = {
  sendToDevice,
  subscribeTopic,
  unsubscribeTopic,
  sendToTopic
}

const specifiedMode = process.argv[2];
const mode = specifiedMode && fcmTestFunctions[specifiedMode] ? specifiedMode : "sendToDevice"
const execFunction = fcmTestFunctions[mode];

console.log("mode = ", mode);

(async function () {
  try {
    const res = await execFunction()
    console.log("get res", res)
  } catch (e) {
    console.error("error occur", e);
  }
})().then(() => {
  process.exit(0)
}).catch(() => {
  process.exit(1)
})
