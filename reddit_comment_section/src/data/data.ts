import type { Comment } from "../types/types";

export const initialComments: Comment[] = [
    {
        id: "1",
        text: "This is 1st text",
        child: [
            {
                id: "2",
                text: "This is nested 1st text",
                child: [
                    {
                        id: "3",
                        text: "This is nested of nexted 1st text",
                        child: []
                    }
                ]
            },
            {
                id: "5",
                text: "This is 2nd nested text.",
                child: []
            }
        ]
    },
    {
        id: "4",
        text: "This is 2nd text",
        child: []
    }
]