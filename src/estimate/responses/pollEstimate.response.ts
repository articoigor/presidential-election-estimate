export class PollEstimateResponse {
    candidates: Candidate[];

    constructor(candidates: Candidate[]){
        this.candidates = candidates;
    }
}

class Candidate {
    name: string;
    votePercentage: string;

    constructor(name: string, votePercentage: string){
        this.name = name;
        this.votePercentage = votePercentage;
    }
}