import React from 'react';
import avatar from './../images/image.jpg';
import api from './../utils/Api.js';
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(avatar);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    function userInfo(user) {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
    }
 
    Promise.all([api.getInfoUser(), api.getInitialCards()]) 
      .then(([user, cards]) => {
        userInfo(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="#" name="avatar"/>
        <div onClick={props.onEditAvatar} className="profile__img-edit"></div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__description">{userDescription}</p>
          </div>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button" ></button>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" ></button>
      </section>

      <section className="elements">{cards && cards.map((card) => (
        <Card key={card._id} card={card} onCardClick={props.clickImages}/>
      ))}</section>
    </main>
  );
}

export default Main;