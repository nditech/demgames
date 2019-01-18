/**
 * Database structure proposed by Hashedin
 */

const database = {
	"modules": [
		{
			"id": 1,
			"name": "Designing an Argument",
			"style": "blue",
			"levels": [
				{
					"id": 1,
					"current_score": 80,
					"par_score": 0,
					"total_score": 100,
					"desc": "Description1",
					"linked_level": 0,
					"questions": [
						{
							"id": 1,
							"question": "level1 question1",
							"options": [ "level1  A", "level1 B", "level1 C", "level1 D" ],
							"correct_answer": 1
						},
						{
							"id": 2,
							"question": "level 1 question2",
							"options": [ "level1 X", "level1 Y", "level1 Z", "level1 A" ]
						}
					]
				},
				{
					"id": 2,
					"current_score": 0,
					"par_score": 80,
					"total_score": 100,
					"desc": "Description2",
					"linked_level": 1,
					"questions": [
						{
							"id": 1,
							"question": "level2 question1",
							"options": [ "level2  A", "level2 B", "level2 C", "level2 D" ],
							"correct_answer": 1
						},
						{
							"id": 2,
							"question": "level2 question2",
							"options": [ "level2 X", "level2 Y", "level2 Z", "level2 A" ],
							"correct_answer": 1
						}
					]
				},
				{
					"id": 3,
					"current_score": 0,
					"par_score": 70,
					"total_score": 100,
					"desc": "Description3",
					"linked_level": 2,
					"questions": [
						{
							"id": 1,
							"question": "level3 question1",
							"options": [ "level3  A", "level3 B", "level3 C", "level3 D" ],
							"correct_answer": 1
						},
						{
							"id": 2,
							"question": "level3 question2",
							"options": [ "level3 X", "level3 Y", "level3 Z", "level3 A" ],
							"correct_answer": 1
						}
					]
				},
				{
					"id": 4,
					"current_score": 0,
					"par_score": 70,
					"total_score": 100,
					"desc": "Description4",
					"linked_level": 3,
					"questions": [
						{
							"id": 1,
							"question": "",
							"options": [ "level4  A", "level4 B", "level4 C", "level4 D" ],
							"correct_answer": 1
						},
						{
							"id": 2,
							"question": "",
							"options": [ "level4  A", "level4 B", "level4 C", "level4 D" ],
							"correct_answer": 1
						}
					]
				}
			]
		},
        {
            "name": "other module"
        }
    ]
};
