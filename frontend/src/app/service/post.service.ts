import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./login.service";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(environment.backendUrl + '/posts').pipe(
      map((value: any) => value._embedded.posts)
    );
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(environment.backendUrl + '/posts', post);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.backendUrl}/posts/${id}`);
  }
}

export interface Post {
  id?: number;
  title: string;
  author: User;
  content: string;
  uploaded: Date;
}
