import { BehaviorSubject } from 'rxjs';
import { Storable } from '../AsyncStorage/Storable';
import { STORE_KEYS } from '../AsyncStorage/StorageKeys';
import { axiosInstance } from '../../utilities/AxiosConfig';
import { CREATE_USER } from '../../utilities/ApiEndPoint';
import { IUser } from '~/types/user';

class AuthStore extends Storable {
  private _accessToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(this.getStorage(STORE_KEYS.USER_AUTH_TOKEN) ?? null);
  private _userInfo: BehaviorSubject<any | null> =
    new BehaviorSubject<IUser | null>(null);

  get accessToken(): string | null {
    return this._accessToken.value;
  }
  set accessToken(v: string | null) {
    this._accessToken.next(v);
    this.setStorage(STORE_KEYS.USER_AUTH_TOKEN, v);
  }
  get accessTokenSubject(): BehaviorSubject<string | null> {
    return this._accessToken;
  }

  get userInfo(): IUser | null {
    return this._userInfo.value;
  }
  set userInfo(user: IUser | null) {
    this._userInfo.next(user);
  }
  get userInfoSubject(): BehaviorSubject<IUser | null> {
    return this._userInfo;
  }

  async createUser(username: string, password: string) {
    const response = await axiosInstance.post(CREATE_USER, {
      name: username,
      password,
    });
    if (response.data) {
      this.accessToken = response.data.accessToken;
      this.userInfo = response.data.user;
    }
  }

  logout() {
    this.accessToken = null;
    this.userInfo = null;
  }
}

export const authStore = new AuthStore();
