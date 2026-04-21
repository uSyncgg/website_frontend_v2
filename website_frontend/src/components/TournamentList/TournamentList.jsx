import React from "react";
import { CodTournamentCard } from "components";

export const TournamentList = ({ tournaments, game }) => {
    return (
        <React.Fragment>
            {game === 'Cod' && tournaments
                .map(tournament => (
                    <CodTournamentCard key={tournaments.indexOf(tournament)} tournament={tournament} />
                ))
            }
        </React.Fragment>
    );
}
