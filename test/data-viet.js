/**
 * Database structure proposed by Viet.
 * Goal: keep the structure as flat as possible to reduce cost for database scans/queries.
 * Can be used for multiple games, modules...
 */

const database = [
    {
        "id": "module-1", // id must be unique
        "type": "module",
        "name": "Designing an Argument",
        // Other properties...
        // Same structure Hashedin proposed.
        "levels": [
            {
                "id": 1,
                "current_score": 80,
                "par_score": 0,
                "total_score": 100,
                "desc": "Description1",
                "linked_level": 0,
                "questions": []
            },
        ]
    },
    {
        "id": "module-2",
        "type": "module",
        "name": "Another Module",
        // Other properties...
    },
    {
        "id": "game-1", // id must be unique
        "type": "game",
        "modules": [ /**contains modules IDs */
            "module-1",
            "module-2"
        ],
        "stats": {
            "module-1": "100%",
            "module-2": "80%"
        }
    },
    {
        "id": "event-1", // id must be unique
        "type": "event",
        "name": "event 1 name",
        "location": "some address",
        "game": "game-1" /**ties an event with one game */
    },
    {
        "id": "user-1",
        "type": "user",
        "name": "John",
        "number": "+12345678901",
        "games": {
            "game-1": {
                "module-1": "80%",
                "module-2": "70%",
                "module-3": "60%"
            },
            "game-2": {
                // game scores
            }
        }
    }
];
