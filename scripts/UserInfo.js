export default class UserInfo {
  constructor ({name, job}) {

    this._name = document.querySelector(name);
    this._job = document.querySelector(job);

    this._nameInput = document.querySelector('.popup__text_type_name');
    this._jobInput = document.querySelector('.popup__text_type_job');
  }

  getUserInfo () {
    /*this._nameInput.value = this._name.textContent;
    this._jobInput.value = this._job.textContent;*/

    this._defaultValues = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return this._defaultValues;
  }

  setUserInfo (name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
