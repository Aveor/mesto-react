import React from 'react';

function Card(props) {
  const cardImgStyle = {
    backgroundImage: 'url(' + props.card.link + ')',
  };

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div key={props.card._id} className="elements__item">
      <div onClick={handleClick} className="elements__image" style={cardImgStyle} />
      <button className="elements__delete" type="button"></button>
      <div className="elements__description">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="like">
          <button className="like__button" type="button"></button>
          {props.card.likes.length > 0 &&
          <p className="like__sum">
            {props.card.likes.length}
          </p>
          }
        </div>
      </div>
    </div>
  );
} 

export default Card;