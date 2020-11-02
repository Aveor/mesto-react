import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setDataImage({});
  }
  
  return (
  <div className="root__container">
      <Header/>

      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} clickImages={setImage}/>
      
      <PopupWithForm name="form_profile" title='Редактировать профиль' submit='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name" id="name-input" type="text" required
               placeholder="Ваше имя"
               name="name" minLength="2" maxLength="40"/>
        <span className="popup__input-error" id="name-input-error"></span>
        <input className="popup__input popup__input_type_job" id="job-input" type="text" required
               placeholder="О себе"
               name="about" minLength="2" maxLength="200"/>
        <span className="popup__input-error" id="job-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name="form_card" title='Новое место' submit='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_place" id="place-input" type="text" required
               placeholder="Название" name="name" minLength="1" maxLength="30"/>
        <span className="popup__input-error" id="place-input-error"></span>
        <input className="popup__input popup__input_type_link" id="link-input" type="url" required
               placeholder="Ссылка на картинку" name="link"/>
        <span className="popup__input-error" id="link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name="form_avatar" title='Обновить аватар' submit='Создать' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_avatar" id="avatar-input" type="url" required
               placeholder="Ссылка на аватар" name="link"/>
        <span className="popup__input-error" id="avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name="form_confirmation" title='Вы уверены?' submit='Да' />

      <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={dataImage}/>

      <Footer/>
  </div>
  );
}

export default App;
