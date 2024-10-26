import { BehaviorSubject } from 'rxjs';
import { Storable } from '../AsyncStorage/Storable';
import { STORE_KEYS } from '../AsyncStorage/StorageKeys';
import axios from 'axios';
import { axiosInstance } from '../../utilities/AxiosConfig';
import { CREATE_USER } from '../../utilities/ApiEndPoint';

class AuthStore extends Storable {
  private _accessToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(this.getStorage(STORE_KEYS.USER_AUTH_TOKEN) ?? null);

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

  async createUser(username: string, password: string) {
    const response = await axiosInstance.post(CREATE_USER, {
      name: username,
      password
    })
    if (response.data) {
      this.accessToken = response.data.accessToken;
    }
  }
}

export const authStore = new AuthStore();
