# Developer Documentation: DataSource Class

The `DataSource` class is a utility class designed to facilitate querying data from a MongoDB database using Mongoose. It provides methods for performing find and aggregate operations with pagination, filtering and sorting capabilities. This documentation aims to provide an overview of the class, its constructor, methods, and usage examples.

## Table of Contents

1. [Class Overview](#class-overview)
2. [Constructor](#constructor)
3. [Private Methods](#private-methods)
    - [setQueryParams](#setqueryparams)
    - [getMatchQueries](#getmatchqueriesstages)
    - [setPageData](#setpagedataresponse-mode)
    - [getTotalCount](#gettotalcountmatchqueries)
4. [Public Methods](#public-methods)
    - [find](#findfilters)
    - [aggregate](#aggregatestages)

## Class Overview

The `DataSource` class is defined as follows:

```javascript
class DataSource {
    static MODE_FIND = 0;
    static MODE_AGGREGATE = 1;

    constructor(Model, query, filtersAllowed = []) {
        // ...
    }

    // Private methods...

    // Public methods...
}
```

### Static Properties

-   `MODE_FIND`: A static property indicating the find mode for the `setPageData` method.
-   `MODE_AGGREGATE`: A static property indicating the aggregate mode for the `setPageData` method.

### Constructor

The constructor of the `DataSource` class initializes an instance of the class with the provided parameters.

```javascript
constructor(Model, query, filtersAllowed = []) {
    // query params
    // pageSize = 20, page = 1, srtBy, direction = 1, searchBy = 'name', search
    this.Model = Model;
    this.query = query;
    this.filtersAllowed = filtersAllowed;
    this.queryFilters = {};

    this.setQueryParams();
}
```

#### Parameters

-   `Model` (Mongoose Model): The Mongoose model representing the collection to query.
-   `query` (Object): An object containing query parameters such as `pageSize`, `page`, `sortBy`, `direction`, `searchBy`, and `search`.
-   `filtersAllowed` (Array): An optional array of filter names allowed for querying.

### Private Methods

#### setQueryParams

The `setQueryParams` method is a private method that extracts and sets query parameters from the `query` object.

```javascript
setQueryParams() {
    // ...
}
```

#### getMatchQueries(stages)

The `getMatchQueries` method is a private method that filters and returns an array of match queries from an array of stages.

```javascript
getMatchQueries(stages) {
    // ...
}
```

#### setPageData(response, mode)

The `setPageData` method is a private method that sets page-related data based on the provided response and mode.

```javascript
async setPageData(response, mode) {
    // ...
}
```

#### getTotalCount(matchQueries)

The `getTotalCount` method is a private method that calculates and returns the total count of documents based on the provided match queries.

```javascript
async getTotalCount(matchQueries) {
    // ...
}
```

### Public Methods

#### find(filters)

The `find` method performs a find operation on the MongoDB collection using the specified mongo filters and query parameters.

```javascript
async find(filters) {
    // ...
}
```

#### Parameters

-   `filters` (Object): An object containing additional filters to be applied to the find operation.

#### Returns

-   Returns an array of documents matching the specified filters and query parameters.

#### aggregate(stages)

The `aggregate` method performs an

aggregate operation on the MongoDB collection using the specified stages and query parameters.

```javascript
async aggregate(stages) {
    // ...
}
```

#### Parameters

-   `stages` (Array): An array of stages representing the aggregation pipeline to be executed.

#### Returns

-   Returns a Mongoose Query object representing the aggregate operation.

## Usage Example

Here's an example of how to use the `DataSource` class to query data from a MongoDB collection:

```javascript
import DataSource from './DataSource';

// Assuming you have a Mongoose model defined as 'Contact'
const Contact = require('./models/Contact');

// Create a new instance of DataSource
const dataSource = new DataSource(
    Contact,
    {
        pageSize: 10,
        page: 1,
        sortBy: 'name',
        direction: 1,
        searchBy: 'name',
        search: 'John',
    },
    ['status', 'category']
);

// Perform a find operation
const results = await dataSource.find({ category: 'Work' });

// Perform an aggregate operation
const pipeline = [
    { $match: { status: 'Active' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
];
const aggregatedData = await dataSource.aggregate(pipeline);
```

This example demonstrates how to create an instance of the `DataSource` class, set query parameters, and perform find and aggregate operations on a Mongoose model. You can customize the query parameters, filters, and stages based on your application's requirements.

Note: The above example assumes that the necessary dependencies and models are properly imported and set up.

That concludes the developer documentation for the `DataSource` class. For further information, consult the class implementation and comments in the source code.
