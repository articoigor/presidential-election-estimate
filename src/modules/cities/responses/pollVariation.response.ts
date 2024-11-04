export class PollVariationResponse {
    variations: Variation[];

    constructor(variations: Variation[]){
        this.variations = variations;
    }
}

export class Variation {
    date: string;
    results: Result[];

    constructor(date: string, results: Result[]){
        this.date = date;
        this.results = results;
    }
}

export class Result {
    candidateName: string;
    votePercentage: string;

    constructor(candidateName: string, votePercentage: string){
        this.candidateName = candidateName;
        this.votePercentage = votePercentage;
    }
}