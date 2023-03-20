export default class UserInfo {
  constructor ({name, job}) {

    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo () {

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
