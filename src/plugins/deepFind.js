function reduceSchemaRecursive(schemaObject, reducer, initialValue, paths = []) {
  return Object.keys(schemaObject).reduce((accumulator, property) => {
    const value = schemaObject[property];
    const nestedSchema = Array.isArray(value) ? value[0].obj : value;
    const currentPaths = [...paths, property];
    let currentAccValue = reducer(accumulator, currentPaths.join('.'), value);
    if (nestedSchema.ref) {
      const targetModel = this.db.model(nestedSchema.ref);
      currentAccValue = reduceSchemaRecursive.call(this, targetModel.schema.obj, reducer, currentAccValue, currentPaths);
    } else if (typeof(nestedSchema) === 'object') {
      currentAccValue = reduceSchemaRecursive.call(this, nestedSchema, reducer, currentAccValue, currentPaths);
    }
    return currentAccValue;
  }, initialValue);
}

function searchQueryToFilter(searchQuery) {
  const { searchFields } = this.schema.options;
  if (!searchQuery || !searchFields) return;
  return searchFields.map(searchField => {
    return { [searchField]: new RegExp(`.*${searchQuery}.*`, 'i') };
  });
}

function getRootCollectionFilter(projection) {
  if (!projection) return;
}

function getJoinPipeline(projection) {

}

export function deepFindAll(options = {}) {

  const { skip, limit, projection, filter, sort, search } = options;
  const pathsTree = this.schema._pathsTree || reduceSchemaRecursive.call(this, this.schema.obj, (accumulator, property, schema) => {
    let type;
    if (schema.ref) type = 'ref';
    else if (Array.isArray(schema)) type = 'array';
    else type = 'path';
    return [...accumulator, { property, type }];
  }, []);

  if (!this.schema._pathsTree) this.schema._pathsTree = pathsTree;

  const pipeline = [];
  skip && pipeline.push({ $skip: skip });
  limit && pipeline.push({ $limit: limit });

  const searchFilter = searchQueryToFilter.call(this, search);
  const resultFilter = Object.assign({}, filter, searchFilter);

  const rootCollectionFilter = getRootCollectionFilter.call(this, projection);

  rootCollectionFilter && pipeline.push({ $match: rootCollectionFilter });

  const joinPipeline = getJoinPipeline(projection);
  joinPipeline && pipeline.push(...joinPipeline);

  resultFilter && pipeline.push({ $match: resultFilter });
  projection && pipeline.push({ $projection: projection });
  sort && pipeline.push({ $sort: sort });

  return pipeline.length === 0 ? this.find() : this.aggregate(pipeline);

}

const deepFindPlugin = schema => {
  schema.static('deepFindAll', deepFindAll);
  schema.static('deepFindOne', async function(options) {
    const result = await deepFindAll({ ...options, limit: 1 });
    return result.length > 0 ? result[0] : null;
  });
};

export default deepFindPlugin;