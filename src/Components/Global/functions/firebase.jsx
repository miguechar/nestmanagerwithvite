import { uid } from "uid";
import { db } from "../../../Config";
import { onValue, set, ref, remove, update } from "firebase/database";
import moment from "moment";

export function getFB(path) {
  return new Promise((resolve) => {
    const dataRef = ref(db, path);

    onValue(dataRef, (snapshot) => {
      const theData = snapshot.val();
      const data = [];

      if (theData !== null) {
        Object.values(theData).forEach((value) => {
          data.push(value);
        });
      }

      resolve(data);
    });
  });
}

export function setFB(path, array, onUidGenerated) {
  const uuid = uid();
  const dataWithUid = { ...array, uid: uuid };

  try {
    set(ref(db, `${path}/${uuid}`), dataWithUid);
    if (onUidGenerated) {
      onUidGenerated(uuid);
    }
  } catch (err) {
    console.error(err);
  }
}


export function deleteFB(path) {
  remove(ref(db, path));
}

export function getTodayDate() {
  var date = moment();
  var currentDate = date.format("YYYY-MM-DD");
  return currentDate;
}

export function updateFB(path, array) {
  try {
    update(ref(db, path), array)
  } catch(err) {
    console.error(err);
  }
}