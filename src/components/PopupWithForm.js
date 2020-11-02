import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={(props.isOpen ? "popup popup_opened" : "popup")} id={props.name}>
      <form className="popup__container" name={props.name} method="post" action="#">
        <button onClick={props.onClose} className="popup__button-close" type="reset"></button>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button className="popup__button-save" id="avatar-save" type="submit">
          {props.submit}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;