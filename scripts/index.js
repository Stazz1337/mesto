//  1. добавление карточек с массива

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const template = document.querySelector('.card-template').content.querySelector(".place__item-wrapper");
const list = document.querySelector('.place');

 function renderCards() {
  const cards = initialCards.map((item) => {
  const newCard = template.cloneNode(true);
  newCard.querySelector('.place__title').textContent = item.name;
  newCard.querySelector('.place__image').src = item.link;
  newCard.querySelector('.place__image').alt = item.name;

  return newCard;
})

  list.append(...cards);
}

renderCards();

// 2. 3  Создание и добавление карточки из формы ADDCARD

function createCard() {
    const newCard = template.cloneNode(true);
    newCard.querySelector('.place__title').textContent = imageNameInput.value;
    newCard.querySelector('.place__image').src = imageLinkInput.value;
    newCard.querySelector('.place__image').alt = imageNameInput.value;

    newCard.querySelector('.place__image').addEventListener('click', openPopupImage);
    newCard.querySelector('.place__delete').addEventListener('click', RemoveCard);
    newCard.querySelector('.place__like').addEventListener('click', function (event) {
      event.target.classList.toggle('place__like_active');
    })
    return newCard;
}

function addCardBegin() {
  list.prepend(createCard());
}

const popupAddCardOpenButton = document.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_type_add-card');

const formAddCard = document.querySelector('.popup__form_type_add-card');

function openAddFormPopup () {
  popupAddCard.classList.add('popup_opened');
}

 function handleFormAddCardSubmit (evt) {
  evt.preventDefault();

  addCardBegin();

  closePopup(popupAddCard);
}

popupAddCardOpenButton.addEventListener('click', openAddFormPopup);

formAddCard.addEventListener('submit', handleFormAddCardSubmit);


///////////////////////////////////////////  ПР-4


const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

const popup = document.querySelector('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');

const imageNameInput = document.querySelector('.popup__text_type_imageName');
const imageLinkInput = document.querySelector('.popup__text_type_imageLink');

// открыть / закрыть попап c формой edit - profile

function openPopup () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupEditProfile.classList.add('popup_opened');
}

function closePopup (popupToClose) {
  popupToClose.classList.remove('popup_opened');
}

// обработка сабмит формы edit - profile

function handleFormSubmit (evt) {
  evt.preventDefault();
   name.textContent = nameInput.value;
   job.textContent = jobInput.value;
   closePopup(popupEditProfile);
}

const closeButtons = document.querySelectorAll('.popup__close');

function RemovePopup (event) {
  const popupToDelete = event.target.closest('.popup');
  popupToDelete.classList.remove('popup_opened');
};

closeButtons.forEach(function(targetButton) {
  targetButton.addEventListener('click', RemovePopup)
});


popupOpenButton.addEventListener('click', openPopup);
formEditProfile.addEventListener('submit', handleFormSubmit);

////////////////////////////////////////////////////////

// 4. изменение лайка при клике

const likeButtons = document.querySelectorAll('.place__like');
likeButtons.forEach(function(targetButton) {
  targetButton.addEventListener('click', function (event) {
    event.target.classList.toggle('place__like_active');
  })
});

// 5. удаление карточки place__item по клику на корзину

const trashButtons = document.querySelectorAll('.place__delete');

function RemoveCard (event) {
  const CardToDelete = event.target.closest('.place__item-wrapper');
  CardToDelete.remove();
};

trashButtons.forEach(function(targetButton) {
  targetButton.addEventListener('click', RemoveCard)
});

//  6. открытие popup__image

const images = document.querySelectorAll('.place__image');

const popupImage = document.querySelector('.popup_type_image');

const popupBackground = document.querySelector('.popup__image');

const imageTitle = document.querySelector(".popup__image-title");

const title =  document.querySelector('.place__title');

function openPopupImage(event){
  popupImage.classList.add('popup_opened');
  popupBackground.src = event.target.src;
  imageTitle.textContent = event.target.nextElementSibling.nextElementSibling.textContent;
}

images.forEach(function(img) {
  img.addEventListener('click', openPopupImage)
});
