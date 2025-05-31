import { DatabaseService } from './base/database.service';

export default function delfunc(
  deleteKey: string,
  uul: string,
  bd: DatabaseService,
) {
  const dKey = `${deleteKey}Id`;
  // Object.keys(bd).forEach((key) => {
  //   if (key !== deleteKey) {
  //     bd[key].forEach((item) => {
  //       if (item[dKey]) {
  //         item[dKey] = null;
  //       }
  //     });
  //   }
  // });
  Object.keys(bd).forEach((key) => {
    if (Array.isArray(bd[key])) {
      if (key !== deleteKey) {
        bd[key].forEach((item) => {
          if (item[dKey]) {
            item[dKey] = null;
          }
        });
      }
    }
  });
}
