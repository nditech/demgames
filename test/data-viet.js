/**
 * Database structure proposed by Viet.
 * Goal: keep the structure as flat as possible to reduce cost for database scans/queries
 * and improve search speed.
 * Can be used for multiple games, modules...
 * Can easily add more types of data
 */

const database = [
{
    "id": "module-1", // id must be unique. Partition key.
    "type": "module", // Sort key.
    "name": "Designing an Argument",
    "levels": [
        {
            "id": "level-1",
            "questions": [ /** references to questions. could be different */
                "question-1",
                "question-2"
            ]
        },
    ]
},
{ /**Each event queries 1 set of game */
    "id": "game-1", // id must be unique. Partition key.
    "type": "game", // Sort key.
    "modules": [ /**contains modules IDs */
        "module-1",
        "module-2"
    ]
},
{
    "id": "event-1", // id must be unique. Partition key.
    "type": "event", // Sort key.
    "name": "event 1 name",
    "location": "some address",
    "game": "game-1" /**ties an event with one game */
},
{
    "id": "user-1", // id must be unique. Partition key.
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
