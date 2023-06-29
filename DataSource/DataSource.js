class DataSource {
    static MODE_FIND = 0;
    static MODE_AGGREGATE = 1;

    constructor(Model, config) {
        // query config params
        // pageSize = 20, page = 1, sortBy, direction = 1, searchBy = 'name', search
        this.Model = Model;
        this.config = config;

        this.setQueryParams();
    }

    // ============= Private Methods ============= //
    setQueryParams() {
        const {
            pageSize = 20,
            page = 1,
            sortBy,
            direction = 1,
            searchBy = 'name',
            search,
        } = this.config;

        this.config = {
            pageSize,
            page,
            sortBy,
            direction,
            searchBy,
            search,
        };
    }

    getMatchQueries(stages) {
        // It is a private method that filters mongo query and returns an array of match stage queries from an array of aggregation stages.
        return (
            stages.filter(stage => Object.keys(stage).includes('$match')) || []
        );
    }

    async setPageData(response, mode) {
        // Mode is either aggregate or find
        // Response may contain the response from mongoose query in case find calls it or it will contain an array of $match queries in case of aggregate queries
        const { pageSize = 20, page = 1 } = this.config;
        let totalCount = 0;

        if (mode === DataSource.MODE_FIND) {
            totalCount = response.metaData?.count || 0;
        } else if (mode === DataSource.MODE_AGGREGATE) {
            totalCount = await this.getTotalCount(response); // Get the total count
        }

        this.pageData = {
            totalPages: Math.ceil(totalCount / pageSize) || 0,
            totalData: totalCount,
            currentPage: +page,
            pageSize: +pageSize,
        };
    }

    async getTotalCount(matchQueries) {
        // It is a private method that calculates and returns the total count of documents based on the provided match queries in case of aggregation.

        const query = {};
        matchQueries.forEach(matchQuery => {
            Object.keys(matchQuery.$match).forEach(key => {
                query[key] = matchQuery.$match[key];
            });
        });
        return this.Model.count(query);
    }

    // ============= Public Methods ============= //
    async find(filters) {
        // This method performs a find operation on the MongoDB collection using the specified mongo filters and query parameters.

        const { pageSize, page, sortBy, direction, searchBy, search } =
            this.config;

        if (search) {
            filters[searchBy] = new RegExp(search, 'i');
        }

        const finalStage = [
            {
                $match: filters,
            },
            {
                $sort: {
                    [sortBy]: +direction,
                },
            },
            {
                $facet: {
                    contacts: [
                        {
                            $skip: Number(pageSize * (page - 1)),
                        },
                        {
                            $limit: Number(pageSize),
                        },
                    ],
                    metaData: [
                        {
                            $group: {
                                _id: 'null',
                                count: {
                                    $count: {},
                                },
                            },
                        },
                    ],
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        results: '$contacts',
                        metaData: {
                            $first: '$metaData',
                        },
                    },
                },
            },
        ];

        const [response] = await this.Model.aggregate(finalStage);

        this.setPageData(response, DataSource.MODE_FIND);

        return response.results;
    }

    async aggregate(stages) {
        const { pageSize, page, sortBy, direction, searchBy, search } =
            this.config;

        // Adding $match stage with search query added
        if (search) {
            stages.unshift({
                $match: {
                    [searchBy]: new RegExp(search, 'i'),
                },
            });
        }

        // Getting all stages with match queries
        const matchQueries = this.getMatchQueries(stages);

        // Setting the page data
        await this.setPageData(matchQueries, DataSource.MODE_AGGREGATE);
        // Creating mongooseQuery with all stages
        const mongooseQuery = this.Model.aggregate(stages);

        // implementing sort if needed
        if (sortBy) {
            mongooseQuery.sort({ [sortBy]: +direction });
        }

        // Implementing skip and limit for pagination
        mongooseQuery
            .skip(Number(pageSize * (page - 1)))
            .limit(Number(pageSize));
        return mongooseQuery;
    }
}

export default DataSource;
