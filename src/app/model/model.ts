export class Model {

    public positions: any[] = [ 'S', 'MB', 'OPP', 'OH', 'DS', 'L' ];

    public eventTypes: any[] = [ 'Match', 'Scrimmage', 'Practice'];

    public eventDescription: any[] = [ 'Set 1', 'Set 2', 'Set 3', 'Set 4', 'Set 5' ];
    
    public teams: any[] = [
        {
            name: 'VAVA U15',
            team: [
                { name: 'Alana Bicoy', position: 'OH', scores: [], avg: undefined },
                { name: 'Brooke Borvansky', position: 'DS', scores: [], avg: undefined },
                { name: 'Tori Borvansky', position: 'MB', scores: [], avg: undefined },
                { name: 'Amber Chee', position: 'DS', scores: [], avg: undefined },
                { name: 'Maya Chezem', position: 'OH', scores: [], avg: undefined },
                { name: 'Faith Easley', position: 'OH', scores: [], avg: undefined },
                { name: 'Kiersten Engen', position: 'OPP', scores: [], avg: undefined },
                { name: 'Kate Ford', position: 'L', scores: [], avg: undefined },
                { name: 'Elyse Garcia', position: 'DS', scores: [], avg: undefined },
                { name: 'Grace Maiden', position: 'MB', scores: [], avg: undefined },
                { name: 'Bailey Monahan', position: 'S', scores: [], avg: undefined },
                { name: 'Jordan Myers', position: 'S', scores: [], avg: undefined },
                { name: 'Nicole Nguyen', position: 'DS', scores: [], avg: undefined },
                { name: 'Laiyla Parrotte', position: 'MB', scores: [], avg: undefined },
                { name: 'Savannah Thomas', position: 'OH', scores: [], avg: undefined }
            ]
        },
        {
            name: 'VAVA U16',
            team: [
                { name: 'Lexi Allouche', position: 'OPP', scores: [], avg: undefined },
                { name: 'Taira Cikotas', position: 'OPP', scores: [], avg: undefined },
                { name: 'Annika Engen', position: 'OH', scores: [], avg: undefined },
                { name: 'Sophia Galova', position: 'OH', scores: [], avg: undefined },
                { name: 'Shradha Gandotra', position: 'DS', scores: [], avg: undefined },
                { name: 'Hannah Kim', position: 'L', scores: [], avg: undefined },
                { name: 'Bonny Koo', position: 'S', scores: [], avg: undefined },
                { name: 'Ijenna Mere', position: 'MB', scores: [], avg: undefined },
                { name: 'Ellen Noh', position: 'S', scores: [], avg: undefined },
                { name: 'Elizabeth Sanden', position: 'OH', scores: [], avg: undefined },
                { name: 'Kathryn Sexton', position: 'OH', scores: [], avg: undefined },
                { name: 'Michaela Svensson', position: 'MB', scores: [], avg: undefined }
            ]
        },
        {
            name: 'VAVA U17',
            team: [
                { name: 'Trinity Day', position: 'OH', scores: [], avg: undefined },
                { name: 'Lacey Edelman', position: 'OH', scores: [], avg: undefined },
                { name: 'Alyssa Ford', position: 'L', scores: [], avg: undefined },
                { name: 'MacKayla Gustin', position: 'MB', scores: [], avg: undefined },
                { name: 'Jaden Hauptmann', position: 'OH', scores: [], avg: undefined },
                { name: 'Rachel Hayes', position: 'S', scores: [], avg: undefined },
                { name: 'Carly Munsell', position: 'S', scores: [], avg: undefined },
                { name: 'Jessica Newberg', position: 'DS', scores: [], avg: undefined },
                { name: 'Austin Raymer', position: 'MB', scores: [], avg: undefined },
                { name: 'Corinne Sieber', position: 'OPP', scores: [], avg: undefined },
                { name: 'Holly Stewart', position: 'OPP', scores: [], avg: undefined },
                { name: 'Yasmine Weir', position: 'DS', scores: [], avg: undefined }
            ]
        },
        {
            name: 'VAVA U18',
            team: [
                { name: 'Kassidy Bradshaw', position: 'S', scores: [], avg: undefined },
                { name: 'Kelsey Bradshaw', position: 'OH', scores: [], avg: undefined },
                { name: 'Julia Chotiner', position: 'OH', scores: [], avg: undefined },
                { name: 'Maddie Daw', position: 'MB', scores: [], avg: undefined },
                { name: 'Grace Easley', position: 'DS', scores: [], avg: undefined },
                { name: 'Ally Hessenius', position: 'S', scores: [], avg: undefined },
                { name: 'Rachel Jacobs', position: 'OPP', scores: [], avg: undefined },
                { name: 'Makenna Luba', position: 'L', scores: [], avg: undefined },
                { name: 'Kylie Ordonez', position: 'S', scores: [], avg: undefined },
                { name: 'Summer Simmons', position: 'OH', scores: [], avg: undefined },
                { name: 'Taylor Skule', position: 'MB', scores: [], avg: undefined },
                { name: 'Lily Stephens', position: 'DS', scores: [], avg: undefined },
                { name: 'Delaney Taplin-Patterson', position: 'OH', scores: [], avg: undefined }
            ]
        }
    ]
}