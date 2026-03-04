export interface Film {
    id: number;
    title: string;
    posterUrl: string;
    schedule: string;
    location: string;
    runtime: string;
    director: string;
    synopsis: string;
    trailerLink: string;
}

export const films: Film[] = [
    {
        id: 1,
        title: "Interstellar",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        schedule: "Mar 11 | 10:00 AM",
        location: "Main Auditorium",
        runtime: "2h 49m",
        director: "Christopher Nolan",
        synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
        trailerLink: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    },
    {
        id: 2,
        title: "The Dark Knight",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
        schedule: "Mar 11 | 02:00 PM",
        location: "Screen 1",
        runtime: "2h 32m",
        director: "Christopher Nolan",
        synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        trailerLink: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    },
    {
        id: 3,
        title: "Spirited Away",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
        schedule: "Mar 11 | 04:00 PM",
        location: "Screen 2",
        runtime: "2h 5m",
        director: "Hayao Miyazaki",
        synopsis: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
        trailerLink: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    },
    {
        id: 4,
        title: "Inception",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        schedule: "Mar 12 | 10:30 AM",
        location: "Main Auditorium",
        runtime: "2h 28m",
        director: "Christopher Nolan",
        synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
        trailerLink: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    },
    {
        id: 5,
        title: "Whiplash",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
        schedule: "Mar 12 | 02:30 PM",
        location: "Screen 2",
        runtime: "1h 46m",
        director: "Damien Chazelle",
        synopsis: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        trailerLink: "https://www.youtube.com/watch?v=7d_jQycdQGo",
    },
    {
        id: 6,
        title: "Spider-Man: Into the Spider-Verse",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/f/fa/Spider-Man_Into_the_Spider-Verse_poster.png",
        schedule: "Mar 12 | 06:00 PM",
        location: "Open Air Theatre",
        runtime: "1h 57m",
        director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
        synopsis: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
        trailerLink: "https://www.youtube.com/watch?v=tg52up16eq0",
    }, {
        id: 7,
        title: "Tenet",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
        schedule: "Mar 11 | 09:00 PM",
        location: "Main Auditorium",
        runtime: "2h 30m",
        director: "Christopher Nolan",
        synopsis: "Armed with only one word, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
        trailerLink: "https://www.youtube.com/watch?v=LdOM0x0XDMo",
    },
    {
        id: 8,
        title: "Shutter Island",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg",
        schedule: "Mar 12 | 09:00 PM",
        location: "Screen 1",
        runtime: "2h 18m",
        director: "Martin Scorsese",
        synopsis: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane, leading him to question his own sanity.",
        trailerLink: "https://www.youtube.com/watch?v=5iaYLCiq5RM",
    },
];