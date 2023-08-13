import { Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import dayjs from "dayjs";
import { storage } from "./firebase";
// import RNFetchBlob from "rn-fetch-blob";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
/**
 * SQLiteと接続
 */
export const db = SQLite.openDatabase("tapdiary");

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

export const insertDiary = (db: object = {}, body: string = '', selectedTemplate:object = {}) => {
  // const createdAt: string = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const createdAt: string = dayjs().format('YYYY-MM-DD');
  console.log(body, selectedTemplate, createdAt);
  db.transaction((tx:any) => {
    // tx.executeSql('SQL文','SQL文に使うデータ','成功時の関数','失敗時の関数')
    tx.executeSql(
      // 実行したいSQL文
      // ?のところに引数で設定した値が順番に入る
      `INSERT INTO diaries (body, emoji, feel_id, created_at, updated_at) values (?, ?, ? ,?, ?);`,
      // SQL文の引数
      [body, selectedTemplate.emoji, selectedTemplate.id , createdAt, createdAt],
      // 成功時のコールバック関数
      (sqlTxn, res) => {
        console.log(sqlTxn);
        console.log(`Diary added successfully`);
        console.log(res);
      },
      error => {
        console.log('ERROR');
        console.log(error);
        // return false;
      },
    )
  });
}

/**
 * データを登録する
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
 */

/**
 * データを取得する
 */
export function select() {
  return new Promise((resolve, reject) =>{
    db.transaction((tx) => {
      tx.executeSql(
        // 実行したいSQL文
        `select * from diaries order by id desc limit 5;`,
        // SQL文の引数
        [],
        // 成功時のコールバック関数
        (_, { rows }) => {
          console.log("select success");
          console.log("select result:" + JSON.stringify(rows._array));
          resolve(rows._array);
        },
        (error) => {
          // 失敗時のコールバック関数
          console.log("select faile");
          console.log(error);
          reject(error);
        }
      );
    });
  })
}

/**
 * データを更新
 * @param id - 更新するレコードのID
 * @param body - 更新する内容
 * @param emoji - 更新する絵文字
 * @param feel_id - 更新する感情ID
 */
export function updateDiary(db, id, body, selectedTemplate) {
  console.log(id, body, selectedTemplate);
  
  const updatedAt = dayjs().format('YYYY-MM-DD');

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE diaries SET body = ?, emoji = ?, feel_id = ?, updated_at = ? WHERE id = ?;`,
        [body, selectedTemplate.emoji, selectedTemplate.id, updatedAt, id],
        () => {
          console.log("update success");
          resolve(true);
        },
        (error) => {
          console.log("update failed");
          console.log(error);
          resolve(false);
        }
      );
    });
  });
}

/**
 * データを削除
 * @param id - 削除するレコードのID
 */
export function deleteDiary(db, id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM diaries WHERE id = ?;`,
        [id],
        () => {
          console.log("delete success");
          resolve(true);
        },
        (error) => {
          console.log("delete failed");
          console.log(error);
          resolve(false);
        }
      );
    });
  });
}


export const exportDatabaseToJson = async(db:object, uid) => {
  const tables = await getTables(db);
  const data = {};

  for (const table of tables) {
    data[table] = await getTableData(db, table);
  }

  console.log(data);
  // upload to firebase storage
  // filename is uid.json
  const storageRef = ref(storage, `backups/${uid}.json`);
  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], { type: "application/json" });
  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log(snapshot);
    console.log("Uploaded a blob or file!");
  })
}

async function getTables(db) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table'",
        [],
        (_, { rows }) => {
          const tables = [];
          for (let i = 0; i < rows.length; i++) {
            tables.push(rows.item(i).name);
          }
          resolve(tables);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

async function getTableData(db, table) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${table}`,
        [],
        (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export const importDatabaseFromJson = async(db:object, uid) => {
  try {
    // download from firebase storage
    const storageRef = ref(storage, `backups/${uid}.json`);
    const url = await getDownloadURL(storageRef);
    const response = await RNFetchBlob.fetch("GET", url);
    const jsonString = await response.text();
    const data = JSON.parse(jsonString);
    console.log(data);
    const diaries = data.diaries;

    // まず、テーブルをクリアします
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM diaries');
    });

    // JSONデータに含まれるすべてのレコードを挿入します
    db.transaction((tx) => {
      diaries.forEach((record) => {
        console.log(record);
        
        tx.executeSql('INSERT INTO diaries (id, body, emoji, feel_id, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?)', [record.id, record.body, record.emoji, record.feel_id, record.updated_at, record.created_at]);
      });
    });
    Alert.alert('restore backup', 'please reload app');
  } catch (error) {
    Alert.alert('restore Error');
    console.log(error);
  }
}