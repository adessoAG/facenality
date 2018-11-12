/**
 * @property gender types :
 * 0 = missed
 * 1 = male
 * 2 = female
 * 3 = other
 */
export class Questionnaire {
    id: number;
    email: string;
    photos: string[];
    cattells16Questions: {key: string, value: number}[];
    age: number;
    gender: number;
    timeElapsedInSeconds: number;

    constructor(email, photos, cattells16Questions, age, gender, timeElapsedInSeconds) {
        this.email = email;
        this.photos = photos;
        this.cattells16Questions = cattells16Questions;
        this.age = age || "";
        this.gender = gender || "";
        this.timeElapsedInSeconds = timeElapsedInSeconds;
    }
}

export const PHOTO_DESCRIPTIONS: { index: number, label: string }[] = [
    { index: 0, label: "DESCRIPTION_NEUTRAL_FACE" },
    { index: 1, label: "DESCRIPTION_HAPPY_FACE" },
    { index: 2, label: "DESCRIPTION_SAD_FACE" },
    { index: 3, label: "DESCRIPTION_RANDOM_FACE" }
]

