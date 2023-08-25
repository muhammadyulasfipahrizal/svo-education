export interface IAssesment {
    question: string;
    points: string;
    answerType: 'text' | 'radio';
    answerText: string;
    answerRadio: number[];
}