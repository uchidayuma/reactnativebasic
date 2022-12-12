import * as SQLite from "expo-sqlite";

/**
 * SQLiteと接続
 */
const db = SQLite.openDatabase("tapdiary");

/**
 * テーブルを作成する
 */
export function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      `CREATE TABLE if not exists diaries (
        id integer primary key not null,
        body text,
        emoji text,
        feel_id text,
        updated_at text,
        created_at text 
      );`,
      // SQL文の引数
      // 必要ないときは空のまま
      [],
      // 成功時のコールバック関数
      () => {
        console.log("create table success");
      },
      () => {
        // 失敗時のコールバック関数
        console.log("create table faile");
        return false;
      }
    );
  });
}

/**
 * データを登録する
 */
export function insert(id, name) {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      // ?のところに引数で設定した値が順番に入る
      `insert into sample_table values (?, ?);`,
      // SQL文の引数
      [id, name],
      // 成功時のコールバック関数
      () => {
        console.log("insert success");
      },
      () => {
        // 失敗時のコールバック関数
        console.log("insert faile");
        return false;
      }
    );
  });
}

/**
 * データを取得する
 */
export function select() {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      `select * from sample_table;`,
      // SQL文の引数
      [],
      // 成功時のコールバック関数
      (_, { rows }) => {
        console.log("select success");
        console.log("select result:" + JSON.stringify(rows._array));
      },
      () => {
        // 失敗時のコールバック関数
        console.log("select faile");
        return false;
      }
    );
  });
}
