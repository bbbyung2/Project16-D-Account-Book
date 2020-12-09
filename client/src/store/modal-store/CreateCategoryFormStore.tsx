import { observable, action, makeAutoObservable } from 'mobx';
import RootStore from '../RootStore';

export default class CreateCategoryFormStore {
  rootStore: RootStore;

  @observable
  show = false;

  @observable
  incomeFlag = true;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  @action
  toggleShow = (): void => {
    this.show = !this.show;
  };

  @action
  setShow = (show: boolean): void => {
    this.show = show;
  };

  @action
  setIncomeFlagTrue = (): void => {
    this.incomeFlag = true;
  };

  @action
  setIncomeFlagFalse = (): void => {
    this.incomeFlag = false;
  };
}
