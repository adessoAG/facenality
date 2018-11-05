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
    cattells16Questions;
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

