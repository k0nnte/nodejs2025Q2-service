import { DatabaseService } from './base/database.service';

export default function delfunc(
  deleteKey: string,
  uul: string,
  bd: DatabaseService,
) {
  const dKey = `${deleteKey}Id`;
  Object.keys(bd).forEach((key) => {
    if (Array.isArray(bd[key])) {
      if (key !== deleteKey) {
        bd[key].forEach((item) => {
          if (item[dKey]) {
            item[dKey] = null;
          }
        });
      }
    } else if (typeof bd[key] === 'object' && bd[key] !== null) {
      if (bd[key][`${deleteKey}s`].includes(uul)) {
        bd[key][`${deleteKey}s`] = bd[key][`${deleteKey}s`].filter(
          (id: string) => id !== uul,
        );
      }
    }
  });
}
