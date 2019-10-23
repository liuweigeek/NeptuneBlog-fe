import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home';
import { UserListComponent } from '../user/component/user-list';
import { PostZoneComponent } from '../post/component/post-zone';
import { UserProfileComponent } from '../user/component/user-profile';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'posts',
        component: PostZoneComponent
      },
      {
        path: 'followings',
        component: UserListComponent,
        pathMatch: 'full'
      },
      {
        path: 'followers',
        component: UserListComponent,
        pathMatch: 'full'
      },
      {
        path: ':userId',
        component: UserProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
