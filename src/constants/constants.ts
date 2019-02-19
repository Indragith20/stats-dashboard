export const cards = [{
    title: 'Free Throw',
    id: 1,
    icon: '../../../assets/icons/free throw.png',
    isTwoTeamsInvolved: false,
    questions: [{
        questionId: 1,
        question: 'Enter Player Nmber',
        currentTeam: true,
        type: 'icon'
    }]
}, {
    title: '2 Point',
    id: 2,
    icon: '../../../assets/icons/2 pointer.png',
    isTwoTeamsInvolved: false,
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 2,
        question: 'Assist',
        currentTeam: true,
        type: 'checkbox'
    }, {
        questionId: 3,
        question: 'Assist Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 4,
        question: 'Shot Map',
        currentTeam: true,
        type: 'shot'
    }]
}, {
    title: '3 Point',
    id: 3,
    isTwoTeamsInvolved: false,
    icon: '../../../assets/icons/3 pointer.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        type: 'icon',
        currentTeam: true,
    }, {
        questionId: 2,
        question: 'Assist',
        currentTeam: true,
        type: 'checkbox'
    }, {
        questionId: 3,
        question: 'Assist Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 4,
        question: 'Shot Map',
        currentTeam: true,
        type: 'shot'
    }]
}, {
    title: 'Block',
    id: 4,
    isTwoTeamsInvolved: false,
    icon: '../../../assets/icons/blocking.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }]
}, {
    title: 'Steal',
    id: 5,
    isTwoTeamsInvolved: true,
    icon: '../../../assets/icons/Steal.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 2,
        question: 'From Opponent Player Number',
        currentTeam: false,
        type: 'icon'
    }]
}, {
    title: 'Free Throw Miss',
    id: 6,
    isTwoTeamsInvolved: true,
    icon: '../../../assets/icons/free throw miss.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 2,
        question: 'Type of Rebound',
        currentTeam: true,
        type: 'dropdown'
    }, {
        questionId: 3,
        question: 'Respective Player Number',
        currentTeam: false,
        type: 'icon'
    }]
}, {
    title: '2 Pt Miss',
    id: 7,
    isTwoTeamsInvolved: true,
    icon: '../../../assets/icons/3 point attempt.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 2,
        question: 'Type of Rebound',
        currentTeam: true,
        type: 'dropdown'
    }, {
        questionId: 3,
        question: 'Respective Player Number',
        currentTeam: false,
        type: 'icon'
    }]
}, {
    title: '3 Pt Miss',
    id: 8,
    isTwoTeamsInvolved: true,
    icon: '../../../assets/icons/3 point attempt.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 2,
        question: 'Type of Rebound',
        currentTeam: true,
        type: 'dropdown'
    }, {
        questionId: 3,
        question: 'Respective Player Number',
        currentTeam: false,
        type: 'icon'
    }]
}, {
    title: 'TurnOver',
    id: 9,
    isTwoTeamsInvolved: true,
    icon: '../../../assets/icons/travelling.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        currentTeam: true,
        type: 'icon'
    }, {
        questionId: 2,
        question: 'To Opponent Number',
        currentTeam: false,
        type: 'icon'
    }]
}, {
    title: 'Foul',
    id: 10,
    isTwoTeamsInvolved: false,
    icon: '../../../assets/icons/intentional foul.png',
    questions: [{
        questionId: 1,
        question: 'Enter Player Number',
        type: 'icon',
        currentTeam: true,
    }]
}];
