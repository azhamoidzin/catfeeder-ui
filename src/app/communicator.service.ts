import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

export interface NewMember {
  name: string;
  email: string;
}

export interface Feeder extends FeederBase {
  feeder_id: number;
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

  private myFeedersURL: string = this.myProfileURL + '/feeders';

  private familyURL: string = this.serverURL + '/family';

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
    return this.httpClient.get<any>(
      this.myProfileURL
    )
  }

  myFeeders() {
    return this.httpClient.get<Array<Feeder>>(
      this.myFeedersURL
    )
  }

  newFeeder(feederBase: FeederBase) {
    return this.httpClient.post<any>(
      this.myFeedersURL, feederBase
    )
  }

  editFeederById(feeder: Feeder) {
    return this.httpClient.put<any>(
      this.myFeedersURL + '/' + feeder.feeder_id, feeder
    )
  }

  downloadScheduleById(feeder: Feeder) {
    return this.httpClient.get(
      this.myFeedersURL + '/' + feeder.feeder_id + '/schedule', { responseType: 'blob' }
    )
  }

  myFamily() {
    return this.httpClient.get<Family>(
      this.familyURL
    )
  }

  addFamilyMember(member: NewMember) {
    return this.httpClient.post(
      this.registerURL, member
    )
  }

  setPassword(token: string, registrationData: any) {
    return this.httpClient.post(
      this.setPasswordURL + '/' + token, registrationData
    )
  }

  getFeederLogs(feederId: number) {
    return this.httpClient.get<any>(
      this.serverURL + '/feeder/' + feederId + '/logs',
      // this.logsUrlBase + '/' + feederId + '/logs',
    )
  }
}
