const template = document.querySelector('.card-template').content.querySelector(".place__item-wrapper");
const list = document.querySelector('.place');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const imageNameInput = document.querySelector('.popup__text_type_imageName');
const imageLinkInput = document.querySelector('.popup__text_type_imageLink');
const popupImage = document.querySelector('.popup_type_image');
const popupBackground = document.querySelector('.popup__image');
const imageTitle = document.querySelector(".popup__image-title");
const title =  document.querySelector('.place__title');

// const closeButtons = document.querySelectorAll('.popup__close');

const popups = document.querySelectorAll('.popup');
const errorFields = Array.from(document.querySelectorAll('.popup__input-error'));
const inputFields = Array.from(document.querySelectorAll('.popup__text'));
const buttonSubmitAddCard = formAddCard.querySelector('.popup__button');

// добавление карточек с массива

initialCards.forEach(item => {
  const card = createCard(item.name, item.link);
  renderCard(card);
})

// рендер начального массива

function renderCard(card) {
  list.append(card);
}

// создание карточки

function createCard(name, link) {
  const newCard = template.cloneNode(true);
  newCard.querySelector('.place__title').textContent = name;
  newCard.querySelector('.place__image').src = link;
  newCard.querySelector('.place__image').alt = name;
  newCard.querySelector('.place__image').addEventListener('click', openPopupImage);
  newCard.querySelector('.place__delete').addEventListener('click', removeCard);
  newCard.querySelector('.place__like').addEventListener('click', function (event) {
    event.target.classList.toggle('place__like_active');
  })
  return newCard;
}

// добавить новую карточку в начало списка

function addCardBegin(card) {
  list.prepend(card);
}

// открыть попап добавления карточки

function openAddFormPopup () {
  openPopup(popupAddCard);
  const inputsAreEmpty = inputFields.every((inputField) => inputField.value.length === 0);
  if (inputsAreEmpty) {
    buttonSubmitAddCard.setAttribute('disabled', true);
    /* buttonSubmitAddCard.style.backgroundColor = "#000000";
    buttonSubmitAddCard.style.color = "#FFFFFF";
    buttonSubmitAddCard.style.opacity = "1"; */
  }
}

// обработчик добавление карточки из формы AddCard

 function handleFormAddCardSubmit (evt) {
  evt.preventDefault();
  addCardBegin(createCard(imageNameInput.value, imageLinkInput.value));
  closePopup(popupAddCard);
  formAddCard.reset();
}

// открыть попап c формой edit - profile

function openPopupEditProfile () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupEditProfile);
};

// открыть/закрыть попап

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupCloseEscape);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupCloseEscape);
};

// обработка сабмит формы edit - profile

function handleFormSubmit (evt, popup) {
  evt.preventDefault();

  errorFields.forEach((errorField)=>{errorField.classList.remove('popup__input-error_active')});
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popup);
}

// 5. удаление карточки place__item по клику на корзину

function removeCard (event) {
  const cardToDelete = event.target.closest('.place__item-wrapper');
  cardToDelete.remove();
};

//  6. открытие popup__image

function openPopupImage(event){
  openPopup(popupImage);
  popupBackground.src = event.target.src;
  popupBackground.alt = event.target.alt;
  imageTitle.textContent = event.target.nextElementSibling.nextElementSibling.textContent;
}

// кнопки открытия и сабмиты форм

popupAddCardOpenButton.addEventListener('click', openAddFormPopup);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);
popupEditProfileOpenButton.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', evt => handleFormSubmit(evt, popupEditProfile));

// ПР-6
// закрытие попапов на escape

// document.addEventListener('keydown', handlePopupCloseEscape);

const handlePopupCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup (popupActive);
  };
};

/*
// закрытие попапов по клику вне форм

popups.forEach(function(targetPopup) {
  targetPopup.addEventListener('click', handlePopupCloseOuterClick)
});

function handlePopupCloseOuterClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup (evt.target);
  };
};

// закрыть на кнопку X

/*closeButtons.forEach(function(targetButton) {
  targetButton.addEventListener('click', evt => closePopup(evt.target.closest('.popup')))
});
*/

// закрытие попапов по клику вне форм и кнопке X

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

// вызов данных валидации формы

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button:disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
});
