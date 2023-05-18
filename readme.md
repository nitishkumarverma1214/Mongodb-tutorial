# MongoDB shell command

## To connect to the shell

mongosh -- use mongo shell

# To list the existing database

`show dbs`

# To create and use the database

`use databas_name`

## Insert/ create command

ex-
use netfix_db

### create single document

`db.movies.insertOne({name:"ddlj", star:2, genre:"romantic"})`

### create multiple document

`
db.movies.insertMany([
{name:"GodFather", star:5, genre:"action"},
{name:"The girl next door", star:3.2, genre:"comedy"},
{name:"inception", star:4, genre:"scifi"},
])`

### Read/Query

It will query all the document

`db.movies.find()`

#### Specify Equality Condition

specify the condition as a <field>:<value> pair in the
query filter document.

Ex-
`db.movies.find( { "title": "Titanic" } )`

#### Specify Conditions Using Query Operators

Query operators in a query filter document have the following form:

```
{ <field1>: { <operator1>: <value1> }, ... }
```

EX-
`db.movies.find( { rated: { $in: [ "PG", "PG-13" ] } } )`

#### Specify Logical Operators (AND / OR)

```
db.movies.find( { countries: "Mexico", "imdb.rating": { $gte: 7 } } )

db.movies.find( {
     year: 2010,
     $or: [ { "awards.wins": { $gte: 5 } }, { genres: "Drama" } ]
} )
```

### Update the document

-- To update a single document, use
`db.collection.updateOne()`

-- To update multiple documents, use
`db.collection.updateMany()`

-- To replace a document, use
`db.collection.replaceOne()`

To update a document, MongoDB provides update operators, such as `$set`, to modify field values.

```
{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
}
```

#### Update operators

[link to the update operator](https://www.mongodb.com/docs/manual/reference/operator/update/)

```
db.movies.updateOne( { title: "Tag" },
{
  $set: {
    plot: "One month every year, five highly competitive friends
           hit the ground running for a no-holds-barred game of tag"
  }
  { $currentDate: { lastUpdated: true } }
})

db.listingsAndReviews.updateMany(
  { security_deposit: { $lt: 100 } },
  {
    $set: { security_deposit: 100, minimum_nights: 1 }
  }
)


```

#### Replace a Document

To replace the entire content of a document except for the \_id field, pass an entirely new document as the second argument to
db.collection.replaceOne().

```
db.accounts.replaceOne(
  { account_id: 371138 },
  { account_id: 893421, limit: 5000, products: [ "Investment", "Brokerage" ] }
)
```

### Delete the document

- To delete multiple documents, use
  `db.collection.deleteMany().`

- To delete a single document, use
  `db.collection.deleteOne().`

  ### Delete all the document

`db.movies.deleteMany({})`

```
db.movies.deleteMany( { title: "Titanic" } )
db.movies.deleteOne( { cast: "Brad Pitt" } )
```

## Limit the number of document

`db.collection.find({}).limit(2)`

## Skip the document return

_useful when creating the pagination_
`db.collection.find({}).skip(2)`

## Sort the document

_asending order_
`db.collection.find().sort({field:1})`

_decending order_
`db.collection.find().sort({field:-1})`
EX-
`db.restaurants.find().sort( { "borough": 1, "_id": 1 } )
`

## Below is the link of query operators

[query operators](https://www.mongodb.com/docs/manual/reference/operator/query/)

Some of the operators are:

- Comparison
- Logical
- Element
- Evaluation

## Aggregation Pipeline Stages

```
db.collection.aggregate( [ { <stage> }, ... ] )

db.orders.aggregate( [

   // Stage 1: Filter pizza order documents by pizza size
   {
      $match: { size: "medium" }
   },

   // Stage 2: Group remaining documents by pizza name and calculate total quantity
   {
      $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
   }

] )

```

## This repo will have the command to connect to the database using Mongoose and perform CURD
