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
{
    "id": "user-1", /** Partition Key - same user id but different composite Primary Key because of Sort Key */
    "type": "user-report", /** Sort Key */
    "game": "game-1",
    "scores": []
},
{
    "id": "report-1", /** Can even have a new Global Secondary Index to query */
    "type": "report-details", /** New Sort Key */
    "game": "game-3", /** New Partition Key */
    "scores": []
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
},
{
    "id": "user-1", // Partition key.
    "type": "user", // Sort key.
    "name": "John",
    "number": "+12345678901",
    "scores": {
        "game-1": {
            "module-1": "80%",
            "module-2": "70%",
            "module-3": "60%"
        },
        "game-2": {
            // game scores
        }
    },
    "progress": { /** object if users play multiple games at once. if 1 game, value */
        "game-1": {
            "module-1": "question-2",
            "module-3": "question-1"
        },
        "game-2": {
            "module-1": "question-1"
        }
    }
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
}
];
