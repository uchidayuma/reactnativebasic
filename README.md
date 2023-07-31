# reactnativebasic
このブランチは「ReactNativeとSQLiteで作るTapDiaryクローン」のソースコードです。

iOS, Androidストアでリリースしている「TapDiary」初期Verのクローンを開発しながらReactNativeを学んでいただくコースです。

[打田のメモはこちらから](https://uchidalink.notion.site/ReactNativeBasic-70c5065ebc2d4237980fe568fc792065)

## ブランチ対応表
各レクチャーごとにブランチを切っているため、適宜ブランチを切り替えながら確認したいソースコードを御覧ください。

| レクチャー名        |  ブランチ名  |
|--------------|-----------|
| 完成版 | basic-master |
| SQLiteのインストール | installexposqlite  |
| SQLiteでサンプルSQLを流す | sqlitesample  |
| 【Section】日記作成機能の開発 |  |
| diariesテーブルの作成 | create-diaries-table |
| firebaseの準備 | firebase-init |
| firebaseから絵文字を取得 | get-emoji |
| 絵文字を表示 | render-emoji |
| 日記本文入力フォームを作成する | input-button-form |
| 日記本文を記入できるようにする | body-usestate |
| 絵文字をタップした際の動きを作る | emojitap |
| テンプレートをタップした際の動きを作る | template-tap |
| インサート文の解説 | insert-sqlite |
| SQLiteに日記内容を保存する | save-diary |
| 【Section】タブメニューを改良 |  |
| タブの名前とアイコンを変更 | bottom-navigation |
| 共通ヘッダーの開発 | share-header |
| 【Section】HOME画面の開発 |  |
| Viewで枠組みを作る | home-init |
| useEffectで日記一覧を取得 | get-diaries |
| 日記一覧を表示 | home-render-diaries |
| 日記作成画面に移動するボタンを設置 | navigate-create |
| 日記作成が完了したらホーム画面に戻す | return-home |
| 引っ張って更新を実装 | pull-refresh |
| 時刻関係の機能を実装 | home-dayjs |
| Webviewを実装 | home-webview |
| 【Section】ダークモードに対応したCSSの仕組みを作ろう |  |
| カラー定義を変更 | constants-color |
| Appbarのカラーを変更 | appbar-color |
| 共通CSSの作成 | global-css |
| 【Section】Home画面のレイアウトを整えよう |  |
| AIに背景イメージを作ってもらう | image-bg |
| Welcomeパネルを整える | welcome-panel |
| 日記一覧を整える | diaries-css |
| Tipsを整える | tips-css |
| 【Section】Create画面のレイアウトを整えよう |  |
| 絵文字を整える | emoji-css |
| テンプレートを整える | templates-css |
| 全体を整えて仕上げる | create-finish-css |
| 【Section】日記一覧画面を作成しよう |  |
| 日記一覧を完成 | diary-index |
| 【Section】GoogleAdmobを使ってマネタイズしよう |  |
| 広告コンポーネントの作成とビルド | admob-setting |
| 広告付きiOSのテストビルド | ios-admob-build |
| 【Section】STEP3本番ビルド |  |
| iOS本番ビルド | ios-production-build |
| 【Section】RevenueCatを利用してアプリ内課金を実装しよう |  |
| RevenueCatの初期設定 | revenue-cat-init |
| SettingScreenを作成 | create-setting-screen |
| Androidでサブスク商品を取得 | google-play-subs |
| 【Android】でサブスクのテスト決済を行う | google-play-subs-test |
| 決済モーダルのデザイン改良 | subs-modal-css |
| firebaseのuidを使って課金ユーザーを判別する | revenue-cat-id |
| 【Section】firebaseによるユーザー管理 |  |
| SignupとSigninスクリーンを作成 | create-signin-screen |
| Signup機能を実装 | firebase-signup |
| Signin機能を実装 | firebase-signin |
| Contextを使ってログイン状態を全てのコンポーネントに渡す | create-context |
| サインイン状態によってボタンを出し分ける | auth-if |
| サインアウト機能を実装 | signout |
| react-native-paperのカスタムテーマを作成する | react-native-paper-custom |
| サインイン情報の永続化 | sign-info-async-storage |
| パスワードリセット機能の実装 | firebase-password-reset |
| 課金ユーザーを分岐する | is-premium |
| 課金ユーザーの広告を非表示にする | adoff |
| 【Section】SQLiteデータベースのバックアップ機能 |  |
| SQLiteデータベースのバックアップ | sqlite-backup |
| jsonをfirebase storageへアップロード | sqlite-backup-upload |
| SQLiteデータベースの復元 | sqlite-restore |
| 連打防止など細かい部分を改良 | sqlite-restore-disabled |
| 【Section】firestoreのCRUD |  |
| firestoreのデータを編集 | firestore-edit |
| firestoreのデータを削除 | firestore-delete |


## バージョン情報
- ReactNative: 0.70.6
- React: 18.1.0
- Expo: 47.0.8

## 日記テンプレート
[GoogleDocument](https://docs.google.com/document/d/1MUIIvxelnd1Tjt65r8Qfi1Ap2HReMlvnbpTkYzlRWYw/edit?usp=sharing)