import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FeederCreate, FeederUpdate} from './schemas';
import { Feeder, FeedResponse, User, Log, FamilyStatusResponse } from './schemas';

export interface FeederBase {
  name: string;
  tags: Array<string>;
  status: number;
  schedule: Array<string>;
  meal: number;
}

export interface FamilyMember {
  id: number;
  name: string;
  registration: string;
}

export interface Family {
  id: number;
  name: string;
  members: Array<FamilyMember>;
  admin: number;
}

export interface NewFamilyMember {
  name: string;
  email: string;
}

export interface NewAdminMember extends NewFamilyMember {
  family_name: string;
}

type Nullable<T> = T | null;
interface GetLogsParams {
  feeder_id?: Nullable<number>;
  user_id?: Nullable<number>;
}

@Injectable({'providedIn': 'root'})
export class CommunicatorService {
  constructor(private httpClient: HttpClient) {
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': '*'
  });

  private serverURL: string = "http://127.0.0.1:8000";
  private loginURL: string = this.serverURL + '/login';
  private registerURL: string = this.serverURL + '/register';

  private usersURL: string = this.serverURL + '/users';
  private myProfileURL: string = this.usersURL + '/me';

  private feedersURL: string = this.serverURL + '/feeders';

  private familyURL: string = this.serverURL + '/family';
  private familyStatusURL: string = this.familyURL + '/status';

  private setPasswordURL: string = this.serverURL + '/activate';

  private logsUrlBase: string = this.serverURL + '/logs';


  doLogin(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    return this.httpClient.post<any>(
      this.loginURL, body.toString(), {headers: this.headers}
    )
  }

  myProfile() {
    return this.httpClient.get<User>(
      this.myProfileURL
    )
  }

  myFeeders(userId: number | null = null) {
    const params = userId !== null ? new HttpParams().set('user_id', String(userId)) : {};
    return this.httpClient.get<Array<Feeder>>(
      this.feedersURL, { params: params }
    )
  }

  newFeeder(feederCreate: FeederCreate) {
    return this.httpClient.put<any>(
      this.feedersURL, feederCreate
    )
  }

  editFeederById(feeder_id: number, feederUpdate: FeederUpdate) {
    return this.httpClient.post<any>(
      this.feedersURL + '/' + feeder_id, feederUpdate
    )
  }

  downloadScheduleById(feeder: Feeder) {
    return this.httpClient.get(
      this.feedersURL + '/' + feeder.id + '/schedule', { responseType: 'blob' }
    )
  }

  instantFeed(feederId: number) {
    return this.httpClient.post<FeedResponse>(
      this.feedersURL + '/' + feederId + '/instant_feed', {}
    )
  }

  refillFeeder(feederId: number) {
    return this.httpClient.post<boolean>(
      this.feedersURL + '/' + feederId + '/refill', {}
    )
  }

  myFamily() {
    return this.httpClient.get<Family>(
      this.familyURL
    )
  }

  familyStatus() {
    return this.httpClient.get<FamilyStatusResponse>(
      this.familyStatusURL
    )
  }

  register(member: NewAdminMember) {
    return this.httpClient.post(
      this.registerURL, member
    )
  }

  addNewFamilyMember(member: NewFamilyMember) {
    return this.httpClient.put(
      this.usersURL, member
    )
  }

  setPassword(token: string, registrationData: any) {
    return this.httpClient.post(
      this.setPasswordURL + '/' + token, registrationData
    )
  }

  getLogs({
    feeder_id = null,
    user_id = null,
  }: GetLogsParams) {
    let params = new HttpParams();

    if (user_id !== null) {
      params = params.append('user_id', user_id);
    }
    if (feeder_id !== null) {
      params = params.append('feeder_id', feeder_id);
    }
    return this.httpClient.get<Array<Log>>(
      this.logsUrlBase, { params: params }
    )
  }
}
