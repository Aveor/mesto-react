import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
// import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../context/CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]= React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [dataImage, setDataImage] = React.useState({});
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  }
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setLoading] = React.useState();

  React.useEffect(() => {

    Promise.all([api.getInfoUser(), api.getInitialCards()]) 
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick() {
    setSelectedCard(true);
  }

  function handleDeleteClick() {
    setIsDeleteConfirmationPopupOpen(true);
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleDeleteClick();
  }

  function handleConfirmDelete(card) {
    setLoading(true);
    api.deleteCard(cardDelete._id).then(() => {
      const newCards = cards.filter((c) => c._id !== cardDelete._id);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => setLoading(false));
    closeAllPopups();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleUpdateUser(user) {
    setLoading(true);
    api.updateInfo(user.name, user.about).then((result) => {
      setCurrentUser(result);
    })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => setLoading(false));
    closeAllPopups();
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api.addNewCard(card.name, card.link).then((newCard) => {
      setCards([...cards, newCard]);
    })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => setLoading(false));
    closeAllPopups();
  }

  


  function handleUpdateAvatar(user) {
    setLoading(true);
    api.updateAvatar(user.avatar)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    closeAllPopups();
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsDeleteConfirmationPopupOpen(false);
    setDataImage({});
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handlerOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handlerOverlayClick);

    return () => {
      window.removeEventListener('mousedown', handlerOverlayClick);
      window.removeEventListener('keydown', handleEscClose);
    };
  })
  
  return (
  <div className="root__container">
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>

        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} clickImages={setImage} cards={cards} onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                          isLoading={isLoading}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading}/>

        <ConfirmationPopup isOpen={isDeleteConfirmationPopupOpen} onClose={closeAllPopups}
                           onDelete={handleConfirmDelete} isLoading={isLoading}/>

      <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={dataImage}/>

      <Footer/>
      </CurrentUserContext.Provider>
  </div>
  );
}

export default App;
