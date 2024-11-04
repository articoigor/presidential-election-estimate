export class PollEstimateResponse {
    date: string;
    candidates: Candidate[];

    constructor(date: string, candidates: Candidate[]){
        this.date = date;
        this.candidates = candidates;
    }
}

export class Candidate {
    name: string;
    votesTotal: number;
    votePercentage: string;
    votesByGroup: Group[];

    constructor(name: string, votesTotal: number, votePercentage: string, votesByGroup: Group[]){
        this.name = name;
        this.votesTotal = votesTotal;
        this.votePercentage = votePercentage;
        this.votesByGroup = votesByGroup;
    }
}

export class Group {
    description: string;
    groupVotes: number;

    constructor(description: string, groupVotes: number){
        this.description = description;
        this.groupVotes = groupVotes;
    }
}