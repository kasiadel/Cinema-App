import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card className="mb-4 mb-sm-4" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>

      // <Card className="mb-3 mb-sm-4" style={{ minWidth: "12rem" }}>
      //   <Card.Img variant="top" src={movie.ImageUrl} />
      //   <Card.Body>
      //     <Card.Title>{movie.Title}</Card.Title>
      //     <Card.Subtitle className="mb-2 text-muted">
      //       {movie.Genre.Name}
      //     </Card.Subtitle>
      //     <Card.Text>{movieDescription}</Card.Text>
      //     <Button
      //       className="outline-primary"
      //       onClick={() => onClick(movie)}
      //       variant="link"
      //     >
      //       Open
      //     </Button>
      //   </Card.Body>
      // </Card>
    );
  }
}
// {
//   <div onClick={() => onClick(movie)} className="movie-card">
//     {movie.Title}
//   </div>;
// }

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
