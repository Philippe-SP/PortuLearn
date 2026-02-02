export interface Conjugaison {
    pronoun: string, // eu, tu, ele...
    suffix: string, // -o, -as....
    example: string // falo, falas....
}

export interface Exercice {
    id: string,
    title: string,
    category: string,
    options: string[],
    correctAnswer: string
}

export interface Lesson {
    id: string,
    title: string,
    category: 'AR' | 'ER' | 'IR',
    theory: {
        description: string,
        rules: Conjugaison[]
    },
    exercices: Exercice[]
}