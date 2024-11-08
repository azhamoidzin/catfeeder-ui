import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface FeederBase {
  name: string;
  tags: Array<string>;
  status: number;
  schedule: Array<string>;
  meal: number;
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
  private loginURL: string = this.serverURL + '/token';

  private usersURL: string = this.serverURL + '/users';
  private myProfileURL: string = this.usersURL + '/me';

  private myFeedersURL: string = this.myProfileURL + '/feeders';


  doLogin(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.httpClient.post<any>(
      this.loginURL, body.toString(), {headers: this.headers}
    )
  }

  myProfile() {
    return this.httpClient.get<any>(
      this.myProfileURL, {headers: this.headers}
    )
  }

  myFeeders() {
    return this.httpClient.get<Array<Feeder>>(
      this.myFeedersURL, {headers: this.headers}
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

}
