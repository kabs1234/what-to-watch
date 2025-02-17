import { Fragment } from 'react';

export default function FullFilmStarringList({
  starringActors,
}: {
  starringActors: string[];
}): JSX.Element {
  return (
    <>
      {starringActors.map((actor, index, array) => {
        if (index + 1 !== array.length) {
          return (
            <Fragment key={actor}>
              {`${actor},`}
              <br />
            </Fragment>
          );
        } else {
          return actor;
        }
      })}
    </>
  );
}
