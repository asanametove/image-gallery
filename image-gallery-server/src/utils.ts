import Loki from 'lokijs';

const loadCollection = (colName: string, db: Loki): Promise<Loki.Collection<any>> => {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const collection = db.getCollection(colName) || db.addCollection(colName);
      resolve(collection);
    });
  });
}

export {loadCollection};
