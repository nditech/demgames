/**
 * Database structure proposed by Viet.
 * Goal: keep the structure as flat as possible to reduce cost for database scans/queries
 * and improve search speed.
 * Can be used for multiple games, modules...
 * Can easily add more types of data
 */

const database = [
{
    "id": "module-1", // Partition key.
    "type": "module", // Sort key.
    "name": "Designing an Argument",
    "levels": []
},
{ /**Each event queries 1 set of game */
    "id": "game-1", // Partition key.
    "type": "game", // Sort key.
    "modules": [ /**contains modules IDs */
        "module-1",
        "module-2"
    ]
},
/** Items can have the same id (partition key), but different type (sort key) 
 * So we can query for different types of the same user,
 * or different users that share the same score by using a certain type.
*/
/** Query user report with type = user-report id = user-id */
{
    "id": "user-1", /** Partition Key - same user id but different composite Primary Key because of Sort Key */
    "type": "user-report", /** Sort Key */
    "games": [],
    "scores": [],
    "modules": []
},
/** Query user's details by using type=user id=user-id */
{
    "id": "user-1", // Partition key.
    "type": "user", // Sort key.
    "name": "John",
    "number": "+12345678901"
},
/** Quickly query user's progress using GSI: type = userprogress, game = game-id */
{
    "id": "user-1", // Partition key.
    "type": "userprogress", // Sort key.
    "game": [],
    "modules": []
},
/** Could also bind type=userprogress + game-id for an item that contains:
 * User's progress in that specific game with
 * Scores and Modules Completion
 */
{
    "id": "user-1",
    "type": "userprogress-game-1",
    "game": "game-1",
    "game": [],
    "modules": []
},
/**
 * Also can query for top scorers with GSI: partition key = type, sort key = score.
 * NOTE: keep the number of indexes minimum.
 * Query for all players have played game-1: type = user-report-game-1
 * Query for top players of game-1: type = user-report-game-1, score = 100
 */
{
    "id": "user-1",
    "type": "user-report-game-1",
    "game": "game-1",
    "score": 100,
},
{
    "id": "user-2",
    "type": "user-report-game-1",
    "game": "game-1",
    "score": 75,
},
{
    "id": "user-3",
    "type": "user-report-game-1",
    "game": "game-1",
    "score": 100,
},
/** For details of a specific game, query id = report-id, type = report-details */
{
    "id": "report-1", /** Can even have a new Global Secondary Index to query */
    "type": "report-details", /** New Sort Key */
    "game": "game-3", /** New Partition Key */
    "scores": []
},
{ /** Can also implement report entry contains reports for each game or event */
    "id": "report-1",
    "type": "report",
    "event": "event-1",
    "game": "game-1",
    "users": [
        "user-1",
        "user-3",
        "user-19"
    ],
    "scores": { /** The average score or progress of all users */
        "module-1": "52.45%",
        "module-2": "14.5%"
    }
    // Can also add more meta data: % of genders, age group, etc.
},
{
    "id": "question-1",
    "type": "question",
    "text": "some text",
    "options": []
},
{
    "id": "module-1", /** Can reference to module-1 with a new type as sort key */
    "type": "module-with-question", /** Can be a new Global Secondary Index Sort Key or Primary Key */
    "questions": []
},
{
    "id": "event-1", // Partition key.
    "type": "event", // Sort key.
    "name": "event 1 name",
    "location": "some address",
    "game": "game-1" /**ties an event with one game */
}
];
